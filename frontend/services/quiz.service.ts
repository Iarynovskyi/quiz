const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface Question {
  id: number;
  text: string;
  correctAnswer: string;
  quizId: number;
}

export interface Quiz {
  id: number;
  title: string;
  createdAt: string;
  questions: Question[];
}

export const getAllQuizzes = async (): Promise<Quiz[]> => {
  const response = await fetch(`${API_BASE_URL}/quizzes`);
  if (!response.ok) {
    throw new Error('Failed to fetch quizzes');
  }
  return response.json();
};

export const getQuizById = async (id: string): Promise<Quiz> => {
  const response = await fetch(`${API_BASE_URL}/quizzes/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch quiz');
  }
  return response.json();
};

interface NewQuestion {
  text: string;
  correctAnswer: string;
}

interface NewQuiz {
  title: string;
  questions: NewQuestion[];
}

export const createQuiz = async (quizData: NewQuiz): Promise<Quiz> => {
  const response = await fetch(`${API_BASE_URL}/quizzes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quizData),
  });
  if (!response.ok) {
    throw new Error('Failed to create quiz');
  }
  return response.json();
};

export const deleteQuiz = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/quizzes/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete quiz');
  }
};
