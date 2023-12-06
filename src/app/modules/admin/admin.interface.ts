import { Model, Types } from 'mongoose';
import { TUserName } from '../student/student.interface';

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: TUserName;
  gender: 'male' | 'female' | 'others';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  isDeleted: boolean;
};

// For creating static
export interface AdminModel extends Model<TAdmin> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TAdmin | null>;
}