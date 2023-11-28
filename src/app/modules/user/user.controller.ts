import {RequestHandler } from 'express';
// import { userValidationZod } from './user.validation.zod';
import { userServices } from './user.service';

const createStudent: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { password, student } = req.body;

    // Zod validation
    // const zodParseData = userValidationZod.userSchemaZod.parse(userData);

    const result = await userServices.createStudentIntoDB(password, student);

    res.status(200).json({
      success: true,
      message: 'Student create successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const userControllers = {
  createStudent,
};
