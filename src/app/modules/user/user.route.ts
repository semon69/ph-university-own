import express from 'express';
import { userControllers } from './user.controller';
import { studentValidationZod } from '../student/student.validation.zod';
import validateRequest from '../../middleWares/validateRequest';
import { facultyValidationZod } from '../faculty/faculty.validation.zod';
import { adminValidationZod } from '../admin/admin.validation.zod';
import auth from '../../middleWares/auth';
import { USER_ROLE } from './user.constant';
const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(studentValidationZod.createStudentSchemaZod),
  userControllers.createStudent,
);

router.post(
  '/create-faculty',
  auth("admin"),
  validateRequest(facultyValidationZod.createFacultySchemaZod),
  userControllers.createFaculty,
);

router.post(
  '/create-admin',
  auth("admin"),
  validateRequest(adminValidationZod.createAdminSchemaZod),
  userControllers.createAdmin,
);

router.get(
  '/me',
  auth("admin", 'student', 'faculty'),
  userControllers.getMe,
);

export const UserRoutes = router;
