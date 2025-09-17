import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";

import { protect } from "../middleware/auth.js";

import express from "express";

const router = express.Router();

router.post("/", protect, createNote);
router.get("/", protect, getNotes);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);

export default router;
