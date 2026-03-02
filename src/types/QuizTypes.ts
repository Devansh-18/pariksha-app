export type QuizDataType = {
    id:string,
    title:string,
    totalTime:number,
    createdAt:Date,
};

export type QuizFormState = {
  topic: string;
  totalMarks: number;
  includeSubjective: boolean;
  pdfUrl: string;
};