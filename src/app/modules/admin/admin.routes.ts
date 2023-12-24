import express from 'express';
import { AdminControllers } from './admin.controller';
import validateRequest from '../../middleWares/validateRequest';
import { adminValidationZod } from './admin.validation.zod';
import auth from '../../middleWares/auth';

const router = express.Router();

router.get('/', auth('admin'), AdminControllers.getAllAdmins);

router.get('/:id', auth('admin'), AdminControllers.getSingleAdmin);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(adminValidationZod.updateAdminSchemaZod),
  AdminControllers.updateAdmin,
);

router.delete('/:id', auth('admin'), AdminControllers.deleteAdmin);

export const AdminRoutes = router;
