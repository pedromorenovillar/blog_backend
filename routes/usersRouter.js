import { Router } from "express";
import {
  registerUser,
  logoutUser,
  loginUser,
  deleteAllUsers,
  getUser,
} from "../controllers/usersController.js";
import { getAccessToken } from "../controllers/authController.js";
import {
  validateLogin,
  validateRegistration,
} from "../validators/usersValidator.js";
import { isAuth } from "../middleware/auth.js";

const usersRouter = Router();

usersRouter.post("/register", validateRegistration, registerUser);

usersRouter.delete("/delete", deleteAllUsers);

usersRouter.post("/login", validateLogin, loginUser);

usersRouter.post("/logout", logoutUser);

usersRouter.post("/token", getAccessToken);

usersRouter.get("/me", isAuth, getUser);

export { usersRouter };
// TODO register GET route --> in frontend?
// usersRouter.get("/register", (req, res) => {
//   res.render("register", { title: "Register user" });
// });

// TODO login GET route --> in frontend?
// usersRouter.get("/login", (req, res) => {
//   res.render("login", { title: "Log in" });
// });
