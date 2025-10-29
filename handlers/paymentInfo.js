import { GetActionAdmin } from "@/actions/admins/GetAction"
import { GetAction } from "@/actions/students/GetAction";
import { paymentInfoGetAll, paymentInfoGetMe } from "@/constans"

//  for admin 
export const getAllPaymentInfo = async () => {
    const payments = await GetActionAdmin(paymentInfoGetAll);
    return payments;
}

// for user / student
export const getMyPaymentInfo = async () => {
    const payments = await GetAction(paymentInfoGetMe);
    return payments;
}
