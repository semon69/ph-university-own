/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { User } from '../user/user.model';
import { AppError } from '../../errors/appErrors';
import httpStatus from 'http-status';
import QueryBuilder from '../../builders/QueryBuilder';
import { Faculty } from './faculty.model';
import { TFaculty } from './faculty.interface';
import { facultySearchAbleFields } from './faculty.constant';

const getAllFaculties = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Faculty.find().populate('user').populate('admissionSemester').populate({
      path: 'academicDepartment',
      populate: 'academicFaculty',
    }),
    query,
  )
    .search(facultySearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleFaculty = async (id: string) => {
  const isStudentExists = await Faculty.isUserExists(id);
  if (!isStudentExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This student doesn't exis. Try with valid Id",
    );
  }
  const result = await Faculty.findOne({ id })
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: 'academicFaculty',
    });
  // const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const updateSingleFaculty = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingField } = payload;

  const updatedData: Record<string, unknown> = { ...remainingField };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      updatedData[`name.${key}`] = value;
    }
  }
  const isStudentExists = await Faculty.isUserExists(id);
  if (!isStudentExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This student doesn't exis. Try with valid Id",
    );
  }

  const result = await Faculty.findOneAndUpdate({ id }, updatedData, {
    new: true,
  });
  return result;
};

const deleteSingleFaculty = async (id: string) => {
  const session = await mongoose.startSession();
  const isStudentExists = await Faculty.isUserExists(id);

  if (!isStudentExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This student doesn't exis. Try with valid Id",
    );
  }

  try {
    session.startTransaction();
    // delete student (transaction 1)
    const deleteStudent = await Faculty.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    // delete user (transaction 2)
    const deleteUser = await User.updateOne(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deleteStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const facultyServices = {
    getAllFaculties,
    getSingleFaculty,
    updateSingleFaculty,
    deleteSingleFaculty,
};
