import Link from "next/link";
import React from "react";

export function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-10  shadow-inner">
            <div className="container mx-auto px-4 text-center space-y-3">
                <h3 className="text-2xl font-bold tracking-wide text-white">
                    Campus Computer
                </h3>

                <p className="text-sm text-gray-400">
                    কলেজ বাজার, লালমনিরহাট <br />
                    📞 <a href="tel:01321040273" className="hover:underline">01321040273</a> /
                    <a href="tel:01611530939" className="hover:underline ml-1">01611530939</a>
                </p>

                <div className="flex justify-center space-x-6 text-sm font-medium">
                    <Link href="/" className="hover:text-blue-400 transition">হোম</Link>
                    <Link href="/developer" className="hover:text-blue-400 transition">
                        ডেভেলপার পরিচিতি
                    </Link>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
                        Facebook পেজ
                    </a>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                    &copy; {new Date().getFullYear()} ক্যাম্পাস কম্পিউটার. সর্বস্বত্ব সংরক্ষিত।
                </p>
            </div>
        </footer>
    );
}
