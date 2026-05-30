import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "auth header is missing" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(404).json({ message: "token is missing" });
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
  }

  try {
    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
    );

    req.currentUser = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
