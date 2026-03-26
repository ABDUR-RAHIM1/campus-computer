"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { downloadAsPDF } from './downloadAsPDF'

export default function DownloadButton({ data }) {

    return (
        <Button onClick={() => downloadAsPDF(data)}>
            ডাউনলোড
        </Button>
    )
}
