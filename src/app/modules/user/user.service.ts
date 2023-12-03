/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academic-semester/academicSemester.interface';
import { AcademicSemester } from '../academic-semester/academicSemester.model';
// import { TAcademicSemester } from '../academic-semester/academicSemester.interface';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { generateStudentId } from './user.constant';
import { TUser } from './user.interface';
import { User } from './user.model';
import { AppError } from '../../errors/appErrors';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create user
  const userData: Partial<TUser> = {};

  // If password is not given the use defalut password
  userData.password = password || (config.default_pass as string);

  //   set student role
  userData.role = 'student';
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
    throw new Error(error)
  }
};

export const userServices = {
  createStudentIntoDB,
};
