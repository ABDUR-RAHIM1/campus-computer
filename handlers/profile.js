import { GetAction } from "@/actions/students/GetAction";
import { studentProfileById, studentProfileGetMe, studentProfileGetMeAll } from "@/constans";


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