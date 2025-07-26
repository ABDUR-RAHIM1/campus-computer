import { connectDb } from "@/database/connectDb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import AdminModel from "@/database/models/AdminAuth";

export const POST = async (req) => {
    try {
        await connectDb();

        const body = await req.json();
        const { username, phone, password } = body;

        if (!username || !phone || !password) {
            return NextResponse.json(
                { message: "সব ফিল্ড পূরণ করুন।" },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।" },
                { status: 400 }
            );
        }

        const isExist = await AdminModel.findOne({ phone });
        if (isExist) {
            return NextResponse.json(
                { message: "এই ফোন নাম্বার দিয়ে ইতিমধ্যে একটি একাউন্ট রয়েছে।" },
                { status: 409 }
            );
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await AdminModel.create({
            username,
            phone,
            password: hashedPassword,
        });

        return NextResponse.json(
            {
                message: "রেজিস্ট্রেশন সফল হয়েছে!"
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration Error:", error);

        // 👇 Mongoose validation error check
        if (error.name === "ValidationError") {
            const errors = Object.values(error.errors).map((err) => err.message);
            return NextResponse.json(
                { message: errors[0] || "ভ্যালিডেশন ত্রুটি।" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "রেজিস্ট্রেশন করতে ব্যর্থ হয়েছে।" },
            { status: 500 }
        );
    }
};
