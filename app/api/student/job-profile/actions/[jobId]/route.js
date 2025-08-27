import { connectDb } from "@/database/connectDb";
import JobProfileModel from "@/database/models/JobProfile";
import JobProfile from "@/database/models/JobProfile";

export async function PUT(request, { params }) {
    try {
        const data = await request.json();
        const { fullName, dateOfBirth, gender, nationalId, contactNumber, email, presentAddress, permanentAddress, profilePhotoUrl, education, cvLink } = data;

        const { jobId } = await params;

        const updateData = {
            fullName,
            dateOfBirth,
            gender,
            nationalId,
            contactNumber,
            email,
            presentAddress,
            permanentAddress,
            profilePhotoUrl,
            education,
            cvUrl: cvLink
        };

        await connectDb();
        const updatedProfile = await JobProfileModel.findByIdAndUpdate(jobId, updateData, { new: true });

        return NextResponse.json({ success: true, updatedProfile });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}



export async function DELETE(request, { params }) {
    try {
        const { jobId } = await params;

        await connectDb();

        const isDeleted = await JobProfileModel.findByIdAndDelete(jobId);

        if (!isDeleted) {
            return NextResponse.json({ message: 'Job profile not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Job profile deleted successfully' }, {
            status: 200
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}