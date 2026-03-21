import { Question_Type } from "@/generated/prisma"

export type OptionType = {
    id: string,
    text: string,
    isCorrect: boolean,
    isSelectedByUser: boolean,
}

export type AnswerType = {
    id: string,
    que: string,
    marks: number,
    type: Question_Type,
    options?: OptionType[]|null,
    isUserCorrect?:boolean|null,
    userAnswer?:string|null
}