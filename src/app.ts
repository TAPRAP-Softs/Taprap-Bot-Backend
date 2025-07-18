import { database } from "./config/db.config";
import express from "express";
import { PORT } from "./config/variables.config";

const app = express();

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    await database.initialize();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

start();
