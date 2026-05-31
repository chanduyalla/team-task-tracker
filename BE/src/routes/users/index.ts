import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "./usersHandler.js";
import { checkPermission } from "../../middlewares/checkPermission.js";
import validateRequest from "../../middlewares/validateRequest.js";
import {
  createUserValidationSChema,
  deleteUserValidationSchema,
  getUserByIdValidationSchema,
  updateUserValidationSChema,
} from "../../validations/userValidation.js";

const router = Router();

router.get("/", checkPermission("USERS", "READ"), getUsers);

router.get(
  "/:id",
  checkPermission("USERS", "READ"),
  validateRequest(getUserByIdValidationSchema),
  getUserById,
);

router.post(
  "/",
  checkPermission("USERS", "CREATE"),
  validateRequest(createUserValidationSChema),
  createUser,
);

router.put(
  "/:id",
  checkPermission("USERS", "UPDATE"),
  validateRequest(updateUserValidationSChema),
  updateUser,
);

router.delete(
  "/:id",
  checkPermission("USERS", "DELETE"),
  validateRequest(deleteUserValidationSchema),
  deleteUser,
);

export default router;
