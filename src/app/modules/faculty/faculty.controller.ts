import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { facultyServices } from './faculty.services';

const getFaculties = catchAsync(async (req, res) => {
  const result = await facultyServices.getAllFaculties(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Faculties successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await facultyServices.getSingleFaculty(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get one Faculty data successfully',
    data: result,
  });
});

const updateSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await facultyServices.updateSingleFaculty(id, faculty);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update one Faculty data successfully',
    data: result,
  });
});

const deleteSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await facultyServices.deleteSingleFaculty(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty deleted successfully',
    data: result,
  });
});

export const facultyController = {
  getFaculties,
  getSingleFaculty,
  updateSingleFaculty,
  deleteSingleFaculty,
};
