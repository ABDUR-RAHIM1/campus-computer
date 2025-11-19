import StudentProfileModel from "@/database/models/Profile";
import { studentAuthGuard } from "@/middlewere/studentAuthGuard";
import { NextResponse } from "next/server"


//  "/api/student/profile/byId/:profileId"
export const GET = async (req, { params }) => {
    try {

        const { profileId } = await params;
        const auth = await studentAuthGuard(req);
        if (auth.error) return auth.response;
        const student = await StudentProfileModel.findById(profileId)
            .populate("studentId", "-password")
            .populate("institute", "username");

        return NextResponse.json(student, {
            status: 200
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "Failed to fetch profile by Id"
        })
    }
}