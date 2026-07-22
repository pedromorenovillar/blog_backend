export function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).res.json( {
      title: "Authorization missing",
      message: `You are not authorized to see this route. Please register or log in.`,
    });
  }
}
