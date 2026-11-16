import { headers } from "next/headers"
import { auth } from "../auth"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || `http://localhost:5000`

export const  GetUserPremiumById =async(userId:string)=>{
        const response = await fetch(`${BASE_URL}/users/${userId}/premium`)
        return response.json()
}
export  const  GetUsers =async()=>{

        const users = await auth.api.listUsers({
    query: {
       
        sortBy: "name", // The field to sort by.
        sortDirection: "desc", // The direction to sort by.
        // Admin page shows every account — better-auth pages listUsers by default.
        limit: 100,
    },
    // This endpoint requires session cookies.
    headers: await headers(),
});
return users;
}