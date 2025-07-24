import { UserRequest } from "../interfaces/user.interface";
import userService from "../services/user.service";
import refreshTokenService from "../services/refresh-token.service";
import { Response } from "express";
import { User } from "../entities/user.entity";
import { ResponseModel } from "../utils/response.model";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

class AuthController {
  async signup(req: UserRequest, res: Response) {
    const userData = req.body;

    try {
      const existingEmail = await userService.findOne({
        where: { email: userData.email },
      });

      if (existingEmail) {
        return ResponseModel.error(
          res,
          "User with this email already exists",
          StatusCodes.CONFLICT
        );
      }

      const existingPhone = await userService.findOne({
        where: { phone: userData.phone },
      });

      if (existingPhone) {
        return ResponseModel.error(
          res,
          "User with this phone number already exists",
          StatusCodes.CONFLICT
        );
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;
      const user = await userService.create(userData);
      const refreshToken = await refreshTokenService.findAndCreateOrUpdate(
        user.id
      );
      if (!refreshToken) {
        return ResponseModel.error(res, "Failed to create refresh token");
      }
      return ResponseModel.success(
        res,
        "User created successfully",
        {
          user: user.getPublicData(),
          accessToken: user.generateAccessToken(),
          refreshToken: refreshToken.token,
        },
        undefined,
        StatusCodes.CREATED
      );
    } catch (error) {
      console.error("Error creating user:", error);
      return ResponseModel.error(res, "Failed to create user");
    }
  }

  async login(req: UserRequest, res: Response) {
    try {
      let user: User | null;

      const { email, phone, password } = req.body;

      if (phone) {
        user = await userService.findOne({
          where: { phone },
        });
        if (!user) {
          return ResponseModel.error(
            res,
            "User with this phone number does not exist",
            StatusCodes.NOT_FOUND
          );
        }
      } else {
        user = await userService.findOne({
          where: { email },
        });
        if (!user) {
          return ResponseModel.error(
            res,
            "User with this email does not exist",
            StatusCodes.NOT_FOUND
          );
        }
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return ResponseModel.error(
          res,
          "Invalid credentials",
          StatusCodes.UNAUTHORIZED
        );
      }

      const refreshToken = await refreshTokenService.findAndCreateOrUpdate(
        user.id
      );
      if (!refreshToken) {
        return ResponseModel.error(res, "Failed to create refresh token");
      }

      return ResponseModel.success(
        res,
        "Login successful",
        {
          user: user.getPublicData(),
          accessToken: user.generateAccessToken(),
          refreshToken: refreshToken.token,
        },
        undefined,
        StatusCodes.OK
      );
    } catch (error) {
      console.error("Error during login:", error);
      return ResponseModel.error(res, "Login failed");
    }
  }

  async generateAccessToken(req: UserRequest, res: Response) {
    try {
      const refreshToken = req.body.token;
      const refreshTokenModel = await refreshTokenService.findByToken(
        refreshToken
      );
      if (!refreshTokenModel) {
        return ResponseModel.error(
          res,
          "Invalid refresh token",
          StatusCodes.UNAUTHORIZED
        );
      }
      const newRefreshTokenModel =
        await refreshTokenService.findAndCreateOrUpdate(
          refreshTokenModel.userId
        );
      if (!newRefreshTokenModel) {
        return ResponseModel.error(
          res,
          "Failed to create new refresh token",
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
      const user = await userService.findById(refreshTokenModel.userId);
      if (!user) {
        return ResponseModel.error(
          res,
          "User not found",
          StatusCodes.NOT_FOUND
        );
      }
      return ResponseModel.success(
        res,
        "Access token generated successfully",
        {
          accessToken: user.generateAccessToken(),
          refreshToken: newRefreshTokenModel.token,
        },
        undefined,
        StatusCodes.OK
      );
    } catch (error: any) {
      console.error("Error generating access token:", error);
      return ResponseModel.error(
        res,
        "Failed to generate access token",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export default new AuthController();
