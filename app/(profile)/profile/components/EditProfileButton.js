import Link from 'next/link'
import React from 'react'

export default function EditProfileButton() {
    return (
        <Link href="/profile/update" className=" text-sm inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition">
            প্রোফাইল আপডেট  করতে ক্লিক করুন
        </Link>
    )
}
