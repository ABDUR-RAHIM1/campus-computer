"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DeleteButton from "../components/DeleteButton";
import { demoProfilePicture, studentProfileUpdateDelete } from "@/constans";
import Image from "next/image";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

//  user account and his profiles list
export default function StudentListTable({ data }) {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        setStudents(data);
    }, [data]);

    const columns = [
        {
            name: "প্রোফাইল",
            selector: (row) =>
                <Image
                    priority
                    width={50}
                    height={50}
                    src={row.profilePicture || demoProfilePicture}
                    alt="Profile"
                    className="w-10 h-10 rounded-full my-5"
                />,
            width: "80px",
        },
        {
            name: "নাম",
            selector: (row) => (
                <div>
                    {row.studentName ||
                        row?.studentId?.username ||
                        "নাম নেই"}
                    {row.isOtherStudent && row?.studentId?.username ? (
                        <span className="text-xs text-gray-500 ml-1">
                            ({row.studentId.username} এর সাব-প্রোফাইল)
                        </span>
                    ) : null}
                </div>
            ),
            sortable: true,
            wrap: true,
        },
        {
            name: "ফোন",
            selector: (row) =>
                row?.studentId?.phone,
            sortable: true,
        },
        {
            name: "প্রোগ্রাম",
            selector: (row) => row.program || "N/A",
            sortable: true,
        },
        {
            name: "ডিপার্টমেন্ট",
            selector: (row) => row.department || "N/A",
            wrap: true,
        },
        {
            name: "বিস্তারিত",
            cell: (row) => (
                <Button asChild className={"bg-blue-500 text-white cursor-pointer"}>
                    <Link href={`/dashboard/student-list/details/${row._id}`}>
                        <Eye />
                    </Link>
                </Button>
            ),
            ignoreRowClick: true,
            // allowOverflow: true,

        },
        {
            name: "ডিলিট",
            cell: (row) => (
                <DeleteButton deleteApi={studentProfileUpdateDelete + row._id} />
            ),
            ignoreRowClick: true,
            // allowOverflow: true,

        },
    ];

    return (
        <div className="w-full md:w-[90%] mx-auto p-4">
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
