import { GetAction } from "@/actions/students/GetAction"
import { servicesGetMy, servicesPostGetAll } from "@/constans"

//  all services;
export const getAllServices = async () => {
    const result = await GetAction(servicesPostGetAll);

    return result;
}


 