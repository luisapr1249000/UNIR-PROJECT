import mongoose, { connect } from "mongoose";

import { config } from "dotenv";
import app from "./app";
import { createUserFixture } from "./__fixtures__/user.fixture";

config();
mongoose.Promise = global.Promise;

const userSeeder = async () => {
  for (let index = 0; index < 50; index++) {
    await createUserFixture();
  }
};

const connectDB = async () => {
  const DB_URI =
    process.env.NODE_ENV === "prod"
      ? process.env.MONGO_URI_PROD
      : process.env.MONGO_URI_DEV;
  const PORT = process.env.PORT || 8000;

  try {
    await connect(DB_URI as string);
    console.log("Database connected successfully!");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error("Database connection error:", e);
    process.exit(1);
  }
};
connectDB();
