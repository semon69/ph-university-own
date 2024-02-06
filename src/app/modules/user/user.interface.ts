/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser  {
  id: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangeAt: Date;
  role: 'superAdmin' | 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};

export type TUserRole = keyof typeof USER_ROLE;

export interface UserModel extends Model<TUser> {
  isUserExists(id: string): Promise<TUser | null>;
  isPasswordMatched(plaintextPassword: string, hashedPassword:string): Promise<boolean>;
  isJWTIssuedBeforePasswordChange(passwordChangeTimeStamp: Date, jwtIssuedTimeStamp: number): boolean
}