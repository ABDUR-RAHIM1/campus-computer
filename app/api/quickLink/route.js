
import { connectDb } from "@/database/connectDb";
import QuickLinkModel from "@/database/models/quickLink";
import { NextResponse } from "next/server";

// GET all quick links
//  api/quickLink
export async function GET() {
    try {
        await connectDb();
        const links = await QuickLinkModel.find().sort({ updatedAt: -1 });
        return NextResponse.json(links, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// POST create new quick link
export async function POST(req) {
    const body = await req.json();

    await connectDb()

    // যদি array আসে
    if (Array.isArray(body)) {
        const created = await QuickLinkModel.insertMany(body);
        return NextResponse.json(created, { status: 201 });
    }

    // না হলে, একক ইনসার্ট
    await QuickLinkModel.create(body);
    return NextResponse.json({ message: "Created Successfully" }, { status: 201 });
}
