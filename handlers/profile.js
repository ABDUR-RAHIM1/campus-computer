import { GetAction } from "@/actions/students/GetAction";
import { studentProfileGetMe, studentProfileGetMeAll } from "@/constans";


export const getMyProfile = async () => {
    const profile = await GetAction(studentProfileGetMe);
    return profile
};

export const getMyAllProfile = async () => {
    const profiles = await GetAction(studentProfileGetMeAll);
    return profiles
}