"use client";
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import DeleteButton from '../components/DeleteButton';
import { studentAccountDelete } from '@/constans';

export default function StudentListTable({ data }) {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        setStudents(data);
    }, [data]);

    const columns = [
        {
            name: "Name",
            selector: row => row.username,
            sortable: true,
            wrap: true,
        },

        {
            name: "Phone",
            selector: row => row.phone,
            sortable: true,
        },
        {
            name: "delete",
            selector: row => <DeleteButton deleteApi={studentAccountDelete + row._id} />
        }

    ];

    return (
        <div className=" w-full md:w-[80%] mx-auto p-4">
            <DataTable
                title="🎓 ছাত্র/ছাত্রী তালিকা"
                columns={columns}
                data={students}
                pagination
                highlightOnHover
                striped
                responsive 
            />
        </div>
    );
}
