import React from 'react'
import Image from 'next/image'
import DocumentImage from '@/components/DocumentImage'
import { Card, CardContent } from '@/components/ui/card'
import { demoProfilePicture } from '@/constans'
import DownloadButton from '@/utilities/DownloadButton'
import {
    User, Phone, BookOpen, GraduationCap, Calendar,
    Hash, CreditCard, ShieldCheck, FileText, LayoutDashboard,
    CheckCircle2, Clock, MapPin
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default async function OrderDetails({ data }) {
    // আপনার দেওয়া Console Log অনুযায়ী ডাটা ডিস্ট্রাকচারিং
    const {
        profileId, // profile information - populated 
        serviceId,     // services info: populated 
        reference,     // main account info : populated 
        orderType,
        paymentStatus,
        totalFee,
        collegeFee,
        subjectFee,
        chargeFee,
        status: orderStatus
    } = data;

    return (
        <div className="max-w-5xl mx-auto my-10 px-4 space-y-6">

            {/* 🔝 Header Card: Profile & Status */}
            <div className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-blue-50/50 border border-gray-50 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                    <div className="relative w-24 h-24">
                        <Image
                            src={profileId?.profilePicture || demoProfilePicture}
                            alt="Profile"
                            fill
                            className="rounded-[2rem] object-cover border-4 border-blue-50 shadow-sm"
                        />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">
                            {profileId?.studentName || "নাম পাওয়া যায়নি"}
                        </h1>
                        <p className="text-blue-600 font-bold text-sm tracking-wide">
                            Reg: {profileId?.registrationNumber || "---"}
                        </p>
                        <div className="flex gap-2 mt-2">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-none px-3 py-1 text-[10px] font-black uppercase tracking-tighter">
                                Order: {orderStatus}
                            </Badge>
                            <Badge className={`${paymentStatus === "paid" ? "bg-emerald-500" : "bg-rose-500"} text-white border-none px-3 py-1 text-[10px] font-black uppercase tracking-tighter`}>
                                {paymentStatus}
                            </Badge>
                        </div>
                        <div className='my-2 text-sm capitalize'>
                            Order Type: {orderType}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <DownloadButton data={data} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* 📊 Left Column: Payment & Reference */}
                <div className="space-y-6">
                    {/* Payment Summary */}
                    <Card className="rounded-[2rem] border-none shadow-lg shadow-blue-50/50 overflow-hidden">
                        <div className="bg-gray-900 p-5 text-white">
                            <h3 className="flex items-center gap-2 font-black uppercase tracking-widest text-[10px]">
                                <CreditCard size={14} className="text-blue-400" /> পেমেন্ট ডিটেইলস
                            </h3>
                        </div>
                        <CardContent className="p-6 space-y-4">
                            <div className="flex justify-between items-center text-xs">
                                <span className="font-bold text-gray-400 uppercase">কলেজ ফি</span>
                                <span className="font-bold text-gray-700">৳ {collegeFee || 0}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="font-bold text-gray-400 uppercase">প্রতি সাবজেক্ট ফি</span>
                                <span className="font-bold text-gray-700">৳
                                    {subjectFee || 0}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="font-bold text-gray-400 uppercase">Biller চার্জ: </span>
                                <span className="font-bold text-gray-700">৳ {"Calculate kora hoyni"}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="font-bold text-gray-400 uppercase">চার্জ</span>
                                <span className="font-bold text-gray-700">৳ {chargeFee || 0}</span>
                            </div>
                            <div className="h-[1px] bg-gray-100 my-1" />
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-black text-blue-600 uppercase">মোট ফি</span>
                                <span className="text-xl font-black text-gray-900 tracking-tighter">৳ {totalFee || 0}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Reference Card */}
                    <Card className="rounded-[2rem] border-none shadow-lg shadow-blue-50/50">
                        <CardContent className="p-6">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                                <ShieldCheck size={14} className="text-emerald-500" /> অর্ডার দাতা (User)
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                                    <User size={14} className="text-gray-400" /> {reference?.username || "---"}
                                </div>
                                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                                    <Phone size={14} className="text-gray-400" /> {reference?.phone || "---"}
                                </div>
                                <div className="inline-block px-2 py-1 bg-gray-100 rounded-lg text-[9px] font-black uppercase text-gray-500">
                                    Role: {reference?.role || "user"}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* 📝 Right Column: Full Student Profile Info */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="rounded-[2.5rem] border-none shadow-lg shadow-blue-50/50">
                        <CardContent className="p-8">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xs font-black uppercase tracking-widest text-blue-600 flex items-center gap-2">
                                    <LayoutDashboard size={18} /> শিক্ষার্থীর তথ্য ও সার্ভিস
                                </h3>
                                <span className="text-[10px] font-bold text-gray-400">অর্ডার তারিখ: {new Date(data.createdAt).toLocaleDateString('bn-BD')}</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Service Info Item */}
                                <div className="md:col-span-2 p-5 bg-blue-50/50 border border-blue-100 rounded-[2rem] mb-2">
                                    <p className="text-[9px] text-blue-500 font-black uppercase mb-1">আবেদনকৃত সেবা</p>
                                    <h4 className="text-lg font-black text-blue-900 tracking-tight leading-tight uppercase">
                                        {serviceId?.title}
                                    </h4>
                                </div>

                                {/* Information Items Map */}
                                {[
                                    { label: "ডিপার্টমেন্ট", value: profileId?.department, icon: <BookOpen size={16} /> },
                                    { label: "সেশন", value: profileId?.session, icon: <Calendar size={16} /> },
                                    { label: "রোল (Class Roll)", value: profileId?.classRoll, icon: <Hash size={16} /> },
                                    { label: "প্রোগ্রাম", value: profileId?.program, icon: <GraduationCap size={16} /> },
                                    { label: "যোগাযোগ", value: profileId?.contactNumber ? `0${profileId.contactNumber}` : "---", icon: <Phone size={16} /> },
                                    { label: "ঐচ্ছিক বিষয়", value: profileId?.electiveSubject, icon: <FileText size={16} /> },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                                        <div className="p-2 bg-white rounded-xl text-blue-500 shadow-sm">{item.icon}</div>
                                        <div>
                                            <p className="text-[9px] text-gray-400 font-black uppercase leading-none mb-1">{item.label}</p>
                                            <p className="text-sm font-bold text-gray-700">{item.value || "---"}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Improvement Section */}
                            {profileId?.hasImprovement && (
                                <div className="mt-6 p-5 bg-rose-50 rounded-[2rem] border border-rose-100">
                                    <p className="text-[10px] font-black text-rose-600 uppercase mb-3 flex items-center gap-2 underline">
                                        ⚠️ মানোন্নয়নের বিষয়সমূহ
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {profileId?.improvementSubjects?.map((s, i) => (
                                            <span key={i} className="bg-white px-3 py-1.5 rounded-xl text-xs font-bold text-rose-700 shadow-sm border border-rose-100">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Documents Display */}
                    <Card className="rounded-[2.5rem] border-none shadow-lg shadow-blue-50/50">
                        <CardContent className="p-8">
                            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                                <FileText size={18} /> সংযুক্ত ডকুমেন্টস (Documents)
                            </h3>

                            {profileId?.documents?.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {profileId.documents.map((doc, index) => (
                                        <div key={index} className="rounded-2xl border-2 border-gray-50 overflow-hidden shadow-sm">
                                            <DocumentImage images={doc} alt={`Doc ${index + 1}`} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className='p-8 border-2 border-dashed border-gray-100 bg-gray-50/50 rounded-[2rem] text-center'>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                        কোনো ডকুমেন্ট আপলোড করা হয়নি
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}