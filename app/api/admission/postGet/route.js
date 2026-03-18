import { connectDb } from "@/database/connectDb";
import AdmissionModel from "@/database/models/Admission";
import SubAdminModel from "@/database/models/SubAdmin";
import { NextResponse } from "next/server"


export const POST = async (request) => {
    try {

        const body = await request.json();
        const { institute, serviceName, deadline, collegeFee, processingFee, serviceCharge, reletedFile, reletedFileText, formFields } = body;

        await connectDb();
        const newAdmission = await new AdmissionModel({
            institute,
            serviceName,
            deadline,
            collegeFee,
            processingFee,
            serviceCharge,
            reletedFile,
            reletedFileText: "",
            formFields
        });

        await newAdmission.save();

        return NextResponse.json({
            message: " Admission Services Successfully added"
        }, { status: 201 })


    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: error.message || "Internal Server Error"
        }, { status: 500 })
    }
};


export const GET = async (request) => {
    try {

        await connectDb();
        const admissions = await AdmissionModel.find()
            .sort({ "createdAt": -1 })
            .populate("institute", "username")

        return NextResponse.json(admissions, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: error.message || "Internal Server error"
        }, { status: 500 })
    }
}