import express from 'express';
import cors from 'cors';
import quizRoutes from './routes/quizRoutes';

const app = express();
const port = 4444;

app.use(cors());
app.use(express.json());

app.use('/api/quizzes', quizRoutes);

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
