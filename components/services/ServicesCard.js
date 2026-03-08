"use client";
import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { GraduationCap, Building2, FileText, Info, Paperclip } from "lucide-react";
import ApplyButton from "./ApplyButton";
import { rocketBillerChargeCalculate } from "@/app/(profile)/profile/create-order/CashoutChargeCalculator";
import { feeCalculation } from "@/utilities/FeeCalculation";

export default function ServicesCard({ servicesData }) {

    // রকেট বিলার চার্জ ক্যালকুলেশন (আপনার লজিক অনুযায়ী)
    // const rocketBillerChargeCalculate = (amount) => {
    //     if (!amount) return 0;
    //     // উদাহরণ: প্রতি হাজারে ১০ টাকা বা ১% (আপনার ফাংশনটি এখানে রিপ্লেস করুন)
    //     return Math.ceil(amount * 0.01);
    // };

    const colors = [
        { bg: "from-blue-50 to-blue-100", border: "border-blue-200", text: "text-blue-700", accent: "bg-blue-600" },
        { bg: "from-emerald-50 to-emerald-100", border: "border-emerald-200", text: "text-emerald-700", accent: "bg-emerald-600" },
        { bg: "from-violet-50 to-violet-100", border: "border-violet-200", text: "text-violet-700", accent: "bg-violet-600" },
        { bg: "from-amber-50 to-amber-100", border: "border-amber-200", text: "text-amber-700", accent: "bg-amber-600" },
    ];


    return (
        <>
            {servicesData.map((service, index) => {
                const color = colors[index % colors.length];

                return (
                    <div key={service._id} className={`block bg-gradient-to-br ${color.bg} border-2 ${color.border} rounded-[2rem] p-6 mb-6 shadow-sm transition-all`}>

                        {/* Header Section */}
                        <div className="flex flex-col items-start gap-3 mb-5">
                            <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${service.type !== "improvement_form_fillup" ? "bg-green-600 text-white" : "bg-red-500 text-white"}`}>
                                {service.type}
                            </div>
                            <h4 className={`text-xl font-black ${color.text} flex items-start gap-2 leading-tight`}>
                                <FileText size={24} className="shrink-0 mt-1" /> {service.title}
                            </h4>
                        </div>
                        {/* Meta Info Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="bg-white/60 p-3 rounded-2xl border border-white/50 flex items-center gap-2">
                                <GraduationCap size={16} className="text-gray-400" />
                                <p className="text-xs font-bold text-gray-700">{service.program?.toUpperCase()}</p>
                            </div>
                            <div title={service?.institute?.username || "N/A"} className="bg-white/60 p-3 rounded-2xl border border-white/50 flex items-center gap-2 overflow-hidden">
                                <Building2 size={16} className="text-gray-400 shrink-0" />
                                <p className="text-xs font-bold text-gray-700 truncate">{service?.institute?.username || "N/A"}</p>
                            </div>
                        </div>

                        {/*  short Description */}
                        <div className="my-3 border-b">
                            <p className=" italic text-sm">{service?.description || "N/A"}</p>
                        </div>
                        {/*  short Description */}

                        {/* 💰 Fees Table with Clickable Popover */}
                        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm mb-5">
                            <div className="bg-gray-50 px-4 py-2 flex justify-between items-center border-b border-gray-100">
                                <span className="text-[10px] font-black text-gray-400 uppercase">বিভাগ ভিত্তিক ফি</span>
                                <span className="text-[10px] font-black text-blue-600 uppercase">মোট ফি (ট্যাপ করুন <Info size={10} className="inline" />)</span>
                            </div>
                            <Table>
                                <TableBody>
                                    {service?.departmentFees?.map((item, i) => {
                                        const mainFee = (item.collegeFee || 0) + (item.subjectFee || 0);
                                        const processingFee = item.processingFee || 0;
                                        const serviceCharge = item.chargeFee || 0;

                                        const { subTotal, rocketBillerCharge, totalFee } = feeCalculation(mainFee, processingFee, serviceCharge);

                                        return (
                                            <TableRow key={i} className="border-gray-50">
                                                <TableCell className="py-2.5 text-xs font-bold text-gray-700">{item.department}</TableCell>
                                                <TableCell className="py-2.5 text-xs font-black text-right">

                                                    {/* 📱 Popover for Mobile & Desktop */}
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <button className="text-blue-700 outline-none flex items-center gap-1 ml-auto active:scale-95 transition-transform border-b border-dashed border-blue-400 cursor-help">
                                                                ৳{mainFee} <Info size={14} className="text-blue-300" />
                                                            </button>
                                                        </PopoverTrigger>
                                                        <PopoverContent align="end" className="w-72 p-4 rounded-2xl shadow-2xl border-2 z-50">
                                                            <div className="space-y-3">
                                                                <p className="text-xs font-black text-gray-800 border-b pb-2 text-center uppercase tracking-widest">পেমেন্ট ব্রেকডাউন</p>

                                                                <div className="flex justify-between text-xs text-gray-500">
                                                                    <span>মূল ফি (নোটিশ অনুযায়ী):</span>
                                                                    <span className="font-bold">৳{mainFee}</span>
                                                                </div>

                                                                <div className="flex justify-between text-xs text-red-600 bg-red-50 p-2 rounded-lg font-bold">
                                                                    <span> Porcessing চার্জ (অফিস):</span>
                                                                    <span>৳{processingFee}</span>
                                                                </div>
                                                                <div className="flex justify-between text-xs text-blue-600 bg-blue-50 p-2 rounded-lg font-bold">
                                                                    <span>সার্ভিস চার্জ:</span>
                                                                    <span>৳{serviceCharge}</span>
                                                                </div>

                                                                <div className="flex justify-between text-xs text-amber-600 bg-amber-50 p-2 rounded-lg font-bold">
                                                                    <span>বিলার চার্জ (রকেট):</span>
                                                                    <span>৳{rocketBillerCharge}</span>
                                                                </div>
                                                                <div className="flex justify-between text-xs text-green-600 bg-green-50 p-2 rounded-lg font-bold">
                                                                    <span> সাব টোটাল:</span>
                                                                    <span>৳{subTotal}</span>
                                                                </div>

                                                                <div className="border-t-2 border-dashed pt-2 flex justify-between text-sm font-black text-gray-900">
                                                                    <span>সর্বমোট প্রদেয়:</span>
                                                                    <span className="text-emerald-600 text-lg">৳{totalFee}</span>
                                                                </div>

                                                                {
                                                                    service.type === "improvement_form_fillup" &&
                                                                    <p className="text-[9px] text-orange-500 italic text-center bg-orange-50 p-2 rounded-md">
                                                                        * পরবর্তী প্রতি সাবজেক্ট ৳ {item.subjectFee || 0}  মুল ফী-এর সাথে যুক্ত হবে।
                                                                    </p>
                                                                }
                                                                <p className="text-[9px] text-red-500 italic text-center bg-red-50 p-2 rounded-md">
                                                                    * রকেট ছাড়া অন্য মেথডে ক্যাশ আউট চার্জ প্রযোজ্য।
                                                                </p>

                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>

                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Documents & Action Button */}
                        {
                            service.requiredDocuments?.length > 0 && (
                                <div className="mb-6">
                                    <p className="text-[10px] font-black text-gray-400 uppercase mb-2 flex items-center gap-1">
                                        <Paperclip size={12} /> প্রয়োজনীয় ডকুমেন্ট
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {service.requiredDocuments.map((doc, i) => (
                                            <span key={i} className="bg-white/60 border border-white text-[10px] font-bold px-3 py-1.5 rounded-xl text-gray-600 italic">#{doc}</span>
                                        ))}
                                    </div>
                                </div>
                            )
                        }

                        <ApplyButton
                            serviceData={service}
                            color={color}
                        />
                    </div >
                );
            })}
        </>
    );
}