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
router.put(
  '/:courseId/assign-faculties',
  validateRequest(courseValidationZod.courseFacultyValidation),
  courseControllers.assignFaculties,
);
router.delete(
  '/:courseId/remove-faculties',
  validateRequest(courseValidationZod.courseFacultyValidation),
  courseControllers.removeFaculties,
);

export const CourseRoutes = router;
