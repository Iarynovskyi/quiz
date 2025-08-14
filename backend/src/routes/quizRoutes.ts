import express from 'express';
const router = express.Router();
import {
  createQuiz,
  getQuizById,
  deleteQuiz,
  getAllQuizzes,
} from '../controlers/quizController';

router.get('/', getAllQuizzes);
router.post('/', createQuiz);
router.get('/:id', getQuizById);
router.delete('/:id', deleteQuiz);

export default router;
