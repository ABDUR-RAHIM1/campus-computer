import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Logo() {
    return (
        <Link href={"/"} className=' font-bold text-xl md:text-2xl'>
           𝓒𝓪𝓶𝓹𝓾𝓼 𝓒𝓸𝓶𝓹𝓾𝓽𝓮𝓻
        </Link>
    )
}
