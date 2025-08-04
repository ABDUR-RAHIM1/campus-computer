import { GetActionAdmin } from "@/actions/admins/GetAction"
import { quickLinkCreateGet } from "@/constans"

//  by admin
export const getAllQuickLink = async () => {
    const links = await GetActionAdmin(quickLinkCreateGet);
    return links
}