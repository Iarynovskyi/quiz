import express from 'express';
import quizRoutes from './routes/quizRoutes';

const app = express();
const port = 4444;

app.use(express.json());

app.use('/api/quizzes', quizRoutes);

app.listen(port, () => {
    console.log(`Express server listening at http://localhost:${port}`);
});