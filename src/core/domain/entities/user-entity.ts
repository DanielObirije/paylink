export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: "USER" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserData {
  email: string;
  password: string;
  name: string;
  role?: "USER" | "ADMIN";
}
