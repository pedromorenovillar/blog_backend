import { Router } from "express";
import {
  registerUser,
  logoutUser,
  loginUser,
  deleteAllUsers,
} from "../controllers/usersController.js";
import { getAccessToken } from "../controllers/authController.js";
import passport from "passport";
// import { validateRegistration } from "../validators/validateRegistration.js";
// import { validateLogin } from "../validators/validateLogin.js";

const usersRouter = Router();


usersRouter.post("/register", registerUser);

usersRouter.delete("/delete", deleteAllUsers);


usersRouter.post("/login", loginUser);

usersRouter.post("/logout", logoutUser);

usersRouter.post("/token", getAccessToken);

// usersRouter.get("/register", (req, res) => {
//   res.render("register", { title: "Register user" });
// });

// usersRouter.get("/login", (req, res) => {
//   res.render("login", { title: "Log in" });
// });

export { usersRouter };
