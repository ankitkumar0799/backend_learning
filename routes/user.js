import express from "express";
import {
  
  login,
  register,
  logOut,
  getMyDetails,
} from "../controllers/user.js";
import { isAuthenticated } from '../middlewares/auth.js'
import { User } from "../models/user.js";

const router = express.Router();

router.post("/new", register);

router.get("/login", login);




router.get("/logout", logOut);



router.get("/me",isAuthenticated, getMyDetails);

export default router;
