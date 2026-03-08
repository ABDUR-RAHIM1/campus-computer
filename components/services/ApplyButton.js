"use client"
import React from 'react'
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { ArrowRightCircle } from 'lucide-react';
import Cookies from 'js-cookie';

export default function ApplyButton({ serviceData, color }) {
    const router = useRouter();

    // const handleApply = () => {
    //     // ১. ডেটা প্রিপারেশন
    //     const expiry = new Date().getTime() + 5 * 60 * 1000;
    //     const rawData = JSON.stringify({ serviceData, expiry });
    //     const encodedData = btoa(unescape(encodeURIComponent(rawData)));

    //     Cookies.set('pending_order', encodedData, { expires: 10 / (24 * 60) });

    //     router.push("/profile/create-order")

    // }

    const handleApply = () => {
        try {
            console.log("Preparing data...");

            const expiry = new Date().getTime() + 5 * 60 * 1000;
            const rawData = JSON.stringify({ serviceData, expiry });
            const encodedData = btoa(unescape(encodeURIComponent(rawData)));

            localStorage.setItem('pending_order', encodedData);
            router.push("/profile/create-order")

        } catch (error) {
            console.error("Storage error:", error);
        }
    };

    return (
        <Button
            onClick={handleApply}
            className={`w-full py-8 rounded-[1.5rem] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 ${color.accent} text-white shadow-lg active:scale-95 transition-all`}
        >
            আবেদন শুরু করুন <ArrowRightCircle size={20} />
        </Button>
    )
}