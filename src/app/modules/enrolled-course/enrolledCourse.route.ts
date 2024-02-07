import express from 'express';
import auth from '../../middleWares/auth';
import validateRequest from '../../middleWares/validateRequest';
import { enrolledCourseValidations } from './enrolledCourse.validation';
import { enrolledCourseControllers } from './enrolledCourse.controller';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth(USER_ROLE.student),
  validateRequest(
    enrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  enrolledCourseControllers.createEnrolledCourse,
);

router.get(
  '/my-enrolled-courses',
  auth(USER_ROLE.student),
  enrolledCourseControllers.getMyEnrolledCourses,
);

router.patch(
  '/update-enrolled-course-marks',
  auth(USER_ROLE.faculty, USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    enrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
  ),
  enrolledCourseControllers.updateEnrolledCourseMarks,
);

export const EnrolledCourseRoutes = router;
