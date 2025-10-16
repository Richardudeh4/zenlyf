import { getAuthToken } from "./Auth";
import { RequestHandler } from "./Request";

const request = new RequestHandler();
export async function getNationalLeaderboard(): Promise<any> {
  const token = await getAuthToken();
  return request.get("leaderboard/", token);
}

export async function InitializePayment(body: object):Promise<any>{
  const token = await getAuthToken();
  return request.post("payments/paystack/initialize/", body, token);
}
export async function VerifyPayment(body:object):Promise<any>{
  const token = await getAuthToken();
  return request.post("payments/paystack/verify/",body,token);
}

export async function InitializeHabariPayment(body:object):Promise<any>{
  const token = await getAuthToken();
  return request.post("payments/habari-pay/initialize/",body,token);
}
export async function VerifyHabariPayment(body:object):Promise<any>{
  const token = await getAuthToken();
  return request.post("payments/habari-pay/verify/",body,token);
}