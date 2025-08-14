import { PrismaClient } from '@prisma/client';
import { QuizCreateInput } from '../types';

const prisma = new PrismaClient();

export const findAll = async () => {
  return prisma.quiz.findMany({
    include: {
      questions: true,
    },
  });
};

export const findById = async (id: number) => {
  return prisma.quiz.findUnique({
    where: { id: id },
    include: {
      questions: true,
    },
  });
};

export const create = async (quizData: QuizCreateInput) => {
  const { title, questions } = quizData;
  return prisma.quiz.create({
    data: {
      title,
      questions: {
        create: questions,
      },
    },
    include: {
      questions: true,
    },
  });
};

export const deleteById = async (id: number) => {
  return prisma.quiz.delete({
    where: { id: id },
  });
};
