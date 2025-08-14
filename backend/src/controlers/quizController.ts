import {quizService} from "../services/quiz.service";
import { Request, Response } from 'express';

export const getAllQuizzes = async (req: Request, res: Response) => {
    try {
        const quizzes = await quizService().getAllQuizzes();
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ message: 'Помилка отримання квізів' });
    }
};

export const getQuizById = async (req: Request, res: Response) => {
    try {
        const quizId = parseInt(req.params.id, 10);
        const quiz = await quizService().getQuizById(quizId);
        if (quiz) {
            res.status(200).json(quiz);
        } else {
            res.status(404).json({ message: 'Квіз не знайдено' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Помилка отримання квіза' });
    }
};

export const createQuiz = async (req: Request, res: Response) => {
    try {
        const { title, questions } = req.body;
        if (!title || !Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({ message: "Потрібно вказати 'title' та масив 'questions'" });
        }
        const newQuiz = await quizService().createQuiz( title, questions );
        res.status(201).json(newQuiz);
    } catch (error) {
        res.status(500).json({ message: 'Помилка створення квіза' });
    }
};

export const deleteQuiz = async (req: Request, res: Response) => {
    try {
        const quizId = parseInt(req.params.id, 10);
        await quizService().deleteQuiz(quizId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Помилка видалення квіза' });
    }
};