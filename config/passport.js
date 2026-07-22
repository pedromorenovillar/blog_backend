import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { findUserById } from "../db/usersQueries.js";
import { config } from "dotenv";

config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const userId = payload.sub || payload.id || payload.userId;
      const user = await findUserById(userId);

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }),
);

export default passport;

// JWT strategy expects a token payload, not email/password
// Not needed: passport.serializeUser()/deserializeUser(), because JWT is stateless.
