import express from "express";
export const errorHandler = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.error(err);
  res.status(err.status || 400).send({
    success: false,
    message: err.message,
  });
};
