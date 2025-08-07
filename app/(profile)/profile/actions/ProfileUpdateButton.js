"use client"
import { Button } from '@/components/ui/button'
import React, { useContext } from 'react'
import { Edit } from "lucide-react";
import { useRouter } from 'next/navigation';
import { globalContext } from '@/contextApi/ContextApi';

export default function ProfileUpdateButton({ data }) {

    const {   setEditData } = useContext(globalContext);

    const router = useRouter();
    const handleEditDataManage = () => {
        setEditData(data)
        router.push("/profile/actions/edit")
    }

    return (
        <Button
            onClick={handleEditDataManage}
            className={"bg-blue-600 text-white cursor-pointer"}
        >
            <Edit />
        </Button>
    )
}
