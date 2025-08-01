import { GetActionAdmin } from "@/actions/admins/GetAction";
import { GetAction } from "@/actions/students/GetAction"
import { orderDetails, orderGetMe, orderPostGetall } from "@/constans"


export const GetAllOrders = async () => {
    const orders = await GetAction(orderPostGetall);

    return orders;
}

export const GetMyOrders = async () => {
    const myOrders = await GetAction(orderGetMe);

    return myOrders;
}


// order details in admin dashboard (protected)
export const GetOrderDetailsByStudent = async (orderId) => {
    const details = await GetAction(orderDetails + orderId);


    return details;
}


// order details in admin dashboard (protected)
export const GetOrderDetails = async (orderId) => {
    const details = await GetActionAdmin(orderDetails + orderId);


    return details;
}