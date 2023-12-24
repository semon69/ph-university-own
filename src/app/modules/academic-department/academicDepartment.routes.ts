import { Router } from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { academicDepartmentControllers } from './academicDepartment.controllers';
import { academicDepartmentValiationZod } from './academicDepartment.validation.zod';
import auth from '../../middleWares/auth';
const router = Router();

router.post(
  '/create-academic-department',
  auth('admin'),
  validateRequest(
    academicDepartmentValiationZod.createAcademicDepartmentValidationZod,
  ),
  academicDepartmentControllers.createAcademicDepartment,
);

router.get(
  '/',
  auth('admin'),
  academicDepartmentControllers.getAllAcademicDepartments,
);

router.get(
  '/:departmentId',
  auth('admin'),
  academicDepartmentControllers.getSingleAcademicDepartment,
);

router.patch(
  '/:departmentId',
  auth('admin'),
  validateRequest(
    academicDepartmentValiationZod.updateAcademicDepartmentValidationZod,
  ),
  academicDepartmentControllers.updateSingleAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
