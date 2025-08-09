"use client"
import { DeleteActionAdmin } from '@/actions/admins/DeleteAction';
import { Button } from '@/components/ui/button';
import { globalContext } from '@/contextApi/ContextApi';
import Spinner from '@/utilities/Spinner';
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'

export default function DeleteButton({ deleteApi }) {
    const { showToast } = useContext(globalContext)
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {

        const isAccess = confirm("আপনি কি নিশ্চিত ডিলিট করতে চান? ")

        if (!isAccess) {
            return
        }
        setIsLoading(true)
        try {

            const { status, data } = await DeleteActionAdmin(deleteApi)

            showToast(status, data);
            if (status === 200 || status === 201) {
                router.refresh()
            }

        } catch (error) {
            console.log("failed to delete")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div onClick={handleDelete} className=' inline-block '>
            {
                isLoading ? <Spinner /> : <Button variant={"destructive"} className={"cursor-pointer"}>
                    <Trash />
                </Button>
            }
        </div>
    )
}
