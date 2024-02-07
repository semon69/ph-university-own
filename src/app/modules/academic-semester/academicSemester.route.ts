import express from 'express';
import { academicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middleWares/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation.zod';
import auth from '../../middleWares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-academic-semester',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(
    academicSemesterValidation.createAcademicSemesterValidationZod,
  ),
  academicSemesterControllers.createAcademicSemester,
);

router.get(
  '/',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.student,
    USER_ROLE.faculty,
  ),
  academicSemesterControllers.getAllAcademicSemester,
);

router.get(
  '/:semesterId',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.student,
    USER_ROLE.faculty,
  ),
  academicSemesterControllers.getSingleAcademicSemester,
);

router.patch(
  '/:semesterId',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(
    academicSemesterValidation.updateAcademicSemesterValidationZod,
  ),
  academicSemesterControllers.updateSingleAcademicSemester,
);

export const AcademicSemesterRoutes = router;
