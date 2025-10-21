import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import config from "@/config";

const generateToken = (user: { id: number; role: string }) => {
  const payload = { id: user.id, role: user.role };
  const token = jwt.sign(payload, config.JWT_SECRET!, { expiresIn: "1h" }); // 1-hour expiry
  return token;
};

