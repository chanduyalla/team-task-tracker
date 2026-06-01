import { Router } from "express";
import { getRefreshToken, Login, logout } from "./authHandler.js";
import { createUser } from "../users/usersHandler.js";
import validateRequest from "../../middlewares/validateRequest.js";
import { createUserValidationSChema } from "../../validations/userValidation.js";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserValidationSChema),
  createUser,
);
router.post("/login", Login);
router.post("/refresh", getRefreshToken);
router.post("/logout", logout);

export default router;
