import express from 'express';
import { AdminControllers } from './admin.controller';
import validateRequest from '../../middleWares/validateRequest';
import { adminValidationZod } from './admin.validation.zod';
import auth from '../../middleWares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/', auth(USER_ROLE.superAdmin), AdminControllers.getAllAdmins);

router.get('/:id', auth(USER_ROLE.superAdmin), AdminControllers.getSingleAdmin);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin),
  validateRequest(adminValidationZod.updateAdminSchemaZod),
  AdminControllers.updateAdmin,
);

router.delete('/:id', auth(USER_ROLE.superAdmin), AdminControllers.deleteAdmin);

export const AdminRoutes = router;
