/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { Student } from './student.model';
import { User } from '../user/user.model';
import { AppError } from '../../errors/appErrors';
import httpStatus from 'http-status';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builders/QueryBuilder';
import { studentSearchAbleFields } from './student.constant';

const getAllStudents = async (query: Record<string, unknown>) => {
  // const objQuery = { ...query };

  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query.searchTerm as string;
  // }

  // const searchQuery = Student.find({
  //   $or: studentSearchAbleFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // // Filtering
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  // excludeFields.forEach((field) => delete objQuery[field]);
  // const filterQuery = searchQuery
  //   .find(objQuery)
  //   .populate('user')
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: 'academicFaculty',
  //   });

  // let sort = '-createdAt';
  // if (query?.sort) {
  //   sort = query.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort);

  // let page = 1;
  // let limit = 1;
  // let skip = 0;

  // if (query?.limit) {
  //   limit = Number(query.limit);
  // }
  // if (query?.page) {
  //   page = Number(query?.page);
  //   skip = (page - 1) * limit;
  // }

  // const paginateQuery = sortQuery.skip(skip);

  // const limitQuery = paginateQuery.limit(limit);

  // field limiting
  // let fields = '-__v';
  // if (query?.fields) {
  //   fields = (query?.fields as string).split(',').join(' ');

  // }
  // const fieldQuery = await limitQuery.select(fields)

  // return fieldQuery;

  const studentQuery = new QueryBuilder(
    Student.find()
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: 'academicFaculty',
    }),
    query,
  )
    .search(studentSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudent = async (id: string) => {
  const isStudentExists = await Student.isUserExists(id);
  if (!isStudentExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This student doesn't exis. Try with valid Id",
    );
  }
  const result = await Student.findById(id)
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

  const result = await Student.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true
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
    const deleteStudent = await Student.findByIdAndUpdate(
    id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

      // get user _id from deletedAdmin
      const userId = deleteStudent.user;

    // delete user (transaction 2)
    const deleteUser = await User.findByIdAndUpdate(
      { _id: userId },
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
