"use client";
import { PostAction } from "@/actions/students/PostAction";
import { Button } from "@/components/ui/button";
import { orderPostGetall } from "@/constans";
import { globalContext } from "@/contextApi/ContextApi";
import Spinner from "@/utilities/Spinner";
import React, { useContext, useState } from "react";

export default function ApplyButton({ serviceId }) {
    const { showToast } = useContext(globalContext)
    const [waiting, setWaiting] = useState(false)


    const handleClick = async () => {
        setWaiting(true)
        try {

            const payload = {
                method: "POST",
                endpoint: orderPostGetall,
                body: { serviceId }
            }
            const { status, data } = await PostAction(payload);
            showToast(status, data)

        } catch (error) {
            console.log(error)
        } finally {
            setWaiting(false)
        }

    };

    return (
        <Button
            onClick={handleClick}
            className=" min-w-[130px] mt-4 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition cursor-pointer"
        >
            {
                waiting ? <Spinner /> : "আবেদন করুন"
            }
        </Button>
    );
}
