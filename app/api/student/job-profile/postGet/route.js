import { connectDb } from '@/database/connectDb';
import JobProfileModel from '@/database/models/JobProfile';
import StudentAuthModel from '@/database/models/StudentAuth';
import { studentAuthGuard } from '@/middlewere/studentAuthGuard';
import { NextResponse } from 'next/server';



// 📌 CREATE (POST)
export async function POST(req) {
    try {
        const body = await req.json();

        await connectDb();
        const auth = await studentAuthGuard(req);
        if (auth.error) return auth.response;


        const newProfile = {
            ...body,
            studentId: auth.student.id
        };

        const newJobProfile = await JobProfileModel.create(newProfile);
        return NextResponse.json({
            message: "Job Profile Created Succesfully"
        }, { status: 201 });
    } catch (error) {

        if (error.name === "ValidationError") {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            return NextResponse.json({ message: "Required Field  are missing", errors }, { status: 400 });
        }
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}


export async function GET() {
    try {
        const profiles = await JobProfileModel.find().populate('studentId', 'name phone');

        return NextResponse.json(profiles, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
};

