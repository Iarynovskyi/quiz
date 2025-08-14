'use client';

import { useRouter } from 'next/navigation';
import { deleteQuiz } from '../services/quiz.service';
import styles from './DeleteQuizButton.module.css';

export default function DeleteQuizButton({ quizId }: { quizId: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this quiz?')) {
      try {
        await deleteQuiz(quizId);
        router.refresh();
      } catch (error) {
        console.error('Failed to delete the quiz', error);
        alert('Could not delete the quiz.');
      }
    }
  };

  return (
    <button onClick={handleDelete} className={styles.deleteButton}>
      X
    </button>
  );
}
