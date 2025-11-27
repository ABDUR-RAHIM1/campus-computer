import { connectDb } from "@/database/connectDb";
import JobPost from "@/database/models/Jobs";
import { NextResponse } from "next/server";

// ✅ GET single job post
export async function GET(req, { params }) {

    const { jobId } = await params;

    try {
        await connectDb();
        const jobs = await JobPost.findById(jobId)
            .sort({ createdAt: -1 })

        return NextResponse.json(jobs, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            message: "Internal Server Error"
        }, {
            status: 500
        })
    }
}
