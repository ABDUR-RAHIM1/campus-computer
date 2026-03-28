"use client"

import React, { useContext, useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { paymentInfoStatusUpdate } from "@/constans"
import { PostActionAdmin } from "@/actions/admins/PostAction"
import { globalContext } from "@/contextApi/ContextApi"

export default function PaymentTable({ isAdmin = false, paymentData = [] }) {
    const { showToast } = useContext(globalContext);
    const [payment, setPayment] = useState([])

    useEffect(() => {
        setPayment(paymentData)
    }, [paymentData]);

    console.log(payment)

    // only for admin
    const handlePaymentStatusUpdate = async (paymentId, value) => {
        try {


            const payload = {
                method: "PUT",
                endpoint: paymentInfoStatusUpdate + paymentId,
                body: { verified: value === "true" }
            }
            const { status, data } = await PostActionAdmin(payload)
            showToast(status, data);

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="p-5 my-10 mx-3 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    💳 পেমেন্ট রেকর্ডস
                </h2>
                <span className="text-xs bg-slate-100 px-3 py-1 rounded-full font-medium text-slate-500">
                    Total: {payment.length}
                </span>
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                            <TableHead className="font-bold text-slate-700">লেনদেন তথ্য (Txn & Method)</TableHead>
                            <TableHead className="font-bold text-slate-700">শিক্ষার্থী ও প্রোফাইল</TableHead>
                            <TableHead className="font-bold text-slate-700">টাকার হিসাব (Due/Paid)</TableHead>
                            <TableHead className="font-bold text-slate-700 text-center">অবস্থা (Status)</TableHead>
                            <TableHead className="font-bold text-slate-700 text-right">তারিখ ও সময়</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {payment.length > 0 ? (
                            payment.map((row, index) => {
                                const due = Number(row?.orderId?.calculatedTotal || 0);
                                const paid = Number(row?.amount || 0);
                                const diff = due - paid;

                                return (
                                    <TableRow key={index} className="hover:bg-blue-50/30 transition-colors border-b border-slate-50">

                                        {/* ১. লেনদেন তথ্য (Txn ID & Method) */}
                                        <TableCell>
                                            <div className="font-bold text-slate-900 select-all">{row?.txnId || "N/A"}</div>
                                            <div className="text-[11px] flex items-center gap-1 mt-1 font-semibold text-blue-600 uppercase">
                                                <span className="bg-blue-100 px-1.5 py-0.5 rounded text-[10px]">{row?.method}</span>
                                                <span>{row?.senderNumber}</span>
                                            </div>
                                        </TableCell>

                                        {/* ২. প্রোফাইল ও অ্যাকাউন্ট */}
                                        <TableCell>
                                            <div className="font-bold text-slate-800">{row?.profileId?.studentName || "N/A"}</div>
                                            <div className="text-xs text-slate-500 italic">Acc: {row?.userId?.username || "N/A"}</div>
                                        </TableCell>

                                        {/* ৩. টাকার হিসাব (Stacked) */}
                                        <TableCell>
                                            <div className="text-xs text-slate-500">মোট: ৳{due} | জমা: <span className="text-green-600 font-bold">৳{paid}</span></div>
                                            <div className={`text-[11px] mt-1 font-black ${diff > 0 ? "text-red-500" : diff < 0 ? "text-orange-500" : "text-green-600"}`}>
                                                {diff === 0 ? "✅ পরিশোধিত" : diff > 0 ? `⚠️ বাকি: ৳${diff}` : `💰 অতিরিক্ত: ৳${Math.abs(diff)}`}
                                            </div>
                                        </TableCell>

                                        {/* ৪. স্ট্যাটাস */}
                                        <TableCell className="text-center">
                                            {
                                                !isAdmin ?
                                                    (
                                                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm border ${row?.verified
                                                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                                            : "bg-amber-50 text-amber-700 border-amber-100"
                                                            }`}>
                                                            {row?.verified ? "Verified" : "Pending"}
                                                        </span>
                                                    )
                                                    :
                                                    (
                                                        <Select
                                                            defaultValue={row?.verified ? "true" : "false"}
                                                            onValueChange={(value) => handlePaymentStatusUpdate(row?._id, value)}
                                                        >
                                                            <SelectTrigger
                                                                className={`w-[130px] h-8 text-[10px] font-black uppercase tracking-wider border-none shadow-sm transition-all rounded-xl focus:ring-0 ${row?.verified
                                                                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                                                                    : "bg-amber-500 text-white hover:bg-amber-600"
                                                                    }`}
                                                            >
                                                                <SelectValue />
                                                            </SelectTrigger>

                                                            <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                                                                <SelectItem value="true" className="text-emerald-600 font-bold focus:bg-emerald-50 focus:text-emerald-700">
                                                                    ✅ Verified
                                                                </SelectItem>
                                                                <SelectItem value="false" className="text-amber-600 font-bold focus:bg-amber-50 focus:text-amber-700">
                                                                    ⏳ Pending
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    )
                                            }
                                        </TableCell>

                                        {/* ৫. তারিখ */}
                                        <TableCell className="text-right">
                                            <div className="text-sm font-medium text-slate-700">
                                                {row?.createdAt ? format(new Date(row.createdAt), "dd MMM, yyyy") : "N/A"}
                                            </div>
                                            <div className="text-[10px] text-slate-400">
                                                {row?.createdAt ? format(new Date(row.createdAt), "hh:mm a") : ""}
                                            </div>
                                        </TableCell>

                                    </TableRow>
                                )
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan="5" className="text-center py-12 text-slate-400 italic">
                                    কোনো পেমেন্ট রেকর্ড খুঁজে পাওয়া যায়নি।
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}