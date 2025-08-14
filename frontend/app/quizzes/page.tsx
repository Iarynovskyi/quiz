import Link from 'next/link';
import { getAllQuizzes } from '../../services/quiz.service';
import DeleteQuizButton from '../../components/DeleteQuizButton';
import styles from './quizzes.module.css';

export default async function QuizzesPage() {
  const quizzes = await getAllQuizzes();

  return (
    <div className={styles.container}>
      <h1>Available Quizzes</h1>
      <Link href="/create" className={styles.createLink}>
        Create New Quiz
      </Link>
      <ul className={styles.quizList}>
        {quizzes.map((quiz) => (
          <li key={quiz.id} className={styles.quizItem}>
            <Link href={`/quizzes/${quiz.id}`} className={styles.quizLink}>
              <h2>{quiz.title}</h2>
              <p>{quiz.questions.length} questions</p>
            </Link>
            <DeleteQuizButton quizId={quiz.id} />
          </li>
        ))}
        {quizzes.length === 0 && <p>No quizzes found. Why not create one?</p>}
      </ul>
    </div>
  );
}
