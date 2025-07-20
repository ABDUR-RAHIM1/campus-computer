"use client";
import { Button } from "@/components/ui/button";
import { globalContext } from "@/contextApi/ContextApi";
import React, { useContext } from "react";

export default function ApplyButton() {
    const { showToast } = useContext(globalContext)
    const handleClick = () => {
        // এখানে ভবিষ্যতে বিকাশ মার্চেন্ট লিংকে রিডাইরেক্ট করা হবে
        showToast(400, "কাজ চলতেছে, অপেক্ষা করুন সামনে ভালো কিছু আসতেছে")
    }; 

    return (
        <Button
            onClick={handleClick}
            className="mt-4 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition cursor-pointer"
        >
            আবেদন করুন
        </Button>
    );
}
