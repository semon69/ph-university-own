import express from 'express';
import auth from '../../middleWares/auth';
import validateRequest from '../../middleWares/validateRequest';
import { enrolledCourseValidations } from './enrolledCourse.validation';
import { enrolledCourseControllers } from './enrolledCourse.controller';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth('student'),
  validateRequest(
    enrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  enrolledCourseControllers.createEnrolledCourse,
);

router.patch(
  '/update-enrolled-course-marks',
  auth('faculty'),
  validateRequest(
    enrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
  ),
  enrolledCourseControllers.updateEnrolledCourseMarks,
);

export const EnrolledCourseRoutes = router;
