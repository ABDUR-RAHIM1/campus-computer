import JobProfileModel from "@/database/models/JobProfile";
import { studentAuthGuard } from "@/middlewere/studentAuthGuard";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
        const { error, student, response } = await studentAuthGuard(request);
        if (error) return response;

        const jobProfile = await JobProfileModel.find({ studentId: student.id });
        // const jobProfile = await JobProfileModel.find();
        return NextResponse.json(jobProfile, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed to fetch Job Profile "
        })
    }

}