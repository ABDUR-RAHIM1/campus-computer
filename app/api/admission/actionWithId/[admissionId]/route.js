import { connectDb } from "@/database/connectDb";
import AdmissionModel from "@/database/models/Admission";
import SubAdminModel from "@/database/models/SubAdmin";
import { NextResponse } from "next/server"



//  get by id admission 
export const GET = async (request, { params }) => {
    try {

        const { admissionId } = await params;
        await connectDb();
        const admissionService = await AdmissionModel.findById(admissionId)
            .populate("institute", "username")

        if (!admissionService) {
            return NextResponse.json({
                message: "Admission Service Not found",
                data: []
            }, { status: 404 })
        };

        return NextResponse.json(admissionService, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            message: error.message || "Internal Server Error"
        }, { status: 500 })
    }
};


// delete admission Services
export const DELETE = async (request, { params }) => {
    try {

        const { admissionId } = await params;
        await connectDb();
        const isDeleted = await AdmissionModel.findByIdAndDelete(admissionId);

        if (!isDeleted) {
            return NextResponse.json({
                message: "Admission Service Not found",
            }, { status: 404 })
        };

        return NextResponse.json({
            message: "Admission Service Deleted Succesfully",
        }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: error.message || "Internal Server Error 2"
        }, { status: 500 })
    }
};


// Update admission Services
export const PUT = async (request, { params }) => {
    try {

        const body = await req.json;
        const { admissionId } = await params;
        await connectDb();
        const isUpdated = await AdmissionModel.findByIdAndUpdate(admissionId, {
            $set: body
        }, { new: true });

        if (!isUpdated) {
            return NextResponse.json({
                message: "Admission Service Not found",
            }, { status: 404 })
        };

        return NextResponse.json({
            message: "Admission Service Updated Succesfully",
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            message: error.message || "Internal Server Error"
        }, { status: 500 })
    }
}