import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicFacultyServices } from './academicFaculty.services';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.createAcademicFacultyIntoDb(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty create successfully',
    data: result,
  });
});

const getAllAcadmicFaculties = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.getAllAcadmicFacultiesFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrive all Academic Faculty successfully',
    data: result,
  });
});

const getSingleAcadmicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await academicFacultyServices.getSingleAcadmicFacultiesFromDb(facultyId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrive a Academic Faculty successfully',
    data: result,
  });
});

export const academicFacultyControllers = {
  createAcademicFaculty,
  getAllAcadmicFaculties,
  getSingleAcadmicFaculty,
};
