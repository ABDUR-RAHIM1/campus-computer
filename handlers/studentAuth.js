import { GetAction } from "@/actions/students/GetAction";

//  get all student list for admin
export const getAllProfileInfo = async () => {
    const students = await GetAction("/auth/student/all");
    return students
}


// get login student profile information
export const getMyProfileInfo = async () => {
    const student = await GetAction("/auth/student/myAccount");
    return student
}