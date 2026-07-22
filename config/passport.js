import passport from "passport";

export function isAuth(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    return next();
  })(req, res, next);
}

// JWT strategy expects a token payload, not email/password
// Not needed: passport.serializeUser()/deserializeUser(), because JWT is stateless.
