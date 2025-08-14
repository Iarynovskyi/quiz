import {findAll, findById, create, deleteById} from "../repository/quize.repository";

export const quizService = () => {
    const getAllQuizzes = async () => {
        return findAll()
    }
    const getQuizById = async (id: number) => {
        const quiz = await findById(id);
        if (!quiz) {
            return null;
        }
        return quiz;
    }
    const createQuiz = async (title: string, questions: any) => {
        const quizData = {title, questions};
        return await create(quizData)
    }
    const deleteQuiz = async (quizId: number) => {
        return await deleteById(quizId);
    }
    return {
        getAllQuizzes,
        getQuizById,
        createQuiz,
        deleteQuiz
    }
}