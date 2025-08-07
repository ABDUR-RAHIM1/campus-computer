"use client"
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button' 
import { CancelOrderDialog } from '../components/CancelOrderDailog';



export default function OrderAction({ orderId }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenCancelFormWithId = () => {
        console.log("cancel id", orderId)
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
                    <Button variant="outline" className={"border border-green-600"}>ম্যানেজ</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-36">
                    <DropdownMenuSeparator />
                    <Button
                        onClick={handleOpenCancelFormWithId}
                        variant={"outline"}
                        className={"bg-red-100 border border-red-500 m-2"}
                    >Cancel Order
                    </Button>
                    <Button variant={"outline"} className={"bg-blue-100 border border-blue-500 m-2"}>Update Order</Button>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
