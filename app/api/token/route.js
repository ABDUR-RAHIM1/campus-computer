import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// GET /api/token
export const GET = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("student_token")?.value;
        console.log("auhthenticat")
        if (!token) {
            return NextResponse.json({
                message: "টোকেন পাওয়া যায়নি!",
                token: null,
            }, {
                status: 401,
            });
        }

        return NextResponse.json({
            message: "Token retrieved successfully",
            token: token,
        }, {
            status: 200,
        });

    } catch (error) {
        console.error("Token Fetch Error:", error);
        return NextResponse.json({
            message: "টোকেন আনতে সমস্যা হয়েছে",
            token: null,
        }, {
            status: 500,
        });
    }
};
