import mongoose, { connect } from "mongoose";

import { config } from "dotenv";
import app from "./app";

config();
mongoose.Promise = global.Promise;

const connectDB = async () => {
  const DB_URI =
    process.env.NODE_ENV === "prod"
      ? process.env.MONGO_URI_PROD
      : process.env.MONGO_URI_DEV; // Fixed the variable names for clarity
  const PORT = process.env.PORT || 8000;

  try {
    await connect(DB_URI as string);
    console.log("Database connected successfully!");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error("Database connection error:", e);
    process.exit(1); // Exit the process with failure
  }
};
connectDB();