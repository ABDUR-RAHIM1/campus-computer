import { connectDb } from "@/database/connectDb";
import { NextResponse } from "next/server";
import StudentProfileModel from "@/database/models/Profile";
import { studentAuthGuard } from "@/middlewere/studentAuthGuard";
import { duelAuthGuard } from "@/middlewere/duelAuthGuard";
import { Order } from "@/database/models/Order";


//  profile update 
// suhdu student update korte parbe 
// export const PUT = async (req, { params }) => {
//     const { profileId } = await params;

//     try {

//         const auth = await studentAuthGuard(req);
//         if (auth.error) return auth.response;

//         await connectDb();

//         const body = await req.json();
//         console.log(body)

//         if (body.documents && body?.documents?.length > 0) {

//         }

//         const isRunningOrder = await Order.find({
//             profileId,
//             status: { $nin: ["success", "cancel"] }
//         });

//         if (isRunningOrder.length > 0) {
//             return NextResponse.json({
//                 message: "আবেদন চলমান আছে, আপডেট করা সম্ভব নয়!"
//             }, {
//                 status: 401
//             });
//         }

//         const updatedUser = await StudentProfileModel.findByIdAndUpdate(
//             profileId,
//             { $set: body },
//             { new: true }
//         );

//         if (updatedUser) {
//             return NextResponse.json(
//                 {
//                     message: "আপডেট সফল হয়েছে!",
//                     userId: updatedUser._id,
//                 },
//                 { status: 200 }
//             );
//         }

//         return NextResponse.json(
//             {
//                 message: "ব্যবহারকারী খুঁজে পাওয়া যায়নি বা আপডেট হয়নি।",
//             },
//             { status: 404 }
//         );
//     } catch (error) {
//         console.error("Update Error:", error);

//         return NextResponse.json(
//             { message: "আপডেট করতে ব্যর্থ হয়েছে।" },
//             { status: 500 }
//         );
//     }
// };

 export const PUT = async (req, { params }) => {
    const { profileId } = await params;

    try {
        const auth = await studentAuthGuard(req);
        if (auth.error) return auth.response;

        await connectDb();
        const body = await req.json();

        // ১. বডিতে 'documents' বাদে অন্য কোনো ফিল্ড আছে কি না চেক করুন
        const incomingFields = Object.keys(body);
        const hasOtherFields = incomingFields.some(field => field !== "documents");

        // ২. যদি অন্য ফিল্ড থাকে, তবেই কেবল অর্ডার চেক করবো
        if (hasOtherFields) {
            const isRunningOrder = await Order.findOne({
                profileId,
                status: { $nin: ["success", "cancel"] }
            });

            if (isRunningOrder) {
                return NextResponse.json({
                    message: "আপনার একটি আবেদন চলমান আছে। এই মুহূর্তে ব্যক্তিগত তথ্য পরিবর্তন করা সম্ভব নয়। তবে আপনি নতুন ডকুমেন্ট যোগ করতে পারেন।"
                }, { status: 403 }); // ৪0৩ (Forbidden) বেশি উপযুক্ত এখানে
            }
        }

        // ৩. আপডেট লজিক
        // যদি শুধু documents আসে তবে $push বা $addToSet ব্যবহার করা ভালো যাতে আগের ফাইলগুলো না হারায়
        let updateQuery = { $set: body };
        
        if (!hasOtherFields && body.documents) {
            // যদি শুধু ডকুমেন্ট আসে, তবে আগের ডকুমেন্টের সাথে নতুনগুলো যোগ হবে
            updateQuery = { $addToSet: { documents: { $each: body.documents } } };
        }

        const updatedUser = await StudentProfileModel.findByIdAndUpdate(
            profileId,
            updateQuery,
            { new: true }
        );

        if (updatedUser) {
            return NextResponse.json(
                {
                    message: "সফলভাবে আপডেট করা হয়েছে!",
                    userId: updatedUser._id,
                },
                { status: 200 }
            );
        }

        return NextResponse.json(
            { message: "প্রোফাইল খুঁজে পাওয়া যায়নি।" },
            { status: 404 }
        );

    } catch (error) {
        console.error("Update Error:", error);
        return NextResponse.json(
            { message: "আপডেট করতে ব্যর্থ হয়েছে।" },
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