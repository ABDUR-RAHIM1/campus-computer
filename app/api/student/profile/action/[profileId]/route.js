import { connectDb } from "@/database/connectDb";
import { NextResponse } from "next/server";
import StudentProfileModel from "@/database/models/Profile";
import { studentAuthGuard } from "@/middlewere/studentAuthGuard";
import { duelAuthGuard } from "@/middlewere/duelAuthGuard";
import { Order } from "@/database/models/Order";


//  profile update 
// suhdu student update korte parbe 
export const PUT = async (req, { params }) => {
    const { profileId } = await params;

    try {

        const auth = await studentAuthGuard(req);
        if (auth.error) return auth.response;

        await connectDb();

        const body = await req.json();

        const isRunningOrder = await Order.find({
            profileId,
            status: { $nin: ["success", "cancel"] }
        });

        if (isRunningOrder.length > 0) {
            return NextResponse.json({
                message: "আবেদন চলমান আছে, আপডেট করা সম্ভব নয়!"
            }, {
                status: 401
            });
        }

        const updatedUser = await StudentProfileModel.findByIdAndUpdate(
            profileId,
            { $set: body },
            { new: true }
        );

        if (updatedUser) {
            return NextResponse.json(
                {
                    message: "আপডেট সফল হয়েছে!",
                    userId: updatedUser._id,
                },
                { status: 200 }
            );
        }

        return NextResponse.json(
            {
                message: "ব্যবহারকারী খুঁজে পাওয়া যায়নি বা আপডেট হয়নি।",
            },
            { status: 404 }
        );
    } catch (error) {
        console.error("Update Error:", error);

        return NextResponse.json(
            { message: "আপডেট করতে ব্যর্থ হয়েছে।" },
            { status: 500 }
        );
    }
};



//  delete Profile
// /api/student/profile/action/[profileId]
// admin / student je kew delete korte parbe 
export const DELETE = async (req, { params }) => {
    const { profileId } = await params;

    try {

        // info === admin / student token info
        const { error, info } = await duelAuthGuard(req)
        if (error) {
            return NextResponse.json(
                { message: "অনুমোদিত নয়!" },
                { status: 401 }
            );
        };
        await connectDb();

        const deletedUser = await StudentProfileModel.findByIdAndDelete(profileId);

        if (!deletedUser) {
            return NextResponse.json(
                { message: "ব্যবহারকারী খুঁজে পাওয়া যায়নি।" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "ব্যবহারকারীর তথ্য সফলভাবে মুছে ফেলা হয়েছে।" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Delete Error:", error);

        return NextResponse.json(
            { message: "তথ্য মুছতে সমস্যা হয়েছে।" },
            { status: 500 }
        );
    }
};