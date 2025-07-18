import cors from "cors";
import helmet from "helmet";
import express from "express";
import morgan from "morgan";
import router from "../routers/index.router";

const middleware = (app: express.Application) => {
  app.use(morgan("dev"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  app.use("/api/v1", router);
  app.use(/(.*)/, (req: any, res: any) => {
    console.info("Route not found");
    return res.status(404).send("Route not found");
  });
};

export default middleware;
