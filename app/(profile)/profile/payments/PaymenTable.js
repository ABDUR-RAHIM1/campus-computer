"use client"

import React, { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { format } from "date-fns"

export default function PaymentTable({ paymentData = [] }) {
    const [payment, setPayment] = useState([])

    useEffect(() => {
        setPayment(paymentData)
    }, [paymentData])

    return (
        <div className="p-4 my-10 mx-3 bg-white rounded-xl shadow-sm border">
            <h2 className="text-lg font-semibold mb-3">📄 Payment Records</h2>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-100">
                            <TableHead>Txn ID</TableHead>
                            <TableHead>Sender Number</TableHead>
                            <TableHead>Total Due (৳)</TableHead>
                            <TableHead>Paid Amount (৳)</TableHead>
                            <TableHead>Diffirent (৳)</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Account Name</TableHead>
                            <TableHead>Profile Name</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {payment.length > 0 ? (
                            payment.map((row, index) => (
                                <TableRow
                                    key={index}
                                    className="hover:bg-gray-50 transition-colors"
                                >

                                    <TableCell>{row?.txnId || "N/A"}</TableCell>
                                    <TableCell>{row?.senderNumber || "N/A"}</TableCell>
                                    <TableCell>৳{row?.orderId?.totalFee || 0}</TableCell>
                                    <TableCell>৳{row?.amount || 0}</TableCell>
                                    <TableCell
                                        className={`
                                                font-semibold
                                               ${Number(row?.amount) < Number(row?.orderId?.totalFee)
                                                ? "text-red-600"      
                                                : Number(row?.amount) > Number(row?.orderId?.totalFee)
                                                    ? "text-yellow-600"   
                                                    : "text-green-600"     
                                            }
  `}
                                    >
                                        ৳{(Number(row?.orderId?.totalFee) - Number(row?.amount))}
                                    </TableCell>
                                    <TableCell>{row?.method || "N/A"}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${row?.verified
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {row?.verified ? "Paid" : "Pending"}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {row?.createdAt
                                            ? (() => {
                                                try {
                                                    return format(
                                                        new Date(row.createdAt),
                                                        "dd MMM yyyy, hh:mm a"
                                                    )
                                                } catch {
                                                    return "Invalid Date"
                                                }
                                            })()
                                            : "N/A"}
                                    </TableCell>
                                    <TableCell>{row?.userId?.username || "N/A"}</TableCell>
                                    <TableCell>{row?.profileId?.studentName || "N/A"}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan="8" className="text-center py-6 text-gray-500">
                                    No payments found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
