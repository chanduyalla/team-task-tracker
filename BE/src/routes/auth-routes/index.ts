import { Router } from "express";
import { getRefreshToken, Login } from "./authHandler.js";
import { createUser } from "../users/usersHandler.js";

const router = Router();

router.post("/register", createUser);
router.post("login", Login);
router.post("/refresh", getRefreshToken);

export default router;
