import { Request, Response } from 'express';
import { studentServices } from './student.service';

const createStudent = (req: Request, res: Response) => {
  try {
    const student = req.body.student;
    const result = studentServices.createStudentIntoDB(student);
    res.status(200).json({
      success: true,
      message: 'Student create successfully',
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

const getStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudents();
    res.status(200).json({
      success: true,
      message: 'Get Students successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

export const StudentController = {
  createStudent,
  getStudents,
  getSingleStudent,
};
