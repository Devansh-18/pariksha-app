import z from "zod";

export const quizAiResponseSchema = z.object({
    title: z.string().describe("Title of Quiz"),
    questions: z.array(
        z.object({
            que: z.string().describe("Question statement"),
            options: z.array(
                z.object({
                    text: z.string().describe("Option text"),
                    isCorrect: z.boolean().default(false).describe("Whether this options is correct or not"),
                })
            ).describe("If MCQ type question, this is 4 options array else left empty"),
            type: z.enum(["MCQ","SUBJECTIVE"]),
            marks: z.number().describe("Marks for this question"),
        })
    )  
});