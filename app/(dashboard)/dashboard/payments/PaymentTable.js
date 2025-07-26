"use client"
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

export default function PaymentTable({ paymentData }) {

    const [payment, setPayment] = useState([]);

    useEffect(() => {
        setPayment(paymentData)
    }, [paymentData])

    const columns = [
        {
            name: "Name",
            selector: row => row.name,
            sortable: true,
        },
        {
            name: "Email",
            selector: row => row.email,
            sortable: true,
        },
        {
            name: "Amount (৳)",
            selector: row => `৳${row.amount}`,
            sortable: true,
        },
        {
            name: "Status",
            cell: row => (
                <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold
          ${row.status === "Paid" ? "bg-green-100 text-green-700" :
                            row.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                                "bg-red-100 text-red-700"}`}
                >
                    {row.status}
                </span>
            ),
            sortable: true,
        },
        {
            name: "Date",
            selector: row => row.date,
            sortable: true,
        },
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
