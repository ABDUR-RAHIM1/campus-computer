"use server"

import { cookies } from "next/headers";

export const StudentToken = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("student_token")?.value;
    
    return token;
};
