import { connectDb } from "@/database/connectDb";
import { Order } from "@/database/models/Order";
import ServiceModel from "@/database/models/Services";
import StudentAuthModel from "@/database/models/StudentAuth";
import { NextResponse } from "next/server";


export const GET = async (req, { params }) => {

    const { orderId } = await params;


    try {
        await connectDb();

        const orders = await Order.findOne({ _id: orderId })
            .populate("reference", "-password")
            .populate("serviceId", "-departmentFees") // এই লাইন
            .populate("profileId")
            .lean();

        return NextResponse.json(
            orders,
            { status: 200 });

    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}