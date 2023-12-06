import express from 'express';
import { facultyController } from './faculty.controller';
const router = express.Router();

router.get('/', facultyController.getFaculties);
router.get('/:id', facultyController.getSingleFaculty);
router.patch(
  '/:id',
  facultyController.updateSingleFaculty,
);
router.delete('/:id', facultyController.deleteSingleFaculty);

export const FacultyRoutes = router;
