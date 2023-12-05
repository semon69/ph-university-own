import express from 'express';
import { userControllers } from './user.controller';
import { studentValidationZod } from '../student/student.validation.zod';
import validateRequest from '../../middleWares/validateRequest';
import { facultyValidationZod } from '../faculty/faculty.validation.zod';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidationZod.createStudentSchemaZod),
  userControllers.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(facultyValidationZod.createFacultySchemaZod),
  userControllers.createFaculty,
);

export const UserRoutes = router;
