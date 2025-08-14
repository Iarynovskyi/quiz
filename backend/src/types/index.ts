export interface QuestionCreateInput {
  text: string;
  correctAnswer: string;
  type: string;
}

export interface QuizCreateInput {
  title: string;
  questions: QuestionCreateInput[];
}
