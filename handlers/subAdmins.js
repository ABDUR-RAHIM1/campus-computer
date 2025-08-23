import { GetActionAdmin } from "@/actions/admins/GetAction" 
import { subAdminRegGetAll } from "@/constans";

export const getAllSubAdmins = async()=>{
     const subAdmins = await GetActionAdmin(subAdminRegGetAll);
     return subAdmins;
}