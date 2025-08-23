
import { NextResponse } from "next/server"; 
import SubAdminModel from "@/database/models/SubAdmin";
import bcrypt from "bcryptjs";
import { adminAuthGuard } from "@/middlewere/adminAuthGuard";

export const POST = async (req) => {
    try {
        const body = await req.json();
        const { username, phone, password, photo, address, description } = body;

        // 🔐 Auth Guard
        const { error, admin, response } = await adminAuthGuard(req);
        if (error) return response;

        // ✅ Duplicate check
        const existing = await SubAdminModel.findOne({
            $or: [{ username }, { phone }],
        });

        if (existing) {
            return NextResponse.json(
                { message: "Username or phone already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const newSubAdmin = new SubAdminModel({
            username,
            phone,
            password: hashedPassword,
            address,
            description,
            photo,
        });

        await newSubAdmin.save();

        return NextResponse.json(
            { message: "Sub Admin Created Successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Failed to create sub-admin" },
            { status: 500 }
        );
    }
};



export const GET = async (req) => {
    try {


        // 🔐 Auth Guard
        const { error, admin, response } = await adminAuthGuard(req);
        if (error) return response;

        const subAdmins = await SubAdminModel.find().select("-password");

        return NextResponse.json(subAdmins)


    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Failed to fetch sub-admin" },
            { status: 500 }
        );
    }
}