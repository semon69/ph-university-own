import { Router } from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { courseControllers } from './course.controller';
import { courseValidationZod } from './course.validation.zod';

const router = Router();

router.post(
  '/create-course',
  validateRequest(courseValidationZod.createCourseValidation),
  courseControllers.createCourse,
);

router.get('/', courseControllers.getAllCourses);
router.get('/:id', courseControllers.getSingleCourse);
router.patch(
  '/:id',
  validateRequest(courseValidationZod.updateCourseValidation),
  courseControllers.updateSingleCourse,
);
router.delete('/:id', courseControllers.deleteSingleCourse);

export const CourseRoutes = router;
