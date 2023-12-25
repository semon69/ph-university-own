// import { userValidationZod } from './user.validation.zod';
import { userServices } from './user.service';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

const createStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body;
  // Zod validation
  // const zodParseData = userValidationZod.userSchemaZod.parse(userData);
  const result = await userServices.createStudentIntoDB(password, student);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student create successfully',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty } = req.body;
  // Zod validation
  // const zodParseData = userValidationZod.userSchemaZod.parse(userData);
  const result = await userServices.createFacultyIntoDB(password, faculty);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty create successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin } = req.body;
  // Zod validation
  // const zodParseData = userValidationZod.userSchemaZod.parse(userData);
  const result = await userServices.createAdminIntoDB(password, admin);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin create successfully',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await userServices.getMe(token as string);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get my data successfully',
    data: result,
  });
});

export const userControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
};
