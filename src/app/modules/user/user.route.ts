import express from 'express';
import { userControllers } from './user.controller';
import { studentValidationZod } from '../student/student.validation.zod';
import validateRequest from '../../middleWares/validateRequest';
const router = express.Router();



router.post(
  '/create-student',
  validateRequest(studentValidationZod.createStudentSchemaZod),
  userControllers.createStudent,
);

export const UserRoutes = router;
