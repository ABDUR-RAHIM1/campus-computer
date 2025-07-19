import { connectDb } from "@/database/connectDb";
import StudentAuthModel from "@/database/models/StudentAuth";
import { studentAuthGuard } from "@/middlewere/studentAuthGuard";
import { NextResponse } from "next/server";

// get only login Student (based on Token)
export const GET = async (req) => {
    try {
        await connectDb();

        const auth = await studentAuthGuard(req);
        if (auth.error) return auth.response;

        const { id, phone } = auth.student;

        const student = await StudentAuthModel.findOne({ _id: id, phone }).select("-password");

        if (!student) {
            return NextResponse.json(
                { message: "স্টুডেন্ট খুঁজে পাওয়া যায়নি।" },
                { status: 404 }
            );
        }

        return NextResponse.json(student, { status: 200 });

    } catch (error) {
        console.error("Fatching Error:", error);
        return NextResponse.json(
            { message: "ডাটা আনতে সমস্যা হয়েছে।" },
            { status: 500 }
        );
    }
};
