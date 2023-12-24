import { Router } from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { courseControllers } from './course.controller';
import { courseValidationZod } from './course.validation.zod';
import auth from '../../middleWares/auth';

const router = Router();

router.post(
  '/create-course',
  auth('admin'),
  validateRequest(courseValidationZod.createCourseValidation),
  courseControllers.createCourse,
);

router.get(
  '/',
  auth('admin', 'faculty', 'student'),
  courseControllers.getAllCourses,
);

router.get(
  '/:id',
  auth('admin', 'faculty', 'student'),
  courseControllers.getSingleCourse,
);
router.patch(
  '/:id',
  auth('admin'),
  validateRequest(courseValidationZod.updateCourseValidation),
  courseControllers.updateSingleCourse,
);

router.delete('/:id', auth('admin'), courseControllers.deleteSingleCourse);

router.put(
  '/:courseId/assign-faculties',
  auth('admin'),
  validateRequest(courseValidationZod.courseFacultyValidation),
  courseControllers.assignFaculties,
);

router.delete(
  '/:courseId/remove-faculties',
  auth('admin'),
  validateRequest(courseValidationZod.courseFacultyValidation),
  courseControllers.removeFaculties,
);

export const CourseRoutes = router;
