import config from "@/config";
import jwt from "jsonwebtoken";
import pool from "@/libs/postgres_db";
import type { Response, Request } from "express";
import { UserSchema } from "@/models/user";
import z from "zod";
import bcrypt from "bcryptjs";

type UserData = Pick<
  z.infer<typeof UserSchema>,
  "email" | "name" | "role" | "password"
>;
type logindata = Pick<z.infer<typeof UserSchema>, "password" | "email">;

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsedData = UserSchema.pick({
      name: true,
      email: true,
      password: true,
      role: true,
    }).parse(req.body);

    const { name, email, password, role } = req.body as UserData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash, role)
     VALUES ($1, $2, $3,$4)
     RETURNING id, name, email, role, created_at`,
      [name, email, hashedPassword, role]
    );
    const user = result.rows[0];
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    // console.log(email, password, role);
    res.status(201).json({
      message: "New user created",
      data: user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      code: "ServerError",
      message: "Internal server error",
      error,
    });
    console.log("Error during user registeration", error);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { password, email } = req.body as logindata;
    const result = await pool.query(
      `SELECT id, name, email, password_hash, role FROM users WHERE email = $1`,
      [email]
    );
    const user = result.rows[0];

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      code: "ServerError",
      message: "Internal server error",
      error,
    });
    console.log("Error during user login", error);
  }
};


