import { Router } from "express";
import {
  registerUser,
  logoutUser,
  loginUser,
  deleteAllUsers,
} from "../controllers/usersController.js";
import { getAccessToken } from "../controllers/authController.js";
import {
  validateLogin,
  validateRegistration,
} from "../validators/usersValidator.js";

const usersRouter = Router();

usersRouter.post("/register", validateRegistration, registerUser);

usersRouter.delete("/delete", deleteAllUsers);

usersRouter.post("/login", validateLogin, loginUser);

usersRouter.post("/logout", logoutUser);

usersRouter.post("/token", getAccessToken);

// TODO register GET route --> in frontend?
// usersRouter.get("/register", (req, res) => {
//   res.render("register", { title: "Register user" });
// });

// TODO login GET route --> in frontend?
// usersRouter.get("/login", (req, res) => {
//   res.render("login", { title: "Log in" });
// });

export { usersRouter };
