import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { hashString } from "../utils/hashString.js";
import {
  insertUser,
  deleteUsers,
  findUserByEmail,
  addRefreshToken,
  deleteRefreshToken,
  getUserToken,
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
    // Delete old tokens
    await deleteRefreshToken(user.id);
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
    const result = await deleteRefreshToken(payload.sub);

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

export async function deleteAllUsers(req, res) {
  const result = await deleteUsers();
  res.json({
    message: `All users deleted from the DB!`,
    result: result,
  });
}

function generateAccessToken(userId) {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    expiresIn: "15min",
  });
}
export async function getAccessToken(req, res, next) {
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

    // Generate a new access token
    const newAccessToken = generateAccessToken(payload.sub);
    // Return the new access token
    return res.json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    next(error);
  }
}
