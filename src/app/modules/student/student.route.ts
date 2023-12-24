import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middleWares/validateRequest';
import { studentValidationZod } from './student.validation.zod';
import auth from '../../middleWares/auth';

const router = express.Router();

router.get('/', auth('admin'), StudentController.getStudents);

router.get('/:id', auth('admin'), StudentController.getSingleStudent);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(studentValidationZod.updateStudentSchemaZod),
  StudentController.updateSingleStudent,
);

router.delete('/:id', auth('admin'), StudentController.deleteSingleStudent);

export const StudentRoutes = router;
