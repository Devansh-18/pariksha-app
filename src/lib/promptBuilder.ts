export function buildQuizCreationPrompt(params:{
    topic:string;
    includeSubjective:boolean;
    totalMarks: number;
    pdfText?: string;
}){
    const {topic,includeSubjective,totalMarks,pdfText} = params;

    let mcqCount = 0;
    let subCount = 0;
    let distributionDetail = "";

    if(totalMarks===30){
        mcqCount = includeSubjective?20:30;
        subCount = includeSubjective?2:0;
        distributionDetail = includeSubjective
        ? "- 20 MCQs (1 mark each)\n - 2 short Subjective Questions (5 marks each)\n"
        : "- 30 MCQs (1 mark each)\n";
    }
    else if(totalMarks===60){
        mcqCount = includeSubjective?40:60;
        subCount = includeSubjective?4:0;
        distributionDetail = includeSubjective
        ? "- 40 MCQs (1 mark each)\n - 4 short Subjective Questions (5 marks each)\n"
        : "- 60 MCQs (1 mark each)\n";
    }
    else if(totalMarks===100){
        mcqCount = includeSubjective?50:100;
        subCount = includeSubjective?5:0;
        distributionDetail = includeSubjective
        ? "- 60 MCQs (1 mark each)\n - 2 short Subjective Questions (5 marks each)\n - 3 long Subjective Questions (10 marks each)\n"
        : "- 100 MCQs (1 mark each)\n";
    }

    const context = pdfText
    ? `You are given the following PDF text for the Topic- ${topic}. Create the quiz ONLY from this content, not from external knowledge.
    PDF Text:
    """${pdfText.slice(0, 4000)}"""`
    :`Topic: ${topic}
    Use only this topic in generating questions.`;

    return `${context}
    
    Generate a quiz strictly in JSON format as per the structure below.

    Quiz format rules:
    ${distributionDetail}
    - Make sure that the total marks for quiz should be equal to ${totalMarks}.
    - Title: Short concise title for quiz.
    - MCQs: Exactly 4 options per question.
    - Each MCQ must have only one correct option (isCorrect: true).
    - SUBJECTIVE questions should NOT include answers or options, only the question text and marks.
    - Keep all text concise (max 25 words for questions, 10 words for options).
    - Do not include explanations or any extra fields.
    - Do NOT include markdown, commentary, or backticks — output pure JSON.

    Now generate the complete quiz with:
    - ${mcqCount} MCQs
    ${includeSubjective ? `- ${subCount} subjective-type questions (short and/or long as defined above)` : ""}
    Return only JSON.`;
};