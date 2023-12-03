/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { Student } from './student.model';
import { User } from '../user/user.model';
import { AppError } from '../../errors/appErrors';
import httpStatus from 'http-status';
import { TStudent } from './student.interface';

const getAllStudents = async (query: Record<string, unknown>) => {
  const objQuery = { ...query };

  const studentSearchAbleFields = ['email', 'name.firstName', 'presentAddres'];
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  const searchQuery = Student.find({
    $or: studentSearchAbleFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  // Filtering
  const excludeFields = ['searchTerm', 'sort','limit'];
  excludeFields.forEach((field) => delete objQuery[field]);
  const filterQuery = searchQuery
    .find(objQuery)
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: 'academicFaculty',
    });

  let sort = '-createdAt';
  if (query?.sort) {
    sort = query.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);

  let limit = 1;
  if(query?.limit){
    limit = Number(query.limit)
  }
  const limitQuery = await sortQuery.limit(limit)

  return limitQuery;
};

const getSingleStudent = async (id: string) => {
  const isStudentExists = await Student.isUserExists(id);
  if (!isStudentExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This student doesn't exis. Try with valid Id",
    );
  }
  const result = await Student.findOne({ id })
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: 'academicFaculty',
    });
  // const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const updateSingleStudent = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingField } = payload;

  const updatedData: Record<string, unknown> = { ...remainingField };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      updatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      updatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      updatedData[`localGuardian.${key}`] = value;
    }
  }

  const isStudentExists = await Student.isUserExists(id);
  if (!isStudentExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This student doesn't exis. Try with valid Id",
    );
  }

  const result = await Student.findOneAndUpdate({ id }, updatedData, {
    new: true,
  });
  return result;
};

const deleteSingleStudent = async (id: string) => {
  const session = await mongoose.startSession();
  const isStudentExists = await Student.isUserExists(id);

  if (!isStudentExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This student doesn't exis. Try with valid Id",
    );
  }

  try {
    session.startTransaction();
    // delete student (transaction 1)
    const deleteStudent = await Student.findOneAndUpdate(
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

export const studentServices = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
  updateSingleStudent,
};
