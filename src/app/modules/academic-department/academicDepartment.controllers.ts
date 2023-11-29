import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicDepartmentServices } from './academicDepartment.services';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentServices.createAcademicDepartmentIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department create successfully',
    data: result,
  });
});

const getAllAcadmicDepartments = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentServices.getAllAcadmicDepartmentsFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrive all Academic departments successfully',
    data: result,
  });
});

const getSingleAcadmicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await academicDepartmentServices.getSingleAcadmicDepartmentFromDb(
      departmentId,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrive a Academic department data successfully',
    data: result,
  });
});

const updateSingleAcadmicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await academicDepartmentServices.updateSingleAcadmicDepartmentFromDb(
      departmentId,
      req.body
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update a Academic department data successfully',
    data: result,
  });
});

export const academicDepartmentControllers = {
    createAcademicDepartment,
    getAllAcadmicDepartments,
    getSingleAcadmicDepartment,
    updateSingleAcadmicDepartment
};
