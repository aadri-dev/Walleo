import express from "express";
import { getUsers, createUser, deleteUser, updateUser, getUsersByName, perfil, login } from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:userName", getUsersByName);
router.get("/perfil", verifyToken, perfil);
router.post("/", createUser);
router.post("/login", login);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

export default router;