import { Model, Types } from 'mongoose';
import { TUserName } from '../student/student.interface';

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  password: string;
  needsPasswordChange: boolean;
  role: string;
  designation: string;
  name: TUserName;
  gender: 'male' | 'female' | 'others';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  managementDepartment: string;
  isDeleted: boolean;
};

// For creating static
export interface AdminModel extends Model<TAdmin> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TAdmin | null>;
}

// For creating custom instance method
// export type TStudentMethods = {
//   isUserExists(id: string): Promise<TStudent | null>
// }

// export type StudentModel = Model<TStudent, Record<string, never>, TStudentMethods>
