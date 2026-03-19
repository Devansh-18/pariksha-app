export type OptionType = {
    id: string,
    text: string,
    isCorrect?: boolean,
    isSelectedByUser?: boolean,
}

export type AnswerType = {
    id: string,
    que: string,
    marks: number,
    type: 'MCQ'|'SUBJECTIVE',
    options?: OptionType[],
    isUserCorrect?:boolean,
    userAnswer?:string|null
}
    answers: ({
        id: string;
        que: string;
        marks: Decimal;
        type: "MCQ";
        options: {
            ...;
        }[];
        isUserCorrect: boolean;
        userAnswer?: undefined;
    } | {
        ...;
    })[];
} | null