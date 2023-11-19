import { Request, Response } from 'express';
import { studentServices } from './student.service';
// import studentSchemaJoi from './student.validation.joi';
import studentSchemaZod from './student.validation.zod';

const createStudent = async (req: Request, res: Response) => {

  try {
    const studentData = req.body.student

    // Zod validation
    const zodParseData = studentSchemaZod.parse(studentData)

    // Joi validation
    // const { error, value } = studentSchemaJoi.validate(req.body.student)

    const result = await studentServices.createStudentIntoDB(zodParseData);

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     error: error.details,
    //   });
    // }

    res.status(200).json({
      success: true,
      message: 'Student create successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
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

export const StudentController = {
  createStudent,
  getStudents,
  getSingleStudent,
};
