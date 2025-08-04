import { GetActionAdmin } from "@/actions/admins/GetAction";
import { GetAction } from "@/actions/students/GetAction";
import { studentGetAll, studentGetMy } from "@/constans";

//  get all student list for admin
export const getAllProfileInfo = async () => {
    const students = await GetActionAdmin(studentGetAll);
    return students
}


// get login student profile information
export const getMyProfileInfo = async () => {
    const student = await GetAction(studentGetMy);
    return student
}