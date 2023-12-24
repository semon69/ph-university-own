import express from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';
import { OfferedCourseControllers } from './offeredCourse.controllers';
import auth from '../../middleWares/auth';
const router = express.Router();

router.get(
  '/',
  auth('admin', 'faculty', 'student'),
  OfferedCourseControllers.getAllOfferedCourses,
);

router.get(
  '/:id',
  auth('admin', 'faculty', 'student'),
  OfferedCourseControllers.getSingleOfferedCourses,
);

router.post(
  '/create-offered-course',
  auth('admin'),
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
);

router.delete(
  '/:id',
  auth('admin'),
  OfferedCourseControllers.deleteOfferedCourseFromDB,
);

export const offeredCourseRoutes = router;
