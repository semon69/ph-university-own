import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OfferedCourseServices } from './offeredCourse.services';

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course is created successfully !',
    data: result,
  });
});

const getAllOfferedCourses = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseServices.getAllOfferedCoursesFromDB(
    req.query,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Courses data retrieved successfully !',
    data: result,
  });
});
const getMyOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId
  const result = await OfferedCourseServices.getMyOfferedCourseFromDB(
    userId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Offered Course data retrieved successfully !',
    data: result,
  });
});

const getSingleOfferedCourses = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await OfferedCourseServices.getSingleOfferedCourseFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'A Offered Course data fetched successfully',
      data: result,
    });
  },
);

const updateOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await OfferedCourseServices.updateOfferedCourseIntoDB(
    id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course updated successfully',
    data: result,
  });
});

const deleteOfferedCourseFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await OfferedCourseServices.deleteOfferedCourseFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered Course deleted successfully',
      data: result,
    });
  },
);

export const OfferedCourseControllers = {
  createOfferedCourse,
  getAllOfferedCourses,
  getMyOfferedCourse,
  getSingleOfferedCourses,
  updateOfferedCourse,
  deleteOfferedCourseFromDB,
};
