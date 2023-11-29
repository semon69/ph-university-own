import { Router } from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { academicFacultyValiationZod } from './academicFaculty.validation.zod';
import { academicFacultyControllers } from './academicFaculty.controllers';

const router = Router();

router.post(
  '/create-academic-faculty',
  validateRequest(
    academicFacultyValiationZod.createAcademicFacultyValidationZod,
  ),
  academicFacultyControllers.createAcademicFaculty,
);

router.get('/', academicFacultyControllers.getAllAcadmicFaculties)
router.get('/:facultyId', academicFacultyControllers.getSingleAcadmicFaculty)
router.patch('/:facultyId', validateRequest(academicFacultyValiationZod.updateAcademicFacultyValidationZod), academicFacultyControllers.updateSingleAcadmicFaculty)

export const AcademicFacultyRoutes = router