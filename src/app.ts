import express, {Request, Response } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middleWares/globalErrorHandler';
import router from './app/routes';
import { notFound } from './app/middleWares/notFoundError';
import cookieParser from 'cookie-parser';
const app = express();

// Parser
app.use(express.json());
app.use(cookieParser())
app.use(cors({origin: ['http://localhost:5173']}));

// Application route
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from World!');
});

app.use(globalErrorHandler)
app.use(notFound)

export default app;
