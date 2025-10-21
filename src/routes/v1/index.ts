import { Router } from "express";
const router = Router()

/**
 * Routes
 */
import authRouter from "./auth";


/**
 * Root route
 */
router.get("/", (req, res) => {
  res.status(200).json({
    message: "Api is alive",
  });
});

router.use('/auth',authRouter)
 
export default router