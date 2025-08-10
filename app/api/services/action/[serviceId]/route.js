import { connectDb } from "@/database/connectDb";
import ServiceModel from "@/database/models/Services";
import { adminAuthGuard } from "@/middlewere/adminAuthGuard";
import { NextResponse } from "next/server";

//  api/service/action/[serviceId]



export const DELETE = async (req, { params }) => {
    try {

        const { serviceId } = await params;

        // 🔐 Auth Guard: শুধুমাত্র অ্যাডমিনের অনুমতি
        const { error, admin, response } = await adminAuthGuard(req);
        if (error) return response;

        await connectDb();

        const isDeleted = await ServiceModel.findByIdAndDelete(serviceId);

        if (!isDeleted) {
            return NextResponse.json({
                message: "সার্ভিস খুজে পাওয়া যায়নি!"
            }, { status: 404 })
        }


        return NextResponse.json({
            message: "সার্ভিসটি ডিলিট করা হয়েছে"
        }, { status: 200 });
    } catch (error) {
        console.error("সার্ভিস ডিলিট ব্যর্থ:", error);
        return NextResponse.json({ message: "সার্ভিস ডিলিট ব্যর্থ হয়েছে।" }, { status: 500 });
    }
};