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