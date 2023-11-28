import express from 'express';
import { academicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middleWares/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation.zod';

const router = express.Router();

router.post('/create-academic-semester', validateRequest(academicSemesterValidation.createAcademicSemesterValidationZod), academicSemesterControllers.createAcademicSemester)

// router.get('/', StudentController.getStudents);
// router.get('/:id', StudentController.getSingleStudent);
// router.delete('/:id', StudentController.deleteSingleStudent);

export const AcademicSemesterRoutes = router;
