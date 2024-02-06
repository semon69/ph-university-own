import { Router } from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { academicFacultyValiationZod } from './academicFaculty.validation.zod';
import { academicFacultyControllers } from './academicFaculty.controllers';
import auth from '../../middleWares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/create-academic-faculty',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    academicFacultyValiationZod.createAcademicFacultyValidationZod,
  ),
  academicFacultyControllers.createAcademicFaculty,
);

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  academicFacultyControllers.getAllAcadmicFaculties,
);

router.get(
  '/:facultyId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  academicFacultyControllers.getSingleAcadmicFaculty,
);

router.patch(
  '/:facultyId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    academicFacultyValiationZod.updateAcademicFacultyValidationZod,
  ),
  academicFacultyControllers.updateSingleAcadmicFaculty,
);

export const AcademicFacultyRoutes = router;
