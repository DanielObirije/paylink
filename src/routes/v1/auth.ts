import { Router } from "express";
import {register,login }from "@/constrollers/v1/auth/register";

const router = Router();
router.post("/register", register);
router.post("/login", login);


export default router;
 