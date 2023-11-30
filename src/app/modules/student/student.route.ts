import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middleWares/validateRequest';
import { studentValidationZod } from './student.validation.zod';

const router = express.Router();

router.get('/', StudentController.getStudents);
router.get('/:id', StudentController.getSingleStudent);
router.patch(
  '/:id',
  validateRequest(studentValidationZod.updateStudentSchemaZod),
  StudentController.updateSingleStudent,
);
router.delete('/:id', StudentController.deleteSingleStudent);

export const StudentRoutes = router;
