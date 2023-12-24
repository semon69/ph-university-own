import express from 'express';
import { facultyController } from './faculty.controller';
import validateRequest from '../../middleWares/validateRequest';
import { facultyValidationZod } from './faculty.validation.zod';
import auth from '../../middleWares/auth';
const router = express.Router();

router.get('/',auth(), facultyController.getFaculties);
router.get('/:id', facultyController.getSingleFaculty);
router.patch(
  '/:id',
  validateRequest(facultyValidationZod.updateFacultySchemaZod),
  facultyController.updateSingleFaculty,
);
router.delete('/:id', facultyController.deleteSingleFaculty);

export const FacultyRoutes = router;
