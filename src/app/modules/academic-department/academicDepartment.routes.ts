import { Router } from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { academicDepartmentControllers } from './academicDepartment.controllers';
import { academicDepartmentValiationZod } from './academicDepartment.validation.zod';
const router = Router();

router.post(
  '/create-academic-department',
  // validateRequest(
  //   academicDepartmentValiationZod.createAcademicDepartmentValidationZod,
  // ),
  academicDepartmentControllers.createAcademicDepartment,
);

router.get('/', academicDepartmentControllers.getAllAcademicDepartments);
router.get(
  '/:departmentId',
  academicDepartmentControllers.getSingleAcademicDepartment,
);
router.patch(
  '/:departmentId',
  validateRequest(
    academicDepartmentValiationZod.updateAcademicDepartmentValidationZod,
  ),
  academicDepartmentControllers.updateSingleAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
