import { StatusCodes } from "http-status-codes";
import { Response } from "express"; // 👈 Import Response from express

export class ResponseModel<T = any, U = Record<string, any>> {
  constructor(
    public status: boolean,
    public statusCode: StatusCodes,
    public message?: string,
    public data?: T,
    public meta?: U
  ) {}

  static success<T = any, U = Record<string, any>>(
    res: Response, // 👈 Add res parameter
    message?: string,
    data?: T,
    meta?: U,
    statusCode: StatusCodes = StatusCodes.OK
  ): void { // 👈 Method now returns void
    const response = new ResponseModel(true, statusCode, message, data, meta);
    res.status(statusCode).json(response);
  }

  static error<T = any>(
    res: Response, // 👈 Add res parameter
    message?: string,
    statusCode: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR,
    data?: T
  ): void { // 👈 Method now returns void
    const response = new ResponseModel(false, statusCode, message, data);
    res.status(statusCode).json(response);
  }
}