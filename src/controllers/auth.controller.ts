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
}

export default new AuthController();
