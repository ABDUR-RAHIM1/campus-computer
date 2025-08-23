"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function SubAdminsList({ data }) {
    const [subAdmins, setSubAdmins] = useState([]);

    useEffect(() => {
        setSubAdmins(data || []);
    }, [data]);

    const handleStatusChange = (id, status) => {
        setSubAdmins((prev) =>
            prev.map((admin) =>
                admin._id === id ? { ...admin, status } : admin
            )
        );
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this Sub Admin?")) {
            setSubAdmins((prev) => prev.filter((admin) => admin._id !== id));
            // Backend delete API call এখানে করা যেতে পারে
        }
    };

    const columns = [
        {
            name: "Username",
            selector: (row) => row.username,
            sortable: true,
            width: "250px"
        },
        {
            name: "Phone",
            selector: (row) => row.phone,
            sortable: true,
        },
        {
            name: "Address",
            selector: (row) => row.address || "-",
        },
        {
            name: "Description",
            selector: (row) => row.description || "-",
            wrap: true,
        },
        {
            name: "Photo",
            cell: (row) =>
                row.photo ? (
                    <Image
                        width={50}
                        height={50}
                        src={row.photo}
                        alt={row.username}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                ) : (
                    "-"
                ),
        },
        {
            name: "Status",
            cell: (row) => (
                <select
                    value={row.status || "Active"}
                    onChange={(e) => handleStatusChange(row._id, e.target.value)}
                    className="border rounded px-2 py-1"
                >
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                </select>
            ),
        },
        {
            name: "Actions",
            cell: (row) => (
                <button
                    onClick={() => handleDelete(row._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                    Delete
                </button>
            ),
        },
    ];

    return (
        <div className="my-10 px-5">
            <DataTable
                columns={columns}
                data={subAdmins}
                pagination
                highlightOnHover
                striped
                responsive
                noHeader
            />
        </div>
    );
}
