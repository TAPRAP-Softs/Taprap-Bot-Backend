import { StatusCodes } from "http-status-codes";

export class ResponseModel<T = any, U = Record<string, any>> {
  constructor(
    public status: boolean,
    public statusCode: StatusCodes,
    public message?: string,
    public data?: T,
    public meta?: U
  ) {}

  static success<T = any, U = Record<string, any>>(
    message?: string,
    data?: T,
    meta?: U,
    statusCode: StatusCodes = StatusCodes.OK
  ): ResponseModel<T, U> {
    return new ResponseModel(true, statusCode, message, data, meta);
  }

  static error<T = any>(
    message?: string,
    statusCode: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR,
    data?: T
  ): ResponseModel<T> {
    return new ResponseModel(false, statusCode, message, data);
  }
}
