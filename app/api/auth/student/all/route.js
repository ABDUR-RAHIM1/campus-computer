import { connectDb } from "@/database/connectDb";
import StudentAuthModel from "@/database/models/StudentAuth";
import { adminAuthGuard } from "@/middlewere/adminAuthGuard";
import { NextResponse } from "next/server";


// get all student for admin 
// api => /api/auth/student/all
// admin auth middlewere diye protected korte hobe 
export const GET = async (req) => {
    try {


        // 🔐 Auth Guard: শুধুমাত্র অ্যাডমিনের অনুমতি
        // const { error, admin, response } = await adminAuthGuard(req);
        // if (error) return response;


        await connectDb();

        const students = await StudentAuthModel.find()
            .select("-password")

        return NextResponse.json(students,
            { status: 200 }
        );
    } catch (error) {
        console.error("Fatching Error:", error);
        return NextResponse.json(
            { message: " ব্যর্থ হয়েছে।" },
            { status: 500 }
        );
    }
};
