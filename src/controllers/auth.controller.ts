import { UserRequest } from "../interfaces/user.interface";
import userService from "../services/user.service";
import { Response } from "express";
import { User } from "../entities/user.entity";
import { ResponseModel } from "../utils/response.model";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

class AuthController {

  async signup(req: UserRequest, res: Response) {
    const userData: User = req.body;
    try {
      const existingUser = await userService.findOne({
        where: { email: userData.email },
      });

      if (existingUser) {
        return ResponseModel.error(
          "User with this email already exists",
          StatusCodes.CONFLICT
        );
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;
      const newUser = await userService.create(userData);
      return ResponseModel.success("User created successfully", newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      return ResponseModel.error("Failed to create user");
    }
  }
}

export default new AuthController();
