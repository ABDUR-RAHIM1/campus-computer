import { connectDb } from "@/database/connectDb";
import JobPost from "@/database/models/Jobs";
import { NextResponse } from "next/server";

//  api => /api/job-post/


// ✅ GET all job posts
export async function GET() {

    try {
        await connectDb();
        const jobs = await JobPost.find()
            .sort({ createdAt: -1 })
            .select("-description")
        return NextResponse.json(jobs, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Internal Server Error"
        }, {
            status: 500
        })
    }
}


// ✅ POST create new job post
export async function POST(req) {
    try {
        await connectDb();
        const body = await req.json();

        const newJob = new JobPost({
            category: body.category,
            title: body.title,
            startDate: body.startDate,
            endDate: body.endDate,
            description: body.description,
            payPaymentFee: body.payPaymentFee,
            charge: body.charge,
            totalPrice: body.totalPrice,
            noticeLink: body.noticeLink,
        });

        await newJob.save();
        return NextResponse.json({ message: "successfully Created" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({
            message: "Internal Server  Error"
        }, {
            status: 500
        })
    }
}