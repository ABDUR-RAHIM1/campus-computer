import { connectDb } from "@/database/connectDb";
import StudentAuthModel from "@/database/models/StudentAuth";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/constans";

export const POST = async (req) => {
    try {
        await connectDb(); // DB Connection

        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { message: "ইমেইল এবং পাসওয়ার্ড দিন।" },
                { status: 400 }
            );
        }

        const user = await StudentAuthModel.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: "এই ইমেইলের কোনো একাউন্ট খুঁজে পাওয়া যায়নি।" },
                { status: 404 }
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { message: "ভুল পাসওয়ার্ড দেওয়া হয়েছে।" },
                { status: 401 }
            );
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Create the response with JSON body
        const response = NextResponse.json(
            {
                message: "লগইন সফল হয়েছে!",
                token: token
            },
            { status: 200 }
        );

        // Set HTTPOnly cookie with token
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
            path: "/",
            sameSite: "strict",
        });

        return response;

    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json(
            { message: "লগইন করতে সমস্যা হয়েছে।" },
            { status: 500 }
        );
    }
};
