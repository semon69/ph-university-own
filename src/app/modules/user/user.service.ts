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
import { verifyToken } from '../Auth/auth.utils';
import { JwtPayload } from 'jsonwebtoken';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
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
  // create session
  const session = await mongoose.startSession();

  // set generated id
  try {
    session.startTransaction();

    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester,
    );

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

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create user
  const userData: Partial<TUser> = {};

  // If password is not given the use defalut password
  userData.password = password || (config.default_pass as string);

  //   set student role
  userData.role = 'faculty';
  // set faculty email
  userData.email = payload.email;

  // create session
  const session = await mongoose.startSession();

  // set generated id
  try {
    session.startTransaction();

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

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
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

const getMe = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.NOT_FOUND, 'Token is not found');
  }

  const decoded = (await verifyToken(
    token,
    config.jwt_access_token as string,
  )) as JwtPayload;
  const { userId, role } = decoded;

  let result = null;
  if (role == 'student') {
    result = await Student.findOne({ id: userId });
  }
  if (role == 'admin') {
    result = await Admin.findOne({ id: userId });
  }
  if (role == 'faculty') {
    result = await Faculty.findOne({ id: userId });
  }


};

export const userServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
};
