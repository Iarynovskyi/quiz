'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createQuiz } from '../services/quiz.service';
import styles from './QuizForm.module.css';

type QuestionType = 'boolean' | 'input' | 'checkbox';
interface FormQuestion {
  text: string;
  type: QuestionType;
  correctAnswer: string;
  options?: string[];
}

export default function QuizForm() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<FormQuestion[]>([]);
  const router = useRouter();

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: '', type: 'input', correctAnswer: '' },
    ]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (
    index: number,
    field: keyof FormQuestion,
    value: FormQuestion[keyof FormQuestion]
  ) => {
    const newQuestions = [...questions];

    newQuestions[index] = {
      ...newQuestions[index],
      [field]: value,
    };

    setQuestions(newQuestions);
  };

  const handleCheckboxChange = (
    qIndex: number,
    option: string,
    isChecked: boolean
  ) => {
    const newQuestions = [...questions];
    const currentAnswers = newQuestions[qIndex].correctAnswer
      ? newQuestions[qIndex].correctAnswer.split(',')
      : [];
    let newAnswers;
    if (isChecked) {
      newAnswers = [...currentAnswers, option];
    } else {
      newAnswers = currentAnswers.filter((ans) => ans !== option);
    }
    newQuestions[qIndex].correctAnswer = newAnswers.join(',');
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createQuiz({ title, questions });
      alert('Quiz created successfully!');
      router.push('/quizzes');
    } catch {
      alert('Failed to create quiz.');
    }
  };

  const renderQuestionInputs = (q: FormQuestion, index: number) => {
    switch (q.type) {
      case 'boolean':
        return (
          <div>
            <label>
              <input
                type="radio"
                name={`q-${index}`}
                value="True"
                onChange={(e) =>
                  handleQuestionChange(index, 'correctAnswer', e.target.value)
                }
              />{' '}
              True
            </label>
            <label>
              <input
                type="radio"
                name={`q-${index}`}
                value="False"
                onChange={(e) =>
                  handleQuestionChange(index, 'correctAnswer', e.target.value)
                }
              />{' '}
              False
            </label>
          </div>
        );
      case 'checkbox':
        const options = ['Option A', 'Option B', 'Option C', 'Option D']; // Можна зробити динамічними
        return (
          <div>
            {options.map((opt) => (
              <label key={opt}>
                <input
                  type="checkbox"
                  value={opt}
                  onChange={(e) =>
                    handleCheckboxChange(index, opt, e.target.checked)
                  }
                />{' '}
                {opt}
              </label>
            ))}
          </div>
        );
      case 'input':
      default:
        return (
          <input
            type="text"
            placeholder="Correct Answer"
            value={q.correctAnswer}
            onChange={(e) =>
              handleQuestionChange(index, 'correctAnswer', e.target.value)
            }
            required
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Quiz Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <h3>Questions</h3>
      {questions.map((q, index) => (
        <div key={index} className={styles.questionBlock}>
          <div className={styles.questionHeader}>
            <h4>Question {index + 1}</h4>
            <button
              type="button"
              onClick={() => removeQuestion(index)}
              className={styles.removeButton}
            >
              &times;
            </button>
          </div>
          <textarea
            placeholder="Question text"
            value={q.text}
            onChange={(e) =>
              handleQuestionChange(index, 'text', e.target.value)
            }
            required
          />

          <select
            value={q.type}
            onChange={(e) =>
              handleQuestionChange(index, 'type', e.target.value)
            }
          >
            <option value="input">Text Input</option>
            <option value="boolean">True/False</option>
            <option value="checkbox">Multiple Choice</option>
          </select>

          {renderQuestionInputs(q, index)}
        </div>
      ))}

      <button type="button" onClick={addQuestion} className={styles.addButton}>
        + Add Question
      </button>
      <button type="submit" className={styles.submitButton}>
        Create Quiz
      </button>
    </form>
  );
}
