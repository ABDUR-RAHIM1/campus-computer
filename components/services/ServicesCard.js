"use client";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { globalContext } from "@/contextApi/ContextApi";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger, 
} from "@/components/ui/tooltip";
import { GraduationCap, Building2, FileText, ArrowRightCircle, Info, Paperclip } from "lucide-react";
import { rocketBillerChargeCalculate } from "@/app/(profile)/profile/create-order/CashoutChargeCalculator";

export default function ServicesCard({ servicesData }) {
    const router = useRouter();
    const pathName = usePathname();
    const { setServiceData } = useContext(globalContext);

    const colors = [
        { bg: "from-blue-50 to-blue-100", border: "border-blue-200", text: "text-blue-700", accent: "bg-blue-600" },
        { bg: "from-emerald-50 to-emerald-100", border: "border-emerald-200", text: "text-emerald-700", accent: "bg-emerald-600" },
        { bg: "from-violet-50 to-violet-100", border: "border-violet-200", text: "text-violet-700", accent: "bg-violet-600" },
        { bg: "from-amber-50 to-amber-100", border: "border-amber-200", text: "text-amber-700", accent: "bg-amber-600" },
    ];

    const handleNavigateToOrder = (data) => {
        if (pathName.startsWith("/profile")) {
            setServiceData(data);
            router.push("/profile/create-order");
        } else {
            router.push("/profile");
        }
    };

    return (
        <TooltipProvider>
            {servicesData.map((service, index) => {
                const color = colors[index % colors.length];

                return (
                    <div
                        key={service._id}
                        className={`block bg-gradient-to-br ${color.bg} border-2 ${color.border} rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 mb-6`}
                    >
                        {/* Header Section */}
                        <div className="flex flex-col items-start gap-3 mb-5">
                            <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${service.type !== "improvement_form_fillup" ? "bg-green-600 text-white" : "bg-red-500 text-white"}`}>
                                {service.type}
                            </div>

                            <div className="space-y-1">
                                <h4 className={`text-xl font-black ${color.text} flex items-start gap-2 leading-tight`}>
                                    <FileText size={26} className="shrink-0 mt-1" />
                                    {service.title}
                                </h4>
                                <p className="text-gray-600 text-sm font-medium leading-relaxed pl-1">
                                    {service.description}
                                </p>
                            </div>
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
                        {/* 💰 Fees Table Section */}
                        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm mb-5">
                            <div className="bg-gray-50 px-4 py-2 flex justify-between items-center border-b border-gray-100">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">বিভাগ ভিত্তিক ফি</span>
                                <span className="text-[10px] font-black text-blue-600 uppercase flex items-center gap-1">
                                    মোট ফি (বিস্তারিত <Info size={10} />)
                                </span>
                            </div>
                            <Table>
                                <TableBody>
                                    {service?.departmentFees?.map((item, i) => (
                                        <TableRow key={i} className="hover:bg-gray-50/50 border-gray-50">
                                            <TableCell className="py-2.5 text-xs font-bold text-gray-700">{item.department}</TableCell>
                                            <TableCell className="py-2.5 text-xs font-black text-right">
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <span className="text-blue-700 cursor-help border-b border-dashed border-blue-300 pb-0.5">
                                                            ৳{item.collegeFee + item.subjectFee}
                                                        </span>
                                                    </TooltipTrigger>
                                                    <TooltipContent className="bg-white p-4 rounded-xl border shadow-2xl w-64">
                                                        <div className="space-y-2">
                                                            <p className="text-xs font-black text-gray-800 border-b pb-2 mb-2 uppercase tracking-widest text-center">ফি ব্রেকডাউন</p>
                                                            <div className="flex justify-between text-xs text-gray-600">
                                                                <span>কলেজ ফি:</span>
                                                                <span className="font-bold font-sans">৳{item.collegeFee || 0}</span>
                                                            </div>
                                                            <div className="flex justify-between text-xs text-gray-600">
                                                                <span>সাবজেক্ট ফি:</span>
                                                                <span className="font-bold font-sans">৳{item.subjectFee || 0}</span>
                                                            </div>
                                                            <div className="flex justify-between text-xs text-blue-600 bg-blue-50/50 p-1 rounded">
                                                                <span className="font-medium">সার্ভিস চার্জ:</span>
                                                                <span className="font-black font-sans">৳{item.chargeFee || 0}</span>
                                                            </div>
                                                            <div className="flex justify-between text-xs text-blue-600 bg-blue-50/50 p-1 rounded">
                                                                <span className="font-medium">Biller চার্জ (রকেট):</span>
                                                                <span className="font-black font-sans">৳{rocketBillerChargeCalculate(item.totalFee || 0)}</span>
                                                            </div>
                                                            <div className="border-t pt-2 flex justify-between text-sm font-black text-gray-800">
                                                                <span> সর্বমোট প্রদেয়:</span>
                                                                <span className="font-sans">৳{item.totalFee + rocketBillerChargeCalculate(item.totalFee || 0)}</span>
                                                            </div>
                                                            <p className="text-[9px] text-gray-400 italic mt-2 text-center leading-tight">
                                                                * রকেট ছাড়া অন্য কোন মেথড ব্যবহার করে টাকা পাঠালে ক্যাশ আউট চার্জ অতিরিক্ত দিতে হবে।
                                                            </p>
                                                        </div>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {/* 🖇️ Required Documents (ফিরিয়ে আনা হয়েছে) */}
                        {service.requiredDocuments?.length > 0 && (
                            <div className="mb-6 px-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1">
                                    <Paperclip size={12} /> প্রয়োজনীয় ডকুমেন্ট
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {service.requiredDocuments.map((doc, i) => (
                                        <span key={i} className="bg-white/60 border border-white text-[10px] font-bold px-3 py-1.5 rounded-xl text-gray-600 shadow-sm italic">
                                            #{doc}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}


                        {/* Action Button */}
                        <Button
                            onClick={() => handleNavigateToOrder(service)}
                            className={`w-full py-8 rounded-[1.5rem] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all ${color.accent} hover:opacity-90 text-white shadow-xl shadow-gray-200 active:scale-[0.97]`}
                        >
                            আবেদন শুরু করুন <ArrowRightCircle size={20} />
                        </Button>
                    </div>
                );
            })}
        </TooltipProvider>
    );
}