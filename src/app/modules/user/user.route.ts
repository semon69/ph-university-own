import express, { NextFunction, Request, Response } from 'express';
import { userControllers } from './user.controller';
import { studentValidationZod } from '../student/student.validation.zod';
import validateRequest from '../../middleWares/validateRequest';
import { facultyValidationZod } from '../faculty/faculty.validation.zod';
import { adminValidationZod } from '../admin/admin.validation.zod';
import auth from '../../middleWares/auth';
import { USER_ROLE } from './user.constant';
import { userValidationZod } from './user.validation.zod';
import { upload } from '../../utils/sendImageToCloudinary';
const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  validateRequest(studentValidationZod.createStudentSchemaZod),
  userControllers.createStudent,
);

router.post(
  '/create-faculty',
  auth("admin"),
  validateRequest(facultyValidationZod.createFacultySchemaZod),
  userControllers.createFaculty,
);

router.post(
  '/create-admin',
  auth("admin"),
  validateRequest(adminValidationZod.createAdminSchemaZod),
  userControllers.createAdmin,
);

router.get(
  '/me',
  auth("admin", 'student', 'faculty'),
  userControllers.getMe,
);

router.post(
  '/change-status/:id',
  auth("admin",),
  validateRequest(userValidationZod.changeStatusSchema),
  userControllers.changeStatus,
);

export const UserRoutes = router;
