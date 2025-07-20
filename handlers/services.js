import { GetAction } from "@/actions/students/GetAction"
import { servicesPostGetAll } from "@/constans"

export const getAllServices = async () => {
    const result = await GetAction(servicesPostGetAll);

    return result;
}