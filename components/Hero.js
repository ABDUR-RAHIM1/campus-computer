import Link from 'next/link';
import React from 'react'

export function Hero() {
    return (
        <section className="bg-gradient-to-br from-blue-100 to-blue-200 py-16">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    স্বাগতম ক্যাম্পাস কম্পিউটারে!
                </h1>
                <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-6">
                    লালমনিরহাট সরকারি কলেজের পাশে অবস্থিত ক্যাম্পাস কম্পিউটার, যেখানে আপনি পাবেন
                    নির্ভরযোগ্য ডিজিটাল সেবা এক ছাদের নিচে।
                </p>
                <Link
                    href="#services-list"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded shadow"
                >
                    সেবাসমূহ দেখুন
                </Link>
            </div>
        </section>
    );
}