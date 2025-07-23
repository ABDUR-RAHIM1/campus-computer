import { GetAction } from "@/actions/students/GetAction"
import { servicesGetMy, servicesPostGetAll } from "@/constans"

//  all services;
export const getAllServices = async () => {
    const result = await GetAction(servicesPostGetAll);

    return result;
}



//  only my services whice is matching with my profile information
export const getMyServices = async () => {
    const myServices = await GetAction(servicesGetMy);

    return myServices;
}

