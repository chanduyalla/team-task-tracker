import type { Request } from "express";
import { prisma } from "../prismaClient.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import { comparePassword } from "../utils/password.js";

class AuthController {
  Login = async (req: Request) => {
    try {
      const user = await prisma.user.findUnique({
        where: { email: req.body.email },
        include: {
          role: {
            include: {
              rolePermissions: {
                include: {
                  resource: true,
                  permission: true,
                },
              },
            },
          },
        },
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
      const userPermissions = user.role.rolePermissions.reduce(
        (acc: any, rp: any) => {
          const resource = rp.resource.name;
          const permission = rp.permission.action;

          if (!acc[resource]) {
            acc[resource] = [];
          }

          acc[resource].push(permission);

          return acc;
        },
        {},
      );
      return {
        message: "successfully logined",
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role: user.role.name,
          permissions: userPermissions,
        },
      };
    } catch (error) {
      throw error;
    }
  };
  refreshToken = async (req: Request) => {
    const token = req.body.refreshToken;

    if (!token) {
      throw new Error("NO_REFRESH_TOKEN");
    }

    const storedToken = await prisma.userRefreshToken.findUnique({
      where: { refresh_token: token },
      include: { user: { include: { role: true } } },
    });

    if (!storedToken || storedToken.revoked) {
      throw new Error("INVALID_REFRESH_TOKEN");
    }

    await prisma.userRefreshToken.update({
      where: { refresh_token: token },
      data: { revoked: true, revoked_at: new Date() },
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

  logout = async (req: Request) => {
    const token = req.body.refreshToken;

    if (!token) {
      throw new Error("NO_REFRESH_TOKEN");
    }

    const storedToken = await prisma.userRefreshToken.findUnique({
      where: { refresh_token: token },
    });

    if (!storedToken) {
      throw new Error("INVALID_REFRESH_TOKEN");
    }

    await prisma.userRefreshToken.update({
      where: { refresh_token: token },
      data: { revoked: true, revoked_at: new Date() },
    });

    return { message: "Logged out successfully" };
  };
}

export default AuthController;
