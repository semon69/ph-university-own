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
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(studentValidationZod.createStudentSchemaZod),
  userControllers.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(facultyValidationZod.createFacultySchemaZod),
  userControllers.createFaculty,
);

router.post(
  '/create-admin',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(adminValidationZod.createAdminSchemaZod),
  userControllers.createAdmin,
);

router.get(
  '/me',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.student,
    USER_ROLE.faculty,
  ),
  userControllers.getMe,
);

router.post(
  '/change-status/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(userValidationZod.changeStatusSchema),
  userControllers.changeStatus,
);

export const UserRoutes = router;
