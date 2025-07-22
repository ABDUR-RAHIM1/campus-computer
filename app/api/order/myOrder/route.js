
import { connectDb } from "@/database/connectDb";
import { Order } from "@/database/models/Order";
import ServiceModel from "@/database/models/Services";
import { studentAuthGuard } from "@/middlewere/studentAuthGuard";
import { NextResponse } from "next/server";



//  Create Order by Student
// api => /api/order/myOrder  (get by token id)
export async function GET(req) {
    try {

        await connectDb();

        const auth = await studentAuthGuard(req);
        if (auth.error) return auth.response;

        const { id } = auth.student;

        //  check same services is Available or not
        const myOrder = await Order.find({ studentId: id, })
            .populate("serviceId");

        if (!myOrder) {
            return NextResponse.json({
                message: " আপনার কোন অর্ডার নেই! "
            }, {
                status: 401
            })
        }

        return NextResponse.json(myOrder, { status: 200 });

    } catch (error) {
        console.error("Error fetching order:", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
};