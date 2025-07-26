// utils/studentAuthGuard.js

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/constans";

export const adminAuthGuard = async (req) => {
    try {
        const authHeader = await req.headers.get("authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return {
                error: true,
                response: NextResponse.json(
                    { message: "অননুমোদিত অনুরোধ!" },
                    { status: 401 }
                ),
            };
        }

        const token = authHeader.split(" ")[1];

        // ✅ টোকেন ডিকোড করা
        const decoded = jwt.verify(token, JWT_SECRET);

        return {
            error: false,
            admin: decoded, // টোকেনে যা ছিল তাই ফেরত দিচ্ছে
        };

    } catch (error) {
        console.error("JWT Verify Error:", error);
        return {
            error: true,
            response: NextResponse.json(
                { message: "টোকেন যাচাই ব্যর্থ হয়েছে।" },
                { status: 403 }
            ),
        };
    }
};
