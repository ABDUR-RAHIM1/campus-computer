"use client";
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component'; 
import { demoProfilePicture } from '@/constans';

export default function StudentListTable({ data }) {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        setStudents(data);
    }, [data]);

    const columns = [
        {
            name: "Photo",
            selector: row => (
                <img
                    src={row.profilePicture || demoProfilePicture}
                    alt={row.username}
                    className="w-12 h-12 my-4 rounded-full border"
                />
            ),
            width: '80px',
        },
        {
            name: "Name",
            selector: row => row.username,
            sortable: true,
            wrap: true,
        },
        {
            name: "Email",
            selector: row => row.email,
            sortable: true,
            wrap: true,
            width: "220px"
        },
        {
            name: "Phone",
            selector: row => row.phone,
            sortable: true,
        },
        {
            name: "Session",
            selector: row => row.session,
            sortable: true,
            width: "100px"
        },
        {
            name: "Department",
            selector: row => row.department,
            sortable: true,
            wrap: true,
            width: "250px"
        },
        {
            name: "Gender",
            selector: row => row.gender,
            sortable: true,
            width: '100px',
            width: "100px"
        },
        {
            name: "Status",
            selector: row => (
                <span className={`text-xs font-semibold px-2 py-1 rounded-full
                    ${row.hasImprovement ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                    {row.hasImprovement ? "Improvement" : "Regular"}
                </span>
            ),
            sortable: true,
            width: '150px',
        },
  
    ];

    return (
        <div className="max-w-7xl mx-auto p-4">
            <DataTable
                title="🎓 ছাত্র/ছাত্রী তালিকা"
                columns={columns}
                data={students}
                pagination
                highlightOnHover
                striped
                responsive
                persistTableHead
                defaultSortFieldId={1}
            />
        </div>
    );
}
