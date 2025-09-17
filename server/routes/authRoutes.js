

import express from 'express';
import { register,Login } from '../controllers/authController.js';

const router=express.Router();


//Public router where no token is required
router.post("/register",register);
router.post("/login",Login);

export default router;
