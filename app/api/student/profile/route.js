import { NextResponse } from "next/server";
import { studentAuthGuard } from "@/middlewere/studentAuthGuard";
import StudentProfileModel from "@/database/models/Profile";
import { connectDb } from "@/database/connectDb";


//  /api/student/profile
export async function POST(req) {
    await connectDb();

    try {
        const auth = await studentAuthGuard(req);
        if (auth.error) return auth.response;

        const { id: studentId, phone } = auth.student;

        const body = await req.json();

        const {
            email,
            instituteName,
            program,
            department,
            classYear,
            session: academicSession,
            registrationNumber,
            boardRoll,
            classRoll,
            pin,
            guardianPhone,
            address,
            birthDate,
            bloodGroup,
            gender,
            hasImprovement,
            improvementSubjects,
            profilePicture,
            documents,
            isOtherStudent
        } = body;

        await StudentProfileModel.create({
            studentId: studentId,
            email,
            instituteName,
            program,
            department,
            classYear,
            session: academicSession,
            registrationNumber,
            boardRoll,
            classRoll,
            pin,
            guardianPhone,
            address,
            birthDate,
            bloodGroup,
            gender,
            hasImprovement,
            improvementSubjects,
            documents,
            profilePicture,
            isOtherStudent
        });

        return NextResponse.json({ message: "প্রোফাইল তৈরি হয়েছে" }, { status: 201 });

    } catch (error) {
        console.error("প্রোফাইল তৈরি করতে ব্যর্থ হয়েছে:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

