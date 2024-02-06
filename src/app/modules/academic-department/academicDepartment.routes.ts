import { Router } from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { academicDepartmentControllers } from './academicDepartment.controllers';
import { academicDepartmentValiationZod } from './academicDepartment.validation.zod';
import auth from '../../middleWares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = Router();

router.post(
  '/create-academic-department',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    academicDepartmentValiationZod.createAcademicDepartmentValidationZod,
  ),
  academicDepartmentControllers.createAcademicDepartment,
);

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  academicDepartmentControllers.getAllAcademicDepartments,
);

router.get(
  '/:departmentId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  academicDepartmentControllers.getSingleAcademicDepartment,
);

router.patch(
  '/:departmentId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    academicDepartmentValiationZod.updateAcademicDepartmentValidationZod,
  ),
  academicDepartmentControllers.updateSingleAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
