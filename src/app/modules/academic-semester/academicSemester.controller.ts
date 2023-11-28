import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { academicServices } from './academicSemester.services';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicServices.createAcademicSemesterIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester create successfully',
    data: result,
  });
});

const getAllAcademicSemester = catchAsync(async(req, res)=> {
  const result = await academicServices.getAllAcademicSemesterFromDb()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get all Semesters successfully',
    data: result,
  });
})
const getSingleAcademicSemester = catchAsync(async(req, res)=> {
  const semesterId = req.params.semesterId
  const result = await academicServices.getSingleAcademicSemesterFromDb(semesterId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get single Semester successfully',
    data: result,
  });
})
const updateSingleAcademicSemester = catchAsync(async(req, res)=> {
  const semesterId = req.params.semesterId
  const result = await academicServices.updateSingleAcademicSemesterFromDb(semesterId, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get single Semester successfully',
    data: result,
  });
})

export const academicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateSingleAcademicSemester
};
