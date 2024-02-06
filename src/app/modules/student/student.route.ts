import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middleWares/validateRequest';
import { studentValidationZod } from './student.validation.zod';
import auth from '../../middleWares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/', auth(USER_ROLE.admin, USER_ROLE.superAdmin), StudentController.getStudents);

router.get('/:id', auth(USER_ROLE.admin, USER_ROLE.superAdmin), StudentController.getSingleStudent);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(studentValidationZod.updateStudentSchemaZod),
  StudentController.updateSingleStudent,
);

router.delete('/:id', auth(USER_ROLE.admin, USER_ROLE.superAdmin), StudentController.deleteSingleStudent);

export const StudentRoutes = router;
