
import { connectDb } from "@/database/connectDb";
import { adminAuthGuard } from "@/middlewere/adminAuthGuard";
import { NextResponse } from "next/server";
import StudentProfileModel from "@/database/models/Profile";
import SubAdminModel from "@/database/models/SubAdmin";


// admin auth middlewere diye protected  
//  /api/student/profile/all
export const GET = async (req) => {
    try {


        // 🔐 Auth Guard: শুধুমাত্র অ্যাডমিনের অনুমতি
        const { error, admin, response } = await adminAuthGuard(req);
        if (error) return response;


        await connectDb();

        const students = await StudentProfileModel.find()
            .populate("studentId", "-password")
            .populate("institute", "username")

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
