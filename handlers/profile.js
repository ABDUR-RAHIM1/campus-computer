import { GetActionAdmin } from "@/actions/admins/GetAction";
import { GetAction } from "@/actions/students/GetAction";
import { jobProfileGetMe, jobProfileGetOne, jobProfilePostGet, studentProfileById, studentProfileGetAllByAdmin, studentProfileGetMe, studentProfileGetMeAll } from "@/constans";


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
};



//  job profiles
export const getAllJobProfileByAdmin = async () => {
    const jobProfiles = await GetActionAdmin(jobProfilePostGet);
    return jobProfiles
};

//  login user profile 
export const getMyJobProfile = async () => {
    const jobProfile = await GetAction(jobProfileGetMe);
    return jobProfile;
}

// get single profile info for student
export const getOneJobProfileByStudent = async (jpId) => {
    const endpoint = jobProfileGetOne + jpId
    const jobProfile = await GetAction(endpoint);
    return jobProfile;
}


// get single profile info for Admin Dashboard
export const getOneJobProfileByAdmin = async (jpId) => {
    const endpoint = jobProfileGetOne + jpId;
 
    const jobProfile = await GetActionAdmin(endpoint);
    return jobProfile;
}