import express from 'express';
import { facultyController } from './faculty.controller';
import validateRequest from '../../middleWares/validateRequest';
import { facultyValidationZod } from './faculty.validation.zod';
import auth from '../../middleWares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.superAdmin),
  facultyController.getFaculties,
);

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.superAdmin),
  facultyController.getSingleFaculty,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(facultyValidationZod.updateFacultySchemaZod),
  facultyController.updateSingleFaculty,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  facultyController.deleteSingleFaculty,
);

export const FacultyRoutes = router;
