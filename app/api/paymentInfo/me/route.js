import { connectDb } from "@/database/connectDb";
import { Order } from "@/database/models/Order";
import PaymentInfoModel from "@/database/models/PaymentInfo"
import StudentProfileModel from "@/database/models/Profile";
import StudentAuthModel from "@/database/models/StudentAuth";
import { adminAuthGuard } from "@/middlewere/adminAuthGuard";
import { studentAuthGuard } from "@/middlewere/studentAuthGuard";
import { NextResponse } from "next/server";


//  only verifiyed student
export const GET = async (req) => {
    try {
        // 🔐 Auth Guard: শুধুমাত্র অ্যাডমিনের অনুমতি
        const auth = await studentAuthGuard(req);
        if (auth.error) return auth.response;


        await connectDb();
        const payments = await PaymentInfoModel.find({
            userId: auth.student.id
        })
            .populate("userId", "username")
            .populate("profileId", "studentName")
            .populate("orderId", "calculatedTotal")
            .sort({ "createdAt": - 1 })
        return NextResponse.json(payments, { status: 200 })


    } catch (error) {
        return NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 })
    }
}