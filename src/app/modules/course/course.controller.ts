import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseServices } from "./course.services";

const createCourse = catchAsync(async (req, res) => {
    const result = await courseServices.createCourseIntoDb(
      req.body,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty create successfully',
      data: result,
    });
  });
  
  const getAllCourses = catchAsync(async (req, res) => {
    const result = await courseServices.getCoursesFromDb(req.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Retrive all courses successfully',
      data: result,
    });
  });
  
  const getSingleCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result =
      await courseServices.getSingleCourseFromDb(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Retrive a course successfully',
      data: result,
    });
  });
  
  const deleteSingleCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result =
      await courseServices.deleteACourseFromDb(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Retrive a course successfully',
      data: result,
    });
  });
  
  const updateSingleCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result =
      await courseServices.updateCourseIntoDb(id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Update a Academic Faculty successfully',
      data: result,
    });
  });
  
  export const courseControllers = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    deleteSingleCourse,
    updateSingleCourse
  };
  