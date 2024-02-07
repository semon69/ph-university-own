import { Router } from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { semesterRegistrationControllers } from './semesterRegistration.controllers';
import { semesterRegistrationValidation } from './semesterRegistration.validation';
import auth from '../../middleWares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = Router();

router.post(
  '/create-semester-regestration',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    semesterRegistrationValidation.semesterRegistrationValidationZod,
  ),
  semesterRegistrationControllers.createSemesterRegistration,
);

router.get(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  semesterRegistrationControllers.getAllSemesterRegistration,
);

router.get(
  '/:id',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  semesterRegistrationControllers.getSingleSemesterRegistration,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    semesterRegistrationValidation.updateSemesterRegistrationValidationZod,
  ),
  semesterRegistrationControllers.updateSemesterRegistration,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  semesterRegistrationControllers.deleteSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
