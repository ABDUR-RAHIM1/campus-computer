import { NextResponse } from "next/server"

export const GET = async (request) => {
    return NextResponse.json({
        message: "Campus Computer api is Running"
    }, { status: 200 })
}