import { CreateUserData, User } from "../entities/user-entity";

export interface UserRepository {
  create(UserData: CreateUserData): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  delete(id: string): Promise<void>;
  update(id: string, updates: Partial<User>): Promise<User>;
}
