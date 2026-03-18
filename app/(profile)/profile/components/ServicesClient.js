"use client";

import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Tabs ইমপোর্ট করুন
import ServicesCard from "@/components/services/ServicesCard";
import { getAllSubAdmins } from "@/handlers/subAdmins";
import { SearchX, GraduationCap, LayoutGrid } from "lucide-react";
import AdmissionCard from "./AdmissionCard";

export default function ServicesClient({ data, admissionData, colsStyle }) {
    const [selectedInstitute, setSelectedInstitute] = useState("");
    const [institutes, setInstitutes] = useState([]);

    // জেনারেল সার্ভিস ফিল্টার
    const filteredServices = selectedInstitute
        ? data.filter(item => item.institute._id === selectedInstitute)
        : data;

    // অ্যাডমিশন সার্ভিস ফিল্টার (ধরে নিচ্ছি admissionData প্রপস হিসেবে আসছে)
    const filteredAdmissions = selectedInstitute
        ? admissionData.filter(item => item.institute === selectedInstitute)
        : admissionData;

    useEffect(() => {
        const getData = async () => {
            const { status, data } = await getAllSubAdmins();
            if (status === 200) {
                const formatedData = data.map((ins) => ({
                    label: ins.username,
                    value: ins._id
                }));
                setInstitutes(formatedData);
            }
        };
        getData();
    }, []);
 
    return (
        <div className="space-y-8 w-full">
            {/* Filter Section (আগের মতোই) */}
            <div className="w-full bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-3 md:p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-md">
                        <GraduationCap size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-blue-800">প্রতিষ্ঠানের কার্যক্রম দেখুন</h3>
                        <p className="text-sm text-blue-600">আপনার কলেজ নির্বাচন করে নির্দিষ্ট সার্ভিসগুলো খুঁজে নিন।</p>
                    </div>
                </div>

                <Select onValueChange={(value) => setSelectedInstitute(value)}>
                    <SelectTrigger className="w-full h-12 border-blue-300 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 text-base">
                        <SelectValue placeholder="🎓 আপনার কলেজ নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent className="max-h-64">
                        <SelectItem value="all">সব প্রতিষ্ঠান</SelectItem>
                        {institutes.map((inst, idx) => (
                            <SelectItem key={idx} value={inst.value}>{inst.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="services" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2 mb-8 h-12 bg-slate-100 p-1">
                    <TabsTrigger value="services" className="flex items-center gap-2 text-[15px]">
                        <LayoutGrid size={18} /> সাধারণ সার্ভিস
                    </TabsTrigger>
                    <TabsTrigger value="admissions" className="flex items-center gap-2 text-[15px]">
                        <GraduationCap size={18} /> নতুন ভর্তি কার্যক্রম
                    </TabsTrigger>
                </TabsList>

                {/* সাধারণ সার্ভিস কন্টেন্ট */}
                <TabsContent value="services">
                    {filteredServices?.length > 0 ? (
                        <div className={`grid ${colsStyle} gap-5`}>
                            <ServicesCard servicesData={filteredServices} />
                        </div>
                    ) : (
                        <NoDataMessage />
                    )}
                </TabsContent>

                {/* অ্যাডমিশন সার্ভিস কন্টেন্ট */}
                <TabsContent value="admissions">
                    {filteredAdmissions?.length > 0 ? (
                        <div className={`grid ${colsStyle} gap-5`}>
                            {/* এখানে AdmissionCard রেন্ডার করবেন */}
                            <AdmissionCard admissionData={filteredAdmissions} />
                        </div>
                    ) : (
                        <NoDataMessage text="বর্তমানে কোন ভর্তি কার্যক্রম চলমান নেই" />
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}

// আলাদা নো ডাটা কম্পোনেন্ট
function NoDataMessage({ text = "চলমান কোন কার্যক্রম নেই!" }) {
    return (
        <div className="p-16 border-2 border-dashed border-slate-200 rounded-3xl text-center flex flex-col items-center justify-center gap-4 text-slate-400">
            <SearchX size={60} strokeWidth={1.5} />
            <p className="text-xl font-medium">{text}</p>
        </div>
    );
}