import { z } from "zod";;

export const UserSchema = z.object({
  id: z.string().uuid({ message: "Invalid UUID format for id" }),
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]+$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and only alphanumeric characters.",
    }),
  role: z.string().min(1, { message: "Role is required" }),
});

export type UserSchema = z.infer<typeof UserSchema>;
