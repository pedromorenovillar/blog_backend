import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { hashString } from "../utils/hashString.js";
import {
  addRefreshToken,
  deleteRefreshToken,
  getUserToken,
} from "../db/authQueries.js";

export function generateAccessToken(userId) {
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
