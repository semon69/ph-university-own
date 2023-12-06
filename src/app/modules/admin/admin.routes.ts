import express from 'express';
import { AdminControllers } from './admin.controller';
import validateRequest from '../../middleWares/validateRequest';
import { adminValidationZod } from './admin.validation.zod';

const router = express.Router();

router.get('/', AdminControllers.getAllAdmins);

router.get('/:id', AdminControllers.getSingleAdmin);

router.patch(
  '/:id',
  validateRequest(adminValidationZod.updateAdminSchemaZod),
  AdminControllers.updateAdmin,
);

router.delete('/:id', AdminControllers.deleteAdmin);

export const AdminRoutes = router;