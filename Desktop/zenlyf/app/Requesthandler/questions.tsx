import { getAuthToken } from "./Auth";
import { RequestHandler } from "./Request";
const request = new RequestHandler();

export async function PostPastQuestions(body: object): Promise<any>{
    const token = await getAuthToken();
    const response = await request.post("quiz/practice-sessions/",body,token);
    console.log("response",response);
    return response;
}
export async function CreateGroupQuiz(body: object): Promise<any>{
    const token = await getAuthToken();
    return request.post("quiz/group-quizzes/",body,token)
}
export async function Aichat(body: object):Promise<any>{
    const token = await getAuthToken();
    return request.post("ai/chat/",body, token);
}
export async function CreateAiquiz(body: object):Promise<any>{
    const token = await getAuthToken();
    return request.post("ai/quiz/", body, token);
}
export async function Submitquiz(body:object):Promise<any>{
    const token = await getAuthToken();
    return request.post("ai/submit-quiz/", body, token)
}
interface SubmitPastQuestionsBody {
    answers: Array<{
        question_id: string;
        choice_id: string;
    }>;
}

export async function SubmitPastQuestions(session_id: string, body: SubmitPastQuestionsBody):Promise<any>{
    const token = await getAuthToken();
    const response = await request.post(`quiz/practice-sessions/${session_id}/submit/`, body, token);
    return response;
}
export async function JoinGroupQuiz(body: object):Promise<any>{
    const token = await getAuthToken();
    return request.post(`quiz/group-quizzes/join_private/`, body, token);
}

export async function GetSessionHistory():Promise<any>{
    const token = await getAuthToken();
    const response = await request.get("quiz/practice-sessions/", token);
    return response;
}


export async function Getreports(user_id:string):Promise<any>{
    const token = await getAuthToken();
    const response = await request.get(`api/v1/lab-report/reports/all/<user_id>?user_id=${user_id}`, token);
    return response;
}

//This is for doctors
export async function DeleteLabReport(id:number):Promise<any>{
    const token = await getAuthToken();
    try{
        const response = await request.delete(`api/v1/lab-report/${id}/delete`,{},token);
        return response;
    }
    catch(error:any){
        console.log("Error deleteing Lab Report", error);
        throw error;
    }
}

//This is for both doctors and users
export async function getParticularReport(id:number):Promise<any>{
    const token = await getAuthToken();
    try{
        const response = await request.get(`api/v1/lab-report/${id}/view`, token);
        return response;
    }
    catch(error:any){
        console.log("failed to get particular report ", error)
        throw error;
    }
}

//FUNCTION FOR DOCTORS TO SEND ANALYSICS
export async function uploadMedicalReportAnalysis(body:object):Promise<any>{
    const token = await getAuthToken();
    try{
    const response = await request.post(`api/v1/medical/report-analysis`,body, token)
    return response;      
    }
    catch(error:any){
        console.log("Error uploading medical report", error);
        throw error;
    }
}
//FUNCTION FOR DOCTORS TO UPLOAD YOUR PRESCRIPTION
export async function uploadPaitentPrescription(body:object):Promise<any>{
    const token = await getAuthToken();
    try{
        const response = await request.post(`api/v1/medical/prescription-management`,body,token);
        return response;
    }
    catch(error:any){
        console.log("error uploading patient prescriptions", error);
        throw error;
    }
}
