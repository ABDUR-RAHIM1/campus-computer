import { connectDb } from "@/database/connectDb";
import StudentAuthModel from "@/database/models/StudentAuth";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // import bcrypt

// POST - Register New Student
export const POST = async (req) => {
    try {
        await connectDb(); // Ensure DB is connected

        const body = await req.json();
        const { username, email, password } = body;

        // Basic validation
        if (!username || !email || !password) {
            return NextResponse.json(
                { message: "সব ফিল্ড পূরণ করুন।" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const isExist = await StudentAuthModel.findOne({ email });

        if (isExist) {
            return NextResponse.json(
                { message: "এই ইমেইল দিয়ে ইতিমধ্যে একটি একাউন্ট রয়েছে।" },
                { status: 409 }
            );
        }

        // 👉 Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save user with hashed password
        const newUser = await StudentAuthModel.create({
            username,
            email,
            password: hashedPassword,
        });

        return NextResponse.json(
            {
                message: "রেজিস্ট্রেশন সফল হয়েছে!",
                userId: newUser._id,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration Error:", error);
        return NextResponse.json(
            { message: "রেজিস্ট্রেশন করতে ব্যর্থ হয়েছে।" },
            { status: 500 }
        );
    }
};
