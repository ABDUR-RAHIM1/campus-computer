"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { downloadAsTxt } from './DownloadAsTxt'

export default function DownloadButton({ data }) {
    return (
        <Button onClick={() => downloadAsTxt(data)}>
            ডাউনলোড
        </Button>
    )
}
