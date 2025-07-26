import { connectDb } from "@/database/connectDb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/constans";
import AdminModel from "@/database/models/AdminAuth";

// admin login 
export const POST = async (req) => {
    try {
        await connectDb(); // DB Connection

        const body = await req.json();
        const { phone, password } = body;

        if (!phone || !password) {
            return NextResponse.json(
                { message: "ফোন নাম্বার এবং পাসওয়ার্ড দিন।" },
                { status: 400 }
            );
        }

        const admin = await AdminModel.findOne({
            phone,
            role: { $in: ["admin", "moderator"] }
        });

        if (!admin) {
            return NextResponse.json(
                { message: "ভুল তথ্য দেওয়া হয়েছে।" },
                { status: 404 }
            );
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return NextResponse.json(
                { message: "ভুল তথ্য দেওয়া হয়েছে।" },
                { status: 401 }
            );
        }

        const token = jwt.sign(
            { id: admin._id, phone: admin.phone, role: admin.role },
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
        response.cookies.set("campus_computer_access", token, {
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
