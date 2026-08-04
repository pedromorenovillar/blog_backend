export function isWriter(req, res, next) {
  if (!req.user.isAuthor) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  next();
}
