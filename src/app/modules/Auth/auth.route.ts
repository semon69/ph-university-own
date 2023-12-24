import express from 'express';
import { AuthControllers } from './auth.controllers';
import validateRequest from '../../middleWares/validateRequest';
import { AuthValidation } from './auth.validation';
import auth from '../../middleWares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);
router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.faculty),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

export const AuthRoutes = router;
