import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const validator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((error) => {
        //@ts-ignore
        return { message: error.msg, path: error.path };
      }),
    });
  }
  next();
};

export default validator;
