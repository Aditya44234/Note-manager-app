import express from "express";
import { register, Login, getAllusers } from "../controllers/authController.js";

const router = express.Router();

//Public router where no token is required
router.post("/register", register);
router.post("/login", Login);
router.get("/get-users", getAllusers);

export default router;
