import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  newTask,
  getMyTask,
  deleteTask,
  updateTask,
} from "../controllers/task.js";
const router = express();
router.post("/newtask", isAuthenticated, newTask);
router.get("/my", isAuthenticated, getMyTask);
router.delete("/:id", isAuthenticated, deleteTask);

router.put("/:id", isAuthenticated, updateTask);

export default router;
