import { connectDb } from "@/database/connectDb";
import JobProfileModel from "@/database/models/JobProfile";
import { adminAuthGuard } from "@/middlewere/adminAuthGuard";
import { studentAuthGuard } from "@/middlewere/studentAuthGuard";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { jobId } = await params;
        const updateData = await request.json();

        const auth = await studentAuthGuard(request);
        if (auth.error) return auth.response;

        await connectDb();

        const updatedProfile = await JobProfileModel.findByIdAndUpdate(jobId, updateData, { new: true });

        return NextResponse.json({
            message: "সফলভাবে আপডেট হয়েছে"
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message, message: "Internal Server Error" }, { status: 500 });
    }
}



export async function DELETE(request, { params }) {
    try {
        const { jobId } = await params;


        // 🔐 Auth Guard: শুধুমাত্র অ্যাডমিনের অনুমতি
        const { error, admin, response } = await adminAuthGuard(request);
        if (error) return response;


        await connectDb();

        const isDeleted = await JobProfileModel.findByIdAndDelete(jobId);

        if (!isDeleted) {
            return NextResponse.json({ message: 'Job profile not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Job profile deleted successfully' }, {
            status: 200
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}