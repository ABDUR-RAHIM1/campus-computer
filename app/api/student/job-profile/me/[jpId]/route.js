import JobProfileModel from "@/database/models/JobProfile";
import { duelAuthGuard } from "@/middlewere/duelAuthGuard";
import { NextResponse } from "next/server";

//  get single Job Profile for Details admin/ user auth protected

export const GET = async (request, { params }) => {
    const { jpId } = await params; // ✅ await দরকার নেই


    try {
        // 🔐 Auth check
        const { error, access, info, response } = await duelAuthGuard(request);

        if (error || !access) {
            return response || NextResponse.json(
                { message: "আপনার অ্যাক্সেস নেই!" },
                { status: 401 }
            );
        }

        // ✅ যদি auth pass করে তাহলে data fetch
        const jobProfile = await JobProfileModel.findById(jpId);

        if (!jobProfile) {
            return NextResponse.json(
                { message: "Job profile পাওয়া যায়নি!" },
                { status: 404 }
            );
        }

        return NextResponse.json(jobProfile, { status: 200 });

    } catch (error) {
        console.error("GET JobProfile error:", error);
        return NextResponse.json(
            { message: "Failed to fetch job profile" },
            { status: 500 }
        );
    }
};
