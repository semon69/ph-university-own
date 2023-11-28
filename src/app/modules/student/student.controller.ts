import { studentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const getStudents = catchAsync(async (req, res, next) => {
  const result = await studentServices.getAllStudents();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Students successfully',
    data: result,
  });
});

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const getSingleStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await studentServices.getSingleStudent(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get one Student data successfully',
    data: result,
  });
});

const deleteSingleStudent = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req, res, next) => {
    const { id } = req.params;
    const result = await studentServices.deleteSingleStudent(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student deleted successfully',
      data: result,
    });
  },
);

export const StudentController = {
  getStudents,
  getSingleStudent,
  deleteSingleStudent,
};
