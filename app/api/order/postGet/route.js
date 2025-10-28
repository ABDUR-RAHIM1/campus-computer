import { connectDb } from "@/database/connectDb";
import { Order } from "@/database/models/Order";
import { studentAuthGuard } from "@/middlewere/studentAuthGuard";
import { NextResponse } from "next/server";

import ServiceModel from "@/database/models/Services";
import StudentAuthModel from "@/database/models/StudentAuth";
import StudentProfileModel from "@/database/models/Profile";
import PaymentInfoModel from "@/database/models/PaymentInfo";

//  Create Order by Student
// api => /api/order/postGet  (create , getAll)

export async function POST(req) {
    try {
        await connectDb();
        const body = await req.json();

        const auth = await studentAuthGuard(req);
        if (auth.error) return auth.response;

        const { id } = auth.student;
        const {
            profileId,
            serviceId,
            department,
            collegeFee,
            subjectFee,
            chargeFee,
            totalFee,
            payment, // 🧾 payment data আসবে body.payment এর মাধ্যমে
        } = body;

        if (!id || !serviceId || !payment) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // 🔍 Check if order already exists for this student & service
        const isExistOrder = await Order.findOne({ reference: id, serviceId });
        if (isExistOrder) {
            return NextResponse.json(
                { message: "আপনি অর্ডারটি আগেই কনফার্ম করেছেন।" },
                { status: 401 }
            );
        }

        // 🧾 Step 1️⃣ — Create new order (initially pending)
        const newOrder = await Order.create({
            profileId,
            reference: id,
            serviceId,
            department,
            collegeFee,
            subjectFee,
            chargeFee,
            totalFee,
            status: "pending",
            paymentStatus: "pending",
        });

        // 💳 Step 2️⃣ — Create payment info linked to this order
        const newPayment = await PaymentInfoModel.create({
            userId: id,
            profileId,
            orderId: newOrder._id,
            txnId: payment.txnId,
            senderNumber: payment.senderNumber,
            amount: payment.amount,
            method: payment.method,
            verified: false, // admin approve দিলে true হবে
        });

        // ✅ Step 3️⃣ — Return success response
        return NextResponse.json(
            {
                message: "অর্ডার ও পেমেন্ট সফলভাবে জমা হয়েছে।",
                order: newOrder,
                payment: newPayment,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}



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

