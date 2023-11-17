import express, { Request, Response } from 'express';
import cors from 'cors';
const app = express();

// Parser
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from World!');
});

export default app;
