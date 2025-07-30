"use client"
import { Button } from '@/components/ui/button'
import { FileUploaderModal } from '@/utilities/FileUploaderModal';
import React, { useState } from 'react'

export default function AdditionalFileUploadButton({ profileId }) {

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(!showModal)
    }

    return (
        <>
            <Button onClick={handleShowModal} className=" w-full text-sm inline-block bg-green-600 hover:bg-green-700 text-white mt-3 py-2 px-4 rounded cursor-pointer transition">
                প্রয়োজনীয় ডকুমেন্ট আপলোড করুন
            </Button>

            <FileUploaderModal
                showModal={showModal}
                setShowModal={setShowModal}
                profileId={profileId}
            />
        </>
    )
}
