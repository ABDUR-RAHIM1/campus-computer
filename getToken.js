"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const StudentToken = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("student_token")?.value;

    return token;
};


// logout student
export const logoutStudent = async () => {
    const cookieStore = await cookies();

    cookieStore.delete("student_token");
    redirect("/student-login");

 };

export const AdminToken = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("campus_computer_access")?.value;

    return token
}