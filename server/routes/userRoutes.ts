import { Router } from "express";
import { getAllUsers, getUserById, login, register } from "../controllers/user";

const router = Router();
router.get("/", getAllUsers);
router.post("/login", login);
router.post("/register", register);
router.get("/:id", getUserById);

export default router;
