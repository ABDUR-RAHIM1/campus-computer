"use client"
import ImagePreviewModal from '@/utilities/ImagePreviewModal'
import Image from 'next/image'
import React, { useState } from 'react'

export default function DocumentImage({ images, index }) {

    const [isOpen, setIsOpen] = useState(false)
    const [openedImg, setOpenedImg] = useState("")

    const handleOpenDocmuent = (img) => {
        setIsOpen(!isOpen)
        setOpenedImg(img)
    }

    return (
        <div onClick={() => handleOpenDocmuent(images)} key={index} className="border p-2 rounded shadow-sm cursor-pointer">
            <Image
                width={500}
                height={500}
                src={images}
                alt={`ডকুমেন্ট ${index + 1}`} className="w-full h-auto object-cover rounded" />


            <ImagePreviewModal open={isOpen} setOpen={setIsOpen} imageUrl={openedImg} />
        </div>
    )
}
