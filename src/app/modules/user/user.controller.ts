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
export const userControllers = {
  createStudent,
};
