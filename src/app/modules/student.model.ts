import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student/student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    // required: [true, 'First Name is required'],
    // maxlength: [20, 'First Name should not me more than 20'],
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameValue = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstNameValue === value;
    //   },
    //   message: '{VALUE} is not in capitalized format',
    // },
  },
  middleName: {
    type: String,
    // No specific required message, assumes optional.
  },
  lastName: {
    type: String,
    // required: [true, 'Last Name is required'],
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} must be in character',
    // },
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [true, "Father's Name is required"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's Occupation is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's Contact Number is required"],
  },
  motherName: {
    type: String,
    required: [true, "Mother's Name is required"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's Occupation is required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's Contact Number is required"],
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: [true, "Local Guardian's Name is required"],
  },
  occupation: {
    type: String,
    required: [true, "Local Guardian's Occupation is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local Guardian's Contact Number is required"],
  },
  address: {
    type: String,
    required: [true, "Local Guardian's Address is required"],
  },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  name: {
    type: userNameSchema,
    required: [true, "Student's Name is required"],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'others'],
      message: 'Values must be male, female, or others',
    },
    required: [
      true,
      'Gender is required and should be either male, female, or others',
    ],
  },
  dateOfBirth: { type: String },
  email: { type: String, required: true, unique: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian details are required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local Guardian details are required'],
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

export const StudentModel = model<Student>('Student', studentSchema);
