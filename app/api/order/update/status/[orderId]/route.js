import { Order } from "@/database/models/Order";
import { adminAuthGuard } from "@/middlewere/adminAuthGuard";
import { NextResponse } from "next/server";



//  api => /api/order/update/status/[orderId]
export const PUT = async (req, { params }) => {
    try {
        // 🔐 Auth Guard: শুধুমাত্র অ্যাডমিনের অনুমতি
        const { error, admin, response } = await adminAuthGuard(req);
        if (error) return response;

        const { orderStatus } = await req.json();
        const { orderId } = await params;

        const isOrder = await Order.findById(orderId);

        if (!isOrder) {
            return NextResponse.json(
                { message: "অর্ডার পাওয়া যায়নি!" },
                { status: 404 }
            );
        }

        const isUpdated = await Order.findByIdAndUpdate(orderId, {
            $set: {
                status: orderStatus,
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
