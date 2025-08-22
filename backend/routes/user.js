import express from "express";
import { getUsers, createUser, deleteUser, updateUser, getUsersByName } from "../controllers/user.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:userName", getUsersByName);
router.post("/", createUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

export default router;