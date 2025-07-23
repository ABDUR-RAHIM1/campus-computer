// route.js (e.g., /api/services/matched)

import { connectDb } from "@/database/connectDb";
import ServiceModel from "@/database/models/Services";
import StudentAuthModel from "@/database/models/StudentAuth";
import { studentAuthGuard } from "@/middlewere/studentAuthGuard";
import { NextResponse } from "next/server";

//  api => "/api/service/matchWithMe"

export async function GET(req) {
    try {
        await connectDb();

        // 🔐 Step 1: Authenticated student info
        const auth = await studentAuthGuard(req);
        if (auth.error) return auth.response;

        const studentId = auth.student.id;

        // 👤 Step 2: Fetch full student profile
        const student = await StudentAuthModel.findById(studentId);
        if (!student) {
            return NextResponse.json({ message: "Student not found" }, { status: 404 });
        }

        const { program, department, classYear, session } = student;

        // 📌 Step 3: Find matching services
        const matchedServices = await ServiceModel.find({
            program,
            department,
            classYear,
            session,
            active: true, // optional
            // $or: [
            //     { $and: [{ program }, { department }] },
            //     { $and: [{ program }, { session }] },
            //     { $and: [{ program }, { classYear }] },
            //     { $and: [{ department }, { session }] },
            //     { $and: [{ department }, { classYear }] },
            //     { $and: [{ session }, { classYear }] }
            // ]
        });

        return NextResponse.json(matchedServices, { status: 200 });

    } catch (error) {
        console.error("Error fetching matched services:", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}
