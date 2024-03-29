/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academic-semester/academicSemester.interface';
import { AcademicSemester } from '../academic-semester/academicSemester.model';
// import { TAcademicSemester } from '../academic-semester/academicSemester.interface';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import { TUser } from './user.interface';
import { User } from './user.model';
import { AppError } from '../../errors/appErrors';
import httpStatus from 'http-status';
import { Faculty } from '../faculty/faculty.model';
import { TFaculty } from '../faculty/faculty.interface';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { AcademicDepartment } from '../academic-department/academicDepartment.model';

const createStudentIntoDB = async (
  file: any,
  password: string,
  payload: TStudent,
) => {
  // create user
  const userData: Partial<TUser> = {};

  // If password is not given the use defalut password
  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'student';
  // set student email
  userData.email = payload.email;

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // check academic department
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );
  if (!academicDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found');
  }
  payload.academicFaculty = academicDepartment.academicFaculty;

  // create session
  const session = await mongoose.startSession();

  // set generated id
  try {
    session.startTransaction();

    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester,
    );

    if (file) {
      const imageName = `${userData?.id}${payload?.name?.firstName}`;
      const path = file?.path;

      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url as string;
    }

    // create a user (transaction 1)
    const newUser = await User.create([userData], { session });

    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference

    // create a student (transaction 2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    // commit transaction and end session
    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const createFacultyIntoDB = async (file: any, password: string, payload: TFaculty) => {
  // create user
  const userData: Partial<TUser> = {};

  // If password is not given the use defalut password
  userData.password = password || (config.default_pass as string);

  //   set student role
  userData.role = 'faculty';
  // set faculty email
  userData.email = payload.email;
  
  // check academic department
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );
  if (!academicDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found');
  }
  payload.academicFaculty = academicDepartment.academicFaculty;


  // create session
  const session = await mongoose.startSession();

  // set generated id
  try {
    session.startTransaction();

    if (file) {
      const imageName = `${userData?.id}${payload?.name?.firstName}`;
      const path = file?.path;

      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url as string;
    }

    userData.id = await generateFacultyId();
    // create a user (transaction 1)
    const newUser = await User.create([userData], { session });
    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference

    // create a student (transaction 2)
    const newFaculty = await Faculty.create([payload], { session });
    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    // commit transaction and end session
    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const createAdminIntoDB = async (file: any, password: string, payload: TAdmin) => {
  // create user
  const userData: Partial<TUser> = {};

  // If password is not given the use defalut password
  userData.password = password || (config.default_pass as string);

  //   set student role
  userData.role = 'admin';
  // set admin email
  userData.email = payload.email;

  // create session
  const session = await mongoose.startSession();

  // set generated id
  try {
    session.startTransaction();

    if (file) {
      const imageName = `${userData?.id}${payload?.name?.firstName}`;
      const path = file?.path;

      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url as string;
    }

    userData.id = await generateAdminId();
    // create a user (transaction 1)
    const newUser = await User.create([userData], { session });
    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference

    // create a student (transaction 2)
    const newAdmin = await Admin.create([payload], { session });
    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    // commit transaction and end session
    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const getMe = async (userId: string, role: string) => {
  // if (!token) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'Token is not found');
  // }

  // const decoded = (await verifyToken(
  //   token,
  //   config.jwt_access_token as string,
  // )) as JwtPayload;
  // const { userId, role } = decoded;

  let result = null;
  if (role == 'student') {
    result = await Student.findOne({ id: userId }).populate('user');
  }
  if (role == 'admin') {
    result = await Admin.findOne({ id: userId }).populate('user');
  }
  if (role == 'faculty') {
    result = await Faculty.findOne({ id: userId }).populate('user');
  }

  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const userServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
  changeStatus,
};
