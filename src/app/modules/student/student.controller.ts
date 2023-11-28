import { studentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';


const getStudents = catchAsync(async (req, res) => {
  const result = await studentServices.getAllStudents();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Students successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
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
  async (req, res) => {
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
