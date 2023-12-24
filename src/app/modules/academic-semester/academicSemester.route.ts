import express from 'express';
import { academicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middleWares/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation.zod';
import auth from '../../middleWares/auth';

const router = express.Router();

router.post(
  '/create-academic-semester',
  auth('admin'),
  validateRequest(
    academicSemesterValidation.createAcademicSemesterValidationZod,
  ),
  academicSemesterControllers.createAcademicSemester,
);

router.get(
  '/',
  auth('admin'),
  academicSemesterControllers.getAllAcademicSemester,
);

router.get(
  '/:semesterId',
  auth('admin'),
  academicSemesterControllers.getSingleAcademicSemester,
);

router.patch(
  '/:semesterId',
  auth('admin'),
  validateRequest(
    academicSemesterValidation.updateAcademicSemesterValidationZod,
  ),
  academicSemesterControllers.updateSingleAcademicSemester,
);

export const AcademicSemesterRoutes = router;
