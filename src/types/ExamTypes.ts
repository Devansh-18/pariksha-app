import { Question_Type } from "@/generated/prisma";

export type ExamQuizDataType = {
    id:string,
    quiz:QuizTestType,
}

export type QuizTestType = {
    id: string,
    title: string,
    totalTime: number,
    totalMarks: number,
    questions: QuestionType[],
}

export type QuestionType = {
    id: string,
    type: Question_Type,
    que: string,
    marks: number,
    options: {
        id: string,
        text: string,
    }[];
}