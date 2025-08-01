import { connectDb } from "@/database/connectDb"; 
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import StudentProfileModel from "@/database/models/Profile";


//  profile update 
export const PUT = async (req, { params }) => {
    const { profileId } = await params;

    try {
        await connectDb();

        const body = await req.json();

        // ✅ যদি password ফিল্ড আসে তবে hash করে দাও
        if (body.password) {
            const salt = await bcrypt.genSalt(10);
            body.password = await bcrypt.hash(body.password, salt);
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
export const DELETE = async (req, { params }) => {
    const { profileId } = await params;

    try {
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