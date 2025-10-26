import { GetAction } from "@/actions/students/GetAction";
import { jobPostCreateGetAll } from "@/constans";


export const GetAllJobPost = async () => {
    const jobPost = await GetAction(jobPostCreateGetAll);

    return jobPost;
}
