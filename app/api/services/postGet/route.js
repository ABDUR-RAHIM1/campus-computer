import { connectDb } from "@/database/connectDb";
import ServiceModel from "@/database/models/Services";
import { NextResponse } from "next/server";


//  Creaet services for Admin
 // api => /api/services/postGet
export const POST = async (req) => {
    try {
        await connectDb();

        const body = await req.json();

        // Simple validation example, তুমি চাইলে Joi বা Zod দিয়ে করো
        if (!body.title || !body.program || !body.classYear || !body.fee) {
            return NextResponse.json(
                { message: "title, program, classYear এবং fee অবশ্যই দিতে হবে।" },
                { status: 400 }
            );
        }

        const newService = new ServiceModel({
            title: body.title,
            description: body.description || "",
            program: body.program,
            department: body.department || null,
            classYear: body.classYear,
            session: body.session || null,
            fee: body.fee,
            requiredDocuments: body.requiredDocuments || [],
            active: body.active !== undefined ? body.active : true,
        });

        const savedService = await newService.save();

        return NextResponse.json(
            {
                message: "সার্ভিস সফলভাবে যোগ করা হয়েছে।",
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("POST Services Error:", error);
        return NextResponse.json({ message: "সার্ভিস যোগ করতে ব্যর্থ হয়েছে।" }, { status: 500 });
    }
};




//  for Public and Admin
export const GET = async () => {
    try {
        await connectDb();

        const services = await ServiceModel.find({ active: true }).sort({ createdAt: -1 });

        return NextResponse.json(services, { status: 200 });
    } catch (error) {
        console.error("GET Services Error:", error);
        return NextResponse.json({ message: "সার্ভিসগুলো আনতে ব্যর্থ হয়েছে।" }, { status: 500 });
    }
};

