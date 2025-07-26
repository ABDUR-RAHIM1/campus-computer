import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Logo() {
    return (
        <Link href={"/"} className=' font-bold text-xl md:text-2xl'>
            Campus Computer
        </Link>
    )
}
