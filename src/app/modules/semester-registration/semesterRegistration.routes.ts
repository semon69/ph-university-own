import { Router } from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { semesterRegistrationControllers } from './semesterRegistration.controllers';
import { semesterRegistrationValidation } from './semesterRegistration.validation';
const router = Router();

router.post(
  '/create-semester-regestration',
  validateRequest(
    semesterRegistrationValidation.semesterRegistrationValidationZod,
  ),
  semesterRegistrationControllers.createSemesterRegistration,
);

router.get('/', semesterRegistrationControllers.getAllSemesterRegistration)
router.get('/:id', semesterRegistrationControllers.getSingleSemesterRegistration)
router.patch('/:id', validateRequest(semesterRegistrationValidation.updateSemesterRegistrationValidationZod), semesterRegistrationControllers.updateSemesterRegistration)

export const SemesterRegistrationRoutes = router;
