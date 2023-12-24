import { Router } from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { academicFacultyValiationZod } from './academicFaculty.validation.zod';
import { academicFacultyControllers } from './academicFaculty.controllers';
import auth from '../../middleWares/auth';

const router = Router();

router.post(
  '/create-academic-faculty',
  auth('admin'),
  validateRequest(
    academicFacultyValiationZod.createAcademicFacultyValidationZod,
  ),
  academicFacultyControllers.createAcademicFaculty,
);

router.get(
  '/',
  auth('admin'),
  academicFacultyControllers.getAllAcadmicFaculties,
);

router.get(
  '/:facultyId',
  auth('admin'),
  academicFacultyControllers.getSingleAcadmicFaculty,
);

router.patch(
  '/:facultyId',
  auth('admin'),
  validateRequest(
    academicFacultyValiationZod.updateAcademicFacultyValidationZod,
  ),
  academicFacultyControllers.updateSingleAcadmicFaculty,
);

export const AcademicFacultyRoutes = router;
