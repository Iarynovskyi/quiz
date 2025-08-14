import { getQuizById } from '../../../services/quiz.service';
import styles from './QuizDetail.module.css';
import Link from 'next/link';

interface PageProps {
  params: { id: string };
}

export default async function QuizDetailPage({ params }: PageProps) {
  const quiz = await getQuizById(params.id);

  return (
    <>
      <div className={styles.container}>
        <h1>{quiz.title}</h1>
        <div className={styles.questionList}>
          {quiz.questions.map((question, index) => (
            <div key={question.id} className={styles.question}>
              <h3>
                Question {index + 1}: {question.text}
              </h3>
              <p>
                <strong>Correct Answer:</strong> {question.correctAnswer}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Link href={`/quizzes`}> Повернутись</Link>
    </>
  );
}
