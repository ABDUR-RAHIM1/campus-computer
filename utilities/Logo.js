import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logoImg from "@/public/logo.jpg"

export default function Logo() {
    return (
        <Link href={"/"} className=' font-bold text-xl md:text-2xl'>
            {/* 𝓒𝓪𝓶𝓹𝓾𝓼 𝓒𝓸𝓶𝓹𝓾𝓽𝓮𝓻 */}
            <Image
                src={logoImg}
                width={100}
                height={100}
                className=' w-16 md:w-20 h-12 md:h-16 rounded-full border'
                alt='campus computer lalmonirhat'
            />
        </Link>
    )
}
