"use client"
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { format } from 'date-fns';

export default function PaymentTable({ paymentData }) {

    const [payment, setPayment] = useState([]);

    useEffect(() => {
        setPayment(paymentData)
    }, [paymentData])

    const columns = [
        {
            name: "Account Name",
            selector: row => row?.userId?.username, 
            sortable: true,
        },
        {
            name: "Profile Name",
            selector: row => row.profileId?.studentName, 
            sortable: true,
        },
        {
            name: "Txn ID",
            selector: row => row.txnId,
            sortable: true,
        },
        {
            name: "Sender Number",
            selector: row => row.senderNumber,
            sortable: true,
        },
        {
            name: "Amount (৳)",
            selector: row => `৳${row.amount}`,
            sortable: true,
        },
        {
            name: "Method",
            selector: row => row.method,
            sortable: true,
        },
        {
            name: "Status",
            cell: row => (
                <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${row.verified ? "bg-green-100 text-green-700" :
                            "bg-yellow-100 text-yellow-700"}`}
                >
                    {row.verified ? "Paid" : "Pending"}
                </span>
            ),
            sortable: true,
        },
        {
            name: "Date",
            selector: row => {
                if (!row.createdAt) return "N/A";
                try {
                    return format(new Date(row.createdAt), "dd MMM yyyy, hh:mm a");
                } catch {
                    return "Invalid Date";
                }
            },
            sortable: true,
        }

    ];

    return (
        <div className="p-4">
            <DataTable
                title="📄 Payment Records"
                columns={columns}
                data={payment}
                pagination
                highlightOnHover
                striped
                responsive
            />
        </div>
    );
}
