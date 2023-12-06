import { Model, Types } from 'mongoose';
import { TUserName } from '../student/student.interface';

export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: TUserName;
  gender: 'male' | 'female' | 'others';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  academicDepartment: Types.ObjectId 
  isDeleted: boolean;
};

// For creating static
export interface FacultyModel extends Model<TFaculty> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TFaculty | null>;
}
