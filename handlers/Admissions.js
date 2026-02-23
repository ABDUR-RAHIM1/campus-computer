import { GetAction } from "@/actions/students/GetAction"
import { admissionServiceAction, createGetAdmissionService } from "@/constans";

export const fetchAllAdmissionServices = async () => {
    const admission = await GetAction(createGetAdmissionService);
    return admission;
};


export const fetchSingelAdmissionServices = async (admissionId) => {
    const admission = await GetAction(admissionServiceAction + admissionId);
    return admission;
}