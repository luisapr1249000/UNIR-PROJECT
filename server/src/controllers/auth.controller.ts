import { Request, Response } from "express";
import { User } from "../models/user.model";
import {
  checkRefreshTokenAndGenAccessToken,
  createPayload,
  genAccessToken,
  genRefreshToken,
  setTokenCookie,
} from "../utils/auth.utils";
import { handleError } from "../utils/error.utils";
import { DEFAULT_COOKIES_DAY } from "../constants";

class AuthController {
  public async signup(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser)
        return res.status(400).json({ message: "User already exists." });

      const user = new User({ email, password, username });
      const userSaved = await user.save();
      if (!userSaved) {
        return res.status(400).json({ message: "Something went bad." });
      }

      const payload = createPayload(
        userSaved._id.toString(),
        userSaved.username,
      );

      const accessToken = genAccessToken(payload);
      const refreshToken = genRefreshToken(payload);

      setTokenCookie(res, "refreshToken", refreshToken, null);
      setTokenCookie(res, "accessToken", accessToken, null);
      return res.status(201).json({ userSaved, accessToken });
    } catch (e) {
      return handleError(res, e);
    }
  }
  public async login(req: Request, res: Response) {
    try {
      const { rememberMe, loginValue, password } = req.body;
      const user = await User.findOne({
        $or: [{ email: loginValue }, { username: loginValue }],
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const passwordIsValid = user.comparePasswords(password);
      if (!passwordIsValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const payload = createPayload(user._id.toString(), user.username);

      const accessToken = genAccessToken(payload);
      const refreshToken = genRefreshToken(payload);

      console.log(accessToken, "\n", refreshToken);

      setTokenCookie(
        res,
        "refreshToken",
        refreshToken,
        rememberMe ? DEFAULT_COOKIES_DAY : null,
      );
      setTokenCookie(
        res,
        "accessToken",
        accessToken,
        rememberMe ? DEFAULT_COOKIES_DAY : null,
      );

      user.lastLogin = new Date();
      await user.save();

      return res.status(200).json({ userId: user._id.toString() });
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const newAccessToken = checkRefreshTokenAndGenAccessToken(refreshToken);
      if (!newAccessToken) {
        return res.status(403).json({ error: "Invalid refresh token" });
      }
      setTokenCookie(res, "accessToken", newAccessToken);
      return res.status(200).json();
    } catch (e) {
      return handleError(res, e);
    }
  }
  public logout(_req: Request, res: Response) {
    res.cookie("accessToken", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });
    res.cookie("refreshToken", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });
    return res.status(200).json({
      status: "success",
      message: "Logged out",
    });
  }

  public getAuthUser(req: Request, res: Response) {
    return res.status(200).json({ user: req.user });
  }
}

export default new AuthController();
