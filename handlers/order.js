import { GetAction } from "@/actions/students/GetAction"
import { orderGetMe } from "@/constans"


export const GetMyOrders = async () => {
    const myOrders = await GetAction(orderGetMe);

    return myOrders;
}