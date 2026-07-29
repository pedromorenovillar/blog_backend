import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { hashString } from "../utils/hashString.js";
import {
  insertUser,
  deleteUsers,
  findUserByEmail,
  findUserById,
} from "../db/usersQueries.js";
import { generateAccessToken } from "./authController.js";
import {
  deleteRefreshToken,
  addRefreshToken,
  getUserToken,
} from "../db/authQueries.js";

export const registerUser = async (req, res, next) => {
  try {
    const user = req.body;
    const hash = await hashString(user.password);

    const result = await insertUser(user, hash);
    console.log(result);
    res.status(201).json(result);
  } catch (error) {
    next(error);
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

    const accessToken = generateAccessToken(user.id);

    const refreshToken = jwt.sign(
      { sub: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" },
    );
    const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const hashedRefreshToken = await hashString(refreshToken);
    // Store hashedRefreshToken in the database
    await addRefreshToken(user.id, hashedRefreshToken, expirationDate);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // <-- browser will only send that cookie over HTTPS
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json({
      accessToken,
    });
  } catch (error) {
    next(error);
  }
}

export async function logoutUser(req, res, next) {
  try {
    // Read the cookie
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    // Verify the JWT
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Get the user's stored refresh token
    const storedUserToken = await getUserToken(payload.sub);
    if (!storedUserToken) {
      return res.status(401).json({
        message: "Refresh token not found",
      });
    }

    // Compare cookie token with stored hash
    const matches = await bcrypt.compare(refreshToken, storedUserToken.hash);
    if (!matches) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    // Delete the matching token
    await deleteRefreshToken(payload.sub);

    // Clear the cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
}

export async function deleteAllUsers(req, res, next) {
  try {
    const result = await deleteUsers();

    res.json({
      message: "All users deleted.",
      result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getUser(req, res, next) {
  try {
    // Get user id
    const userId = req.user.id;
    // Find user
    const foundUser = await findUserById(userId);
    return res.json(foundUser);
  } catch (error) {
    next(error);
  }
}
