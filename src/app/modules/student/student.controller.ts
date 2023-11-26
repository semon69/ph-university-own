import { NextFunction, Request, Response } from 'express';
import { studentServices } from './student.service';

const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await studentServices.getAllStudents();
    res.status(200).json({
      success: true,
      message: 'Get Students successfully',
      data: result,
    });
  } catch (error) {
    next(error)
  }
};
const getSingleStudent = async (req: Request, res: Response,next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await studentServices.getSingleStudent(id);
    res.status(200).json({
      success: true,
      message: 'Get one Student data successfully',
      data: result,
    });
  } catch (error) {
    next(error)
  }
};
const deleteSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await studentServices.deleteSingleStudent(id);
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error)
  }
};

export const StudentController = {
  getStudents,
  getSingleStudent,
  deleteSingleStudent,
};
