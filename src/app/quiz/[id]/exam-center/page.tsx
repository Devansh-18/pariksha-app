import ExamView from "@/components/quiz/exam-center/ExamView";

export default async function examCenter(params : Promise<{id:string}>){

    const {id} = await params;

    const res = await fetch(`/api/quiz/${id}/attempt`,{
        method:"POST",
    });

    const data = await res.json();
    // error handling 
    if(!res || !data || data.success == false){
        console.log(data.error);
        return; // handle error later
    }
        
    const quizData = data.data;

    return (
        <div>
            <h1> Exam Page</h1>
            <ExamView quizData={quizData}/>
        </div>
    )
}