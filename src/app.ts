import express, {Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import { globalErrorHandler } from './app/middleWares/globalErrorHandler';
const app = express();

// Parser
app.use(express.json());
app.use(cors());

// Application route
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from World!');
});

app.use(globalErrorHandler)
export default app;
