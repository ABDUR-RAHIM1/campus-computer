import StudentProfileModel from "@/database/models/Profile";
import { adminAuthGuard } from "@/middlewere/adminAuthGuard";
import { studentAuthGuard } from "@/middlewere/studentAuthGuard";
import { NextResponse } from "next/server"


//  "/api/student/profile/detailsByAdmin/:profileId"
export const GET = async (req, { params }) => {
    try {

        const { profileId } = await params;

        // 🔐 Auth Guard: শুধুমাত্র অ্যাডমিনের অনুমতি
        const { error, admin, response } = await adminAuthGuard(req);
        if (error) return response;

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