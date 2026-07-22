import passport from "passport";
// import { Strategy as LocalStrategy } from "passport-local";
import { JwtStrategy, ExtractJwt } from "passport-jwt";
import { findUserByEmail, findUserById } from "../db/usersQueries.js";
import bcrypt from "bcryptjs";
import { config } from "dotenv";

config()
// Passport receives the username and password from the login form.
// findUserByEmail() retrieves the user from the database.
// bcrypt.compare(password, user.password) hashes the supplied password using the same salt embedded in the stored hash.
// It compares the new hash to the stored one.
// If they match, done(null, user) tells Passport that authentication succeeded.
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

passport.use(
  new JwtStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const user = await findUserByEmail(email);

        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const result = await findUserById(userId);
    done(null, result);
  } catch (error) {
    done(error);
  }
});
