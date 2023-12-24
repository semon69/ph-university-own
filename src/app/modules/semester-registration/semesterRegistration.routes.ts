import { Router } from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { semesterRegistrationControllers } from './semesterRegistration.controllers';
import { semesterRegistrationValidation } from './semesterRegistration.validation';
import auth from '../../middleWares/auth';
const router = Router();

router.post(
  '/create-semester-regestration',
  auth('admin'),
  validateRequest(
    semesterRegistrationValidation.semesterRegistrationValidationZod,
  ),
  semesterRegistrationControllers.createSemesterRegistration,
);

router.get(
  '/',
  auth('admin', 'faculty', 'student'),
  semesterRegistrationControllers.getAllSemesterRegistration,
);

router.get(
  '/:id',
  auth('admin', 'faculty', 'student'),
  semesterRegistrationControllers.getSingleSemesterRegistration,
);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(
    semesterRegistrationValidation.updateSemesterRegistrationValidationZod,
  ),
  semesterRegistrationControllers.updateSemesterRegistration,
);

router.delete(
  '/:id',
  auth('admin'),
  semesterRegistrationControllers.deleteSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
