
import { NextResponse } from "next/server";
import { studentAuthGuard } from "@/middlewere/studentAuthGuard";
import StudentProfileModel from "@/database/models/Profile";
import { connectDb } from "@/database/connectDb";


//  /api/student/profile/meAll
export async function GET(req) {
    await connectDb();

    try {
        const auth = await studentAuthGuard(req);
        if (auth.error) return auth.response;

        const { id: studentId, phone } = auth.student;

        const student = await StudentProfileModel.find({ studentId })
            .populate("studentId", "-password")


        return NextResponse.json(student || [], { status: 200 });

    } catch (error) {
        console.error("প্রোফাইল আনতে ব্যর্থ হয়েছে:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

