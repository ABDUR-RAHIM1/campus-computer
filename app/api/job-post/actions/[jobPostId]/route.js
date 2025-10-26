import { connectDb } from "@/database/connectDb";
import JobPost from "@/database/models/Jobs";
import { NextResponse } from "next/server";



// ✅ GET single job post
export async function GET(req, { params }) {
    try {

        const { jobPostId } = await params;

        await connectDb();
        const job = await JobPost.findById(jobPostId)
        if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });
        return NextResponse.json(job, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Internal Server Error"
        }, {
            status: 500
        })
    }
}

// ✅ PUT update job post
export async function PUT(req, { params }) {

    const { jobPostId } = await params;

    try {
        const body = await req.json();

        await connectDb();

        const updatedJob = await JobPost.findByIdAndUpdate(jobPostId, body, {
            new: true,
        });

        if (!updatedJob) {
            return NextResponse.json({ error: "Job not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: 'Successfully Updated'
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 })
    }
}

// ✅ DELETE job post
export async function DELETE(req, { params }) {
    try {
        await connectDb();
        const deletedJob = await JobPost.findByIdAndDelete(params.id);

        if (!deletedJob) {
            return NextResponse.json({ error: "Job not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Job deleted successfully" });

    } catch (error) {
        return NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 })
    }
}
