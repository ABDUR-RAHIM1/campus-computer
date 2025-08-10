"use client"
import { Button } from '@/components/ui/button';
import { globalContext } from '@/contextApi/ContextApi';
import Spinner from '@/utilities/Spinner';
import { Pencil, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'

export default function UpdateButton({ data }) {
    const { showToast } = useContext(globalContext)
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleUpdateData = async () => {

        try {

            alert("update")

        } catch (error) {
            console.log("failed to delete")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div onClick={handleUpdateData} className=' inline-block '>
            {
                isLoading ? <Spinner /> : <Button className={" bg-blue-500 cursor-pointer"}>
                    <Pencil size={16} />
                </Button>
            }
        </div>
    )
}
