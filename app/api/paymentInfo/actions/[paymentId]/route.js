import { connectDb } from "@/database/connectDb";
import { Order } from "@/database/models/Order";
import PaymentInfoModel from "@/database/models/PaymentInfo";
import { adminAuthGuard } from "@/middlewere/adminAuthGuard";
import { NextResponse } from "next/server"


export const PUT = async (req, { params }) => {
    try {
        await connectDb();

        const { paymentId } = await params;
        const body = await req.json();
        const { verified } = body;    

        // 🔐 Only admin can verify
        const { error, response } = await adminAuthGuard(req);
        if (error) return response;

        // Find payment
        const payment = await PaymentInfoModel.findById(paymentId);
        if (!payment) {
            return NextResponse.json({ message: "Payment not found!" }, { status: 404 });
        }

        // Find order connected to that payment  
        const order = await Order.findById(payment.orderId);
        if (!order) {
            return NextResponse.json({ message: "Order not found!" }, { status: 404 });
        }

        // ✅ Update states based on verified value
        payment.verified = verified;

        if (verified === true) {
            order.status = "active";
            order.paymentStatus = "paid";
        } else {
            order.status = "pending";
            order.paymentStatus = "pending";
        }

        await payment.save();
        await order.save();

        return NextResponse.json(
            { message: `Payment ${verified ? "Verified" : "Unverified"} Successfully!` },
            { status: 200 }
        );

    } catch (error) {
        console.error("Verify Error:", error);
        return NextResponse.json({ message: "Failed to update payment!" }, { status: 500 });
    }
};
