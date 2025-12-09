"use client"
import { Button } from '@/components/ui/button';
import { globalContext } from '@/contextApi/ContextApi';
import Spinner from '@/utilities/Spinner';
import { Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'

export default function UpdateButton({ data, route }) {
    const { showToast, setEditData } = useContext(globalContext)
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleNavigateToUpdate = async () => {

        try {
            setEditData(data)
            router.push(route)

        } catch (error) {
            console.log("failed to update");
            showToast(400, "Failed to update Data")
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <div onClick={handleNavigateToUpdate} className=' inline-block '>
            {
                isLoading ? <Spinner /> : <Button className={" bg-blue-500 cursor-pointer"}>
                    <Pencil size={16} />
                </Button>
            }
        </div>
    )
}
