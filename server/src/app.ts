import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { AuthRoutes } from "./routes/auth.routes";
import { UserRoutes } from "./routes/user.routes";
import { AddressDirectionRoutes } from "./routes/addressDirecttion.routes";
import { CategoryRoutes } from "./routes/category.routes";
import { ProductRoutes } from "./routes/product.routes";
import { CommentRoutes } from "./routes/comment.routes";
import { passportJwt } from "./auth/passport/passport.jwt";

const app: Application = express();

app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5000",
    optionsSuccessStatus: 200,
  }),
);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passportJwt.initialize());

app.use("/api/v1", AuthRoutes);
app.use("/api/v1", UserRoutes);
app.use("/api/v1", AddressDirectionRoutes);
app.use("/api/v1", CategoryRoutes);
app.use("/api/v1", ProductRoutes);
app.use("/api/v1", CommentRoutes);

app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({ status: "OK" });
});

export default app;
