import express from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';
import { OfferedCourseControllers } from './offeredCourse.controllers';
import auth from '../../middleWares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

router.get(
  '/',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
  ),
  OfferedCourseControllers.getAllOfferedCourses,
);

router.get(
  '/my-offered-course',
  auth(
    USER_ROLE.student
  ),
  OfferedCourseControllers.getMyOfferedCourse,
);

router.get(
  '/:id',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.student,
    USER_ROLE.faculty,
  ),
  OfferedCourseControllers.getSingleOfferedCourses,
);

router.post(
  '/create-offered-course',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  OfferedCourseControllers.deleteOfferedCourseFromDB,
);

export const offeredCourseRoutes = router;
