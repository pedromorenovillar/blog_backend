import { Router } from "express";
import {
  registerUser,
  logoutUser,
  loginUser,
  deleteAllUsers,
  getAccessToken,
} from "../controllers/usersController.js";
// import { validateRegistration } from "../validators/validateRegistration.js";
// import { validateLogin } from "../validators/validateLogin.js";
import passport from "passport";

const usersRouter = Router();

// usersRouter.get("/register", (req, res) => {
//   res.render("register", { title: "Register user" });
// });

usersRouter.post("/register", registerUser);

usersRouter.delete("/delete", deleteAllUsers);

// usersRouter.get("/login", (req, res) => {
//   res.render("login", { title: "Log in" });
// });

usersRouter.post("/login", loginUser);

usersRouter.post("/logout", logoutUser);

usersRouter.post("/token", getAccessToken);

export { usersRouter };
