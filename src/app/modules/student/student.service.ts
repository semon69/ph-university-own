import mongoose from 'mongoose';
import { Student } from './student.model';
import { User } from '../user/user.model';
import { AppError } from '../../errors/appErrors';
import httpStatus from 'http-status';

const getAllStudents = async () => {
  const result = await Student.find()
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: 'academicFaculty',
    });
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
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const studentServices = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
};
