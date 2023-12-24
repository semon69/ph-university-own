/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export interface TUser  {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExists(id: string): Promise<TUser | null>;
  isPasswordMatched(plaintextPassword: string, hashedPassword:string): Promise<boolean>;
}