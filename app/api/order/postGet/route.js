import { connectDb } from "@/database/connectDb";
import { Order } from "@/database/models/Order";
import { studentAuthGuard } from "@/middlewere/studentAuthGuard";
import { NextResponse } from "next/server";

import ServiceModel from "@/database/models/Services";
import StudentAuthModel from "@/database/models/StudentAuth";

//  Create Order by Student
// api => /api/order/postGet  (create , getAll)
export async function POST(req) {
    try {
        await connectDb();
        const body = await req.json();

        const auth = await studentAuthGuard(req);
        if (auth.error) return auth.response;

        const { id } = auth.student;

        const { serviceId, department, fee } = body;

        if (!id || !serviceId) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        };

        //  check same services is Available or not
        const isExistOrder = await Order.findOne({ studentId: id, serviceId });

        if (isExistOrder) {
            return NextResponse.json({
                message: "আপনি অর্ডারটি আগেই কনফার্ম করেছেন। "
            }, {
                status: 401
            })
        }

        const newOrder = await Order.create({
            studentId: id,
            serviceId,
            department,
            amount: fee,
            status: "active",
            paymentStatus: "paid",
        });

        return NextResponse.json({ message: "Order created" }, { status: 201 });
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
};


//  get all orders by Admin
export async function GET(req) {
    try {
        await connectDb();

        const orders = await Order.find()
            .populate("studentId", '-password')
            .populate("serviceId");

        return NextResponse.json(
            orders,
            { status: 200 });

    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}

