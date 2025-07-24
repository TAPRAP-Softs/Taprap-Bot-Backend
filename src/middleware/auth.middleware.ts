import Jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { ACCESS_TOKEN_SECRET } from "../config/variables.config";
import { UserRequest } from "../interfaces/user.interface";

const authentication = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).send({
      success: false,
      message: "Auth header is empty",
    });
  }
  const tokenSecret = ACCESS_TOKEN_SECRET;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return;
  if (!tokenSecret) return;
  Jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(403).send({
        success: false,
        message: "Authentication failed",
      });
    }
    //@ts-ignore
    req.user = user;
    next();
  });
};

export default authentication;
