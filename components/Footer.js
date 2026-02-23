import React from 'react';
import Link from 'next/link';
import {
    Facebook,
    Youtube,
    Mail,
    MapPin,
    Phone,
    ExternalLink,
    ShieldCheck
} from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-950 text-gray-300 pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20">
                                C
                            </div>
                            <span className="text-2xl font-black text-white tracking-tighter">
                                ক্যাম্পাস <span className="text-blue-500">কম্পিউটার</span>
                            </span>
                        </div>
                        <p className="text-gray-400 font-medium leading-relaxed">
                            লালমনিরহাট সরকারি কলেজের পাশে অবস্থিত একটি আধুনিক ডিজিটাল সেবা কেন্দ্র। আমরা শিক্ষার্থীদের প্রতিটি জটিল আবেদনকে সহজ ও নির্ভুল করতে প্রতিশ্রুতিবদ্ধ।
                        </p>
                        <div className="flex gap-4">
                            <a href="https://web.facebook.com/campusComputerLgc/"
                                target='_blank'
                                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all border border-gray-800">
                                <Facebook size={18} />
                            </a>
                            <a href="#" target='_blank' className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all border border-gray-800">
                                <Youtube size={18} />
                            </a>
                            <a href="#" target='_blank' className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all border border-gray-800">
                                <Mail size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">গুরুত্বপূর্ণ লিংক</h4>
                        <ul className="space-y-4 font-medium">
                            <li><Link href="#services-list" className="hover:text-blue-500 transition-colors">সেবাসমূহ</Link></li>
                            <li><Link href="/about" className="hover:text-blue-500 transition-colors">আমাদের সম্পর্কে</Link></li>
                            <li><Link href="/notices" className="hover:text-blue-500 transition-colors">নোটিশ বোর্ড</Link></li>
                            <li><Link href="/privacy" className="hover:text-blue-500 transition-colors">প্রাইভেসি পলিসি</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">যোগাযোগ</h4>
                        <ul className="space-y-5 font-medium">
                            <li className="flex items-start gap-3">
                                <MapPin className="text-blue-500 shrink-0 mt-1" size={20} />
                                <span>লালমনিরহাট সরকারি কলেজ গেট সংলগ্ন, কলেজ বাজার, লালমনিরহাট।</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="text-blue-500 shrink-0" size={20} />
                                <span>01611-530939</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="text-blue-500 shrink-0" size={20} />
                                <span>lgccampuscomputer@gmail.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Sub-Admin CTA */}
                    <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800">
                        <div className="flex items-center gap-2 mb-4 text-blue-500 font-bold">
                            <ShieldCheck size={20} />
                            <span className="text-sm">পার্টনারশিপ সুযোগ</span>
                        </div>
                        <h4 className="text-white font-bold mb-3 leading-snug">
                            আপনি কি অন্য কোনো কলেজের সাব-অ্যাডমিন হতে চান?
                        </h4>
                        <p className="text-xs text-gray-500 mb-6">
                            আমাদের প্ল্যাটফর্মটি ব্যবহার করে আপনার এলাকায় স্মার্ট ডিজিটাল সেবা শুরু করুন।
                        </p>
                        <Link
                            href="tel:+8801611530939"
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-5 py-3 rounded-xl transition-all w-full justify-center"
                        >
                            আবেদন করুন <ExternalLink size={14} />
                        </Link>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm font-bold text-gray-500">
                        &copy; {currentYear} ক্যাম্পাস কম্পিউটার। সর্বস্বত্ব সংরক্ষিত।
                    </p>
                    <p className="text-xs text-gray-600 font-medium">
                        Developed by <a href='https://web.facebook.com/Aabdurrahim.17/'
                            target='_blank'
                            className="text-gray-400 font-bold hover:underline hover:text-blue-500 transition-all">Abdur Rahim</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}