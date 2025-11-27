import { GetAction } from "@/actions/students/GetAction";
import { jobPostCreateGetAll, jobPostGetOne } from "@/constans";


export const GetAllJobPost = async () => {
    const jobPost = await GetAction(jobPostCreateGetAll);

    return jobPost;
}

export const GetSingleJobPostById = async (jobId) => {
    const jobPost = await GetAction(jobPostGetOne + jobId);

    return jobPost;
}

