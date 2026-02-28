import DataNotFound from '@/components/DataNotFound';
import { getAllServices } from '@/handlers/services';
import { Plus, Wrench, Layers } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import ServicesTable from './ServicesTable'; 
import AddServicePage from './add/page';

export default async function Services() {
    const { status, data } = await getAllServices();

    // এরর হ্যান্ডেলিং (রিটার্ন স্টেটমেন্ট ঠিক করা হয়েছে)
    if (status !== 200 || !data) {
        return <DataNotFound text={data?.message || "সার্ভিস ডাটা লোড করা সম্ভব হয়নি"} />;
    }

    return (
        <div className="p-6 space-y-6 w-full min-h-screen bg-[#FBFCFE]">

            {/* 🔝 হেডার সেকশন: টাইটেল ও অ্যাড বাটন */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm shadow-blue-50/50">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                        <Layers size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">সকল সার্ভিস</h1>
                        <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">মোট সার্ভিস: {data?.length || 0}</p>
                    </div>
                </div>

                {/* <Link
                    href="/dashboard/services/add"
                    className="flex items-center gap-2 font-black text-[11px] uppercase tracking-widest py-3 px-6 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0"
                >
                    সার্ভিস যুক্ত করুন
                    <Plus size={18} strokeWidth={3} />
                </Link> */}
                <AddServicePage/>
            </div>

            {/* 📊 সার্ভিসের মেইন বডি (টেবিল সেকশন) */}
            <div className="bg-white rounded-[2.5rem] p-4 shadow-xl shadow-blue-50/50 border border-gray-50 min-h-[500px]">
                <div className="p-4 border-b border-gray-50 mb-4 flex items-center gap-2">
                    <Wrench size={16} className="text-gray-400" />
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">সার্ভিস ম্যানেজমেন্ট টেবিল</span>
                </div>

                {/* আপনার টেবিল কম্পোনেন্ট */}
                <ServicesTable data={data} />
            </div>

        </div>
    );
}