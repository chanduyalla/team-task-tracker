import type { Request } from "express";
import { prisma } from "../prismaClient.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import { comparePassword } from "../utils/password.js";

class AuthController {
  Login = async (req: Request) => {
    try {
      const user = await prisma.user.findUnique({
        where: { email: req.body.email },
        include: { role: true },
      });
      if (!user) {
        throw new Error("USER_NOT_FOUND");
      }
      const isMatch = await comparePassword(req.body.password, user.password);

      if (!isMatch) {
        throw new Error("INVALID_CREDENTIALS");
      }

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      await prisma.userRefreshToken.create({
        data: {
          refresh_token: refreshToken,
          user_id: user.id,
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          revoked: false,
        },
      });
      return {
        message: "successfully logined",
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw error;
    }
  };
  refreshToken = async (req: Request) => {
    const token = req.body.refreshToken;

    if (!token) {
      throw new Error("No refresh token");
    }

    const storedToken = await prisma.userRefreshToken.findUnique({
      where: { refresh_token: token },
      include: { user: { include: { role: true } } },
    });

    if (!storedToken || storedToken.revoked) {
      throw new Error("Invalid refresh token");
    }

    await prisma.userRefreshToken.update({
      where: { refresh_token: token },
      data: { revoked: true },
    });

    const newAccessToken = generateAccessToken(storedToken.user);
    const newRefreshToken = generateRefreshToken(storedToken.user);

    await prisma.userRefreshToken.create({
      data: {
        refresh_token: newRefreshToken,
        user_id: storedToken.user.id,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        revoked: false,
      },
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  };
}

export default AuthController;
