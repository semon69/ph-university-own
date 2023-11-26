import express from 'express';
import { userControllers } from './user.controller';
const router = express.Router();

router.post('/create-student', userControllers.createStudent);

export const UserRoutes = router;
