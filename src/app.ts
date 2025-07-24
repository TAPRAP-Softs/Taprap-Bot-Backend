import { database } from "./config/db.config";
import express from "express";
import { PORT } from "./config/variables.config";
import middleware from "./middleware/index.middleware";
import { errorHandler } from "./middleware/error.middleware";

const app = express();
middleware(app);
app.use(errorHandler);

const start = async () => {
  try {
    app.listen(Number(PORT), "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });

    await database.initialize();

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

start();
