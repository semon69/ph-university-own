import { Model, Types } from 'mongoose';
import { TUserName } from '../student/student.interface';

export type TFaculty = {
  id: string;
  user: Types.ObjectId;
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
  academicDepartment: Types.ObjectId 
  academicFaculty: Types.ObjectId;
  isDeleted: boolean;
};

// For creating static
export interface FacultyModel extends Model<TFaculty> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TFaculty | null>;
}

// For creating custom instance method
// export type TStudentMethods = {
//   isUserExists(id: string): Promise<TStudent | null>
// }

// export type StudentModel = Model<TStudent, Record<string, never>, TStudentMethods>
