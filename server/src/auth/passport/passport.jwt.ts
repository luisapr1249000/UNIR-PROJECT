import { Strategy as JwtStrategy } from "passport-jwt";
import passport from "passport";
import { Request } from "express";
import { config } from "dotenv";
import { User } from "../../models/user.model";
config();
const key = process.env.ACCESS_TOKEN_SECRET as string;

const cookieExtractor = (req: Request) => {
  if (req && req.cookies && req.cookies["refreshToken"]) {
    return req.cookies["accessToken"] || null; // Regresa el token si está presente
  }
  return null;
};
const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: key,
};
passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await User.findById(payload.sub).select("-password");
      if (!user) return done(null, false, { message: "User not found" });
      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  }),
);

export { passport as passportJwt };
