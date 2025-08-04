import { connectDb } from "@/database/connectDb";
import { Order } from "@/database/models/Order";
import { studentAuthGuard } from "@/middlewere/studentAuthGuard";
import { NextResponse } from "next/server";

import ServiceModel from "@/database/models/Services";
import StudentAuthModel from "@/database/models/StudentAuth";
import StudentProfileModel from "@/database/models/Profile";

//  Create Order by Student
// api => /api/order/postGet  (create , getAll)
export async function POST(req) {
    try {
        await connectDb();
        const body = await req.json();

        const auth = await studentAuthGuard(req);
        if (auth.error) return auth.response;

        const { id } = auth.student;

        const { isOthersStudent, profileId, serviceId, department, collegeFee, chargeFee } = body;

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
            isOthersStudent,
            profileId,
            reference: id,
            serviceId,
            department,
            collegeFee,
            chargeFee,
            status: "active",
            paymentStatus: "paid",
        });

        return NextResponse.json({ message: "Order created", newOrder }, { status: 201 });
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
            .populate("reference", "username")
            .populate("serviceId", "title")
            .populate("profileId", "studentName")
            .lean();

        return NextResponse.json(
            orders,
            { status: 200 });

    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}

