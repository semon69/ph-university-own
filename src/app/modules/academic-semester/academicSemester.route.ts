import express from 'express';
import { academicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middleWares/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation.zod';

const router = express.Router();

router.post('/create-academic-semester', validateRequest(academicSemesterValidation.createAcademicSemesterValidationZod), academicSemesterControllers.createAcademicSemester)

router.get('/', academicSemesterControllers.getAllAcademicSemester);
router.get('/:semesterId', academicSemesterControllers.getSingleAcademicSemester);
router.patch('/:semesterId',validateRequest(academicSemesterValidation.updateAcademicSemesterValidationZod),  academicSemesterControllers.updateSingleAcademicSemester);

export const AcademicSemesterRoutes = router;
