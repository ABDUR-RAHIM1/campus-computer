import { Order } from "@/database/models/Order";
import { studentAuthGuard } from "@/middlewere/studentAuthGuard";
import { NextResponse } from "next/server";


//  only for student (cancel order)
//  api => /api/order/cancel/[cancelOrderId]
export const PUT = async (req, { params }) => {
    try {
        // 🔐 Auth Guard: শুধুমাত্র অ্যাডমিনের অনুমতি
        const auth = await studentAuthGuard(req);
        if (auth.error) return auth.response;


        const { cencelOrderId: orderId } = await params;
        const { recivedNumber, reason } = await req.json();
 

        const isOrder = await Order.findById(orderId);

        if (!isOrder) {
            return NextResponse.json(
                { message: "অর্ডার পাওয়া যায়নি!" },
                { status: 404 }
            );
        }

        const isUpdated = await Order.findByIdAndUpdate(orderId, {
            $set: {
                cancelOrderInfo: {
                    recivedNumber,
                    reason
                },
                status: "cancel",
            },
        });

        if (!isUpdated) {
            return NextResponse.json(
                { message: "অর্ডার স্ট্যাটাস আপডেট হয়নি!" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "অর্ডার স্ট্যাটাস সফলভাবে আপডেট হয়েছে!" },
            { status: 200 }
        );
    } catch (error) {
        console.log("Order Status Update Error:", error);
        return NextResponse.json(
            { message: "স্ট্যাটাস আপডেট করতে ব্যর্থ হয়েছে!" },
            { status: 500 }
        );
    }
};
