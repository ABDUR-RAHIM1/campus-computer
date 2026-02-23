"use client"
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { CancelOrderDialog } from '../components/CancelOrderDailog';
import { Trash2, RefreshCcw, MoreHorizontal } from 'lucide-react';

export default function OrderAction({ orderId }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenCancelFormWithId = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <CancelOrderDialog
                orderId={orderId}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 flex items-center justify-center rounded-full hover:bg-green-50 border border-green-200"
                    >
                        <MoreHorizontal className="h-4 w-4 text-green-700" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48 p-2 rounded-2xl shadow-xl border-gray-100">
                    <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2 py-1.5">
                        অর্ডার ম্যানেজমেন্ট
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {/* Update Option */}
                    <DropdownMenuItem
                        className="flex items-center gap-2 p-2.5 rounded-xl cursor-pointer focus:bg-blue-50 focus:text-blue-700 transition-colors"
                    >
                        <RefreshCcw size={16} />
                        <span className="text-sm font-bold">আপডেট করুন</span>
                    </DropdownMenuItem>

                    {/* Cancel Option */} 
                    <DropdownMenuItem
                        onClick={handleOpenCancelFormWithId}
                        className="flex items-center gap-2 p-2.5 rounded-xl cursor-pointer focus:bg-red-50 focus:text-red-600 text-red-500 transition-colors mt-1"
                    >
                        <Trash2 size={16} />
                        <span className="text-sm font-bold">অর্ডার বাতিল</span>
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}