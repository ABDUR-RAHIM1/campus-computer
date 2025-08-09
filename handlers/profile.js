import { GetActionAdmin } from "@/actions/admins/GetAction";
import { GetAction } from "@/actions/students/GetAction";
import { studentProfileById, studentProfileGetAllByAdmin, studentProfileGetMe, studentProfileGetMeAll } from "@/constans";


export const getMyProfile = async () => {
    const profile = await GetAction(studentProfileGetMe);
    return profile
};

export const getMyAllProfile = async () => {
    const profiles = await GetAction(studentProfileGetMeAll);
    return profiles
}

//  student profile By Id
export const getStudentProfileById = async (profileId) => {
    const api = studentProfileById + profileId;
    const profile = await GetAction(api);
    return profile
}

//  get all profile by admin (protected)
export const getStudentProfileByAdmin = async () => {
    const profiles = await GetActionAdmin(studentProfileGetAllByAdmin);
    return profiles
}