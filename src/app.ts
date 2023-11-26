import express, {Request, Response } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middleWares/globalErrorHandler';
import router from './app/routes';
const app = express();

// Parser
app.use(express.json());
app.use(cors());

// Application route
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from World!');
});

app.use(globalErrorHandler)
export default app;
