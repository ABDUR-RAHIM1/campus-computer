"use client"
import { feeCalculation } from '@/utilities/FeeCalculation';
import React, { useEffect, useState } from 'react'
import { Wallet, BadgeCheck, Info, CheckCircle2, Circle, ShieldCheck } from 'lucide-react';

export default function AdmissionFees(props) {
    const { collegeFee, processingFee, serviceCharge } = props;

    // ১. সার্ভিস টাইপ স্টেট (Default: Full Service)
    const [orderType, setOrderType] = useState('full_service');
    const [fee, setFee] = useState({ subTotal: 0, rocketBillerCharge: 0, totalFee: 0 });

    // ২. বর্তমান সিলেকশন অনুযায়ী সার্ভিস চার্জ নির্ধারণ
    // Full Service হলে চার্জ ডাবল (x2), অন্যথায় (College Copy) বেস সার্ভিস চার্জ থাকবে।
    const currentServiceCharge = orderType === 'full_service' ? (serviceCharge * 2) : serviceCharge;

    useEffect(() => {
        const { subTotal, rocketBillerCharge, totalFee } = feeCalculation(collegeFee, processingFee, currentServiceCharge);
        setFee({ subTotal, rocketBillerCharge, totalFee })
    }, [collegeFee, processingFee, currentServiceCharge]);

    return (
        <div className="space-y-6 p-3 md:p-5">
            {/* --- অর্ডার কনফিগারেশন সেকশন --- */}
            <div className="bg-white rounded-3xl border border-blue-100 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-5">
                    <ShieldCheck className="text-blue-600" size={18} />
                    <h2 className="font-black text-gray-700 uppercase text-xs tracking-widest">অর্ডার টাইপ সিলেক্ট করুন</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Service Card */}
                    <div
                        onClick={() => setOrderType('full_service')}
                        className={`relative border-2 p-4 rounded-2xl cursor-pointer transition-all ${orderType === 'full_service'
                                ? 'border-blue-600 bg-blue-50/50 shadow-md'
                                : 'border-gray-100 hover:border-blue-100'
                            }`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className={`font-black text-sm ${orderType === 'full_service' ? 'text-blue-700' : 'text-gray-600'}`}>
                                Full Service (আমরা জমা দিব)
                            </span>
                            {orderType === 'full_service'
                                ? <CheckCircle2 size={18} className="text-blue-600" />
                                : <Circle size={18} className="text-gray-300" />
                            }
                        </div>
                        <p className={`text-[10px] leading-tight ${orderType === 'full_service' ? 'text-blue-600/80' : 'text-gray-400'}`}>
                            আমরা আপনার হয়ে সমস্ত কাগজপত্র কলেজে জমা দিয়ে আসব।
                        </p>
                    </div>

                    {/* College Copy Card */}
                    <div
                        onClick={() => setOrderType('college_copy')}
                        className={`relative border-2 p-4 rounded-2xl cursor-pointer transition-all ${orderType === 'college_copy'
                                ? 'border-blue-600 bg-blue-50/50 shadow-md'
                                : 'border-gray-100 hover:border-blue-100'
                            }`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className={`font-black text-sm ${orderType === 'college_copy' ? 'text-blue-700' : 'text-gray-600'}`}>
                                College Copy (অফিস কালেক্ট)
                            </span>
                            {orderType === 'college_copy'
                                ? <CheckCircle2 size={18} className="text-blue-600" />
                                : <Circle size={18} className="text-gray-300" />
                            }
                        </div>
                        <p className={`text-[10px] leading-tight ${orderType === 'college_copy' ? 'text-blue-600/80' : 'text-gray-400'}`}>
                            আবেদন রেডি থাকবে, আপনি অফিস থেকে নিয়ে নিজে জমা দিবেন।
                        </p>
                    </div>
                </div>

                {/* ফর্ম সাবমিশনের জন্য হিডেন ইনপুট */}
                <input type="hidden" name="orderType" value={orderType} />
            </div>

            {/* --- ফি সামারি সেকশন --- */}
            <div className="bg-white rounded-3xl border border-blue-100 shadow-sm overflow-hidden">
                <div className="bg-blue-50/50 px-5 py-3 border-b border-blue-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Wallet size={18} className="text-blue-600" />
                        <h3 className="font-bold text-blue-900 text-sm italic">ফি এর বিস্তারিত বিবরণ</h3>
                    </div>
                    <span className="text-[10px] font-black text-blue-500 bg-white px-2 py-0.5 rounded-full border border-blue-100">
                        {orderType === 'full_service' ? 'FULL' : 'COLLECT'}
                    </span>
                </div>

                <div className="p-5 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="flex flex-col p-3 rounded-2xl bg-gray-50 border border-gray-100">
                            <span className="text-[10px] uppercase font-bold text-gray-400">কলেজ ফি</span>
                            <span className="font-bold text-gray-700">{collegeFee || 0}৳</span>
                        </div>
                        <div className="flex flex-col p-3 rounded-2xl bg-gray-50 border border-gray-100">
                            <span className="text-[10px] uppercase font-bold text-gray-400">প্রসেসিং ফি</span>
                            <span className="font-bold text-gray-700">{processingFee || 0}৳</span>
                        </div>
                        <div className="flex flex-col p-3 rounded-2xl bg-blue-50/30 border border-blue-100">
                            <span className="text-[10px] uppercase font-bold text-blue-400">সার্ভিস চার্জ</span>
                            <span className="font-bold text-blue-600">{currentServiceCharge || 0}৳</span>
                        </div>
                    </div>

                    <hr className="border-dashed border-gray-200" />

                    <div className="space-y-2 px-1">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 font-medium">সাব-টোটাল:</span>
                            <span className="font-bold text-gray-700">{fee.subTotal}৳</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-1 text-gray-500">
                                <span>বিলার চার্জ (Rocket):</span>
                                <Info size={12} className="text-blue-400" />
                            </div>
                            <span className="font-bold text-blue-600">+{fee.rocketBillerCharge}৳</span>
                        </div>
                    </div>

                    <div className="mt-4 p-5 bg-blue-600 rounded-2xl flex items-center justify-between shadow-xl shadow-blue-100 transition-all">
                        <div className="flex items-center gap-2 text-white/90">
                            <BadgeCheck size={24} />
                            <div>
                                <span className="block font-bold text-[10px] uppercase tracking-wider leading-none">সর্বমোট ফি</span>
                                <span className="text-[9px] text-blue-100 italic">নির্ভুলভাবে হিসাবকৃত</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-3xl font-black text-white">{fee.totalFee}৳</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}