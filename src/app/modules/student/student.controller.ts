import { NextFunction, Request, Response } from 'express';
import { studentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await studentServices.getAllStudents();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get Students successfully',
      data: result
    })
  } catch (error) {
    next(error)
  }
};
const getSingleStudent = async (req: Request, res: Response,next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await studentServices.getSingleStudent(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get one Student data successfully',
      data: result
    })
  } catch (error) {
    next(error)
  }
};
const deleteSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await studentServices.deleteSingleStudent(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student deleted successfully',
      data: result
    })
  } catch (error) {
    next(error)
  }
};

export const StudentController = {
  getStudents,
  getSingleStudent,
  deleteSingleStudent,
};
