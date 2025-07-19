import Link from 'next/link'
import React from 'react'

export default function EditProfileButton() {
    return (
        <Link href="/profile/update" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">
            Update Profile
        </Link>
    )
}
