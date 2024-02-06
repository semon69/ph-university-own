import { Router } from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { courseControllers } from './course.controller';
import { courseValidationZod } from './course.validation.zod';
import auth from '../../middleWares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/create-course',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(courseValidationZod.createCourseValidation),
  courseControllers.createCourse,
);

router.get(
  '/',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.student,
    USER_ROLE.faculty,
  ),
  courseControllers.getAllCourses,
);

router.get(
  '/:id',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.student,
    USER_ROLE.faculty,
  ),
  courseControllers.getSingleCourse,
);
router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(courseValidationZod.updateCourseValidation),
  courseControllers.updateSingleCourse,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  courseControllers.deleteSingleCourse,
);

router.put(
  '/:courseId/assign-faculties',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(courseValidationZod.courseFacultyValidation),
  courseControllers.assignFaculties,
);

router.delete(
  '/:courseId/remove-faculties',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(courseValidationZod.courseFacultyValidation),
  courseControllers.removeFaculties,
);

export const CourseRoutes = router;
