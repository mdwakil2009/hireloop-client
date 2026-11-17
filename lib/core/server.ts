"use server"
import { redirect } from 'next/navigation';
import { auth } from '../auth';
import { headers } from 'next/headers';

const GetSession = async() => {
          "use server";
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return session
};

export default GetSession;

 export const requireRole = async (role: string) => {
    const session = await GetSession();
    if (!session || session.user.role !== role) {
        redirect('/unauthorized');
    }
    return session;
 };


 export const getToken = async () => {
    const session = await GetSession();
    if(!session || !session.session?.token) {
        redirect('/unauthorized');
    }
    return session.session.token;
};

export const  authFetch =async(api:string)=>{
    const token = await getToken();
    const res = await fetch(api,{
        headers: {
            authorization: `Bearer ${token}`,  

        }
    })
    return res;
}


export const protectedMutation = async (
  api: string,
  method: string,
  data?: unknown
) => {
  const token = await getToken()

  if (!token) {
    throw new Error("Authentication token not found. Please sign in again.")
  }

  const response = await fetch(api, {
    method,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: data !== undefined ? JSON.stringify(data) : undefined,
  })

  return response
}