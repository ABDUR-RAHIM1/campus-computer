import { connectDb } from "@/database/connectDb";
import StudentAuthModel from "@/database/models/StudentAuth";
import { NextResponse } from "next/server";


// get all student for admin and public
// api => /api/auth/student/all
// admin auth middlewere diye protected korte hobe 
export const GET = async (req) => {
    try {
        await connectDb();

        const students = await StudentAuthModel.find()
            .select("-password -documents ")

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
