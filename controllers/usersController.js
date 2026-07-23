import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { hashString } from "../utils/hashString.js";
import {
  insertUser,
  deleteUsers,
  findUserByEmail,
  addRefreshToken,
} from "../db/usersQueries.js";

export const registerUser = async (req, res) => {
  try {
    const user = req.body;
    const hash = await hashString(user.password);

    const result = await insertUser(user, hash);
    res.json({
      message: `User ${user.email} added to the DB!`,
      result: result,
    });
  } catch (error) {
    console.error(error);
  }
};

export async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
      expiresIn: "15min",
    });
    const refreshToken = jwt.sign(
      { sub: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" },
    );
    const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const hashedRefreshToken = await hashString(refreshToken);
    // Store hashedRefreshToken in the database
    const result = await addRefreshToken(
      user.id,
      hashedRefreshToken,
      expirationDate,
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // <-- browser will only send that cookie over HTTPS
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      accessToken,
      result,
    });
  } catch (error) {
    console.error(error);
  }
}

export function logoutUser(req, res) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.render("status", {
      pageTitle: "Logged out",
      title: "Log out",
      message: "You have logged out correctly.",
      redirectTo: "/",
      redirectDelay: 2500,
    });
  });
}

export async function deleteAllUsers(req, res) {
  const result = await deleteUsers();
  res.json({
    message: `All users deleted from the DB!`,
    result: result,
  });
}

function generateAccessToken(user) {
  return sign(user, process.env.JWT_SECRET, { expiresIn: "2m" });
}
export function getAccessToken(req, res) {
  // Get user
  const user = req.user
  // Validate user
  // Get token from DB
  // Validate token
  // Generate new token
  // Store new token in DB
  // Return token to client
}