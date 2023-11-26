import { Request, Response } from 'express';
import { studentServices } from './student.service';

const getStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudents();
    res.status(200).json({
      success: true,
      message: 'Get Students successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      data: error,
    });
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await studentServices.getSingleStudent(id);
    res.status(200).json({
      success: true,
      message: 'Get one Student data successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      data: error,
    });
  }
};
const deleteSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await studentServices.deleteSingleStudent(id);
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      data: error,
    });
  }
};

export const StudentController = {
  getStudents,
  getSingleStudent,
  deleteSingleStudent,
};
