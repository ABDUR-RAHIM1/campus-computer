"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DeleteButton from "../components/DeleteButton";
import { demoProfilePicture, jobProfilePutDelete } from "@/constans";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

//  user account and his profiles list
export default function JobProfileTable({ data }) {
    const [jobProfiles, setJobProfiles] = useState([]);

    useEffect(() => {
        setJobProfiles(data);
    }, [data]);

    const columns = [
        {
            name: "প্রোফাইল",
            selector: (row) =>
                <Image
                    width={50}
                    height={50}
                    src={row.photo || demoProfilePicture}
                    alt="Job Profile"
                    className="w-10 h-10 rounded-full my-2"
                />,
            width: "80px",
        },
        {
            name: "নাম (বাংলা)",
            selector: (row) => row.nameBn || "N/A",
            sortable: true,
            wrap: true,
        },

        {
            name: "পিতার নাম",
            selector: (row) => row.fatherNameBn || "N/A",
            wrap: true,
        },
        {
            name: "মাতার নাম",
            selector: (row) => row.motherNameBn || "N/A",
            wrap: true,
        },
        {
            name: "জন্ম তারিখ",
            selector: (row) => row.dob || "N/A",
            sortable: true,
        },
        {
            name: "ধর্ম",
            selector: (row) => row.religion || "N/A",
            wrap: true,
        },
        {
            name: "লিঙ্গ",
            selector: (row) => row.gender || "N/A",
            wrap: true,
        },
        {
            name: "Birth No.",
            selector: (row) => row.birthNumber || "N/A",
            wrap: true,
        },
        {
            name: "NID",
            selector: (row) => row.nidNumber || "N/A",
            wrap: true,
        },

        {
            name: "বৈবাহিক অবস্থা",
            selector: (row) => row.matarialStatus || "N/A",
            wrap: true,
        },
        {
            name: "মোবাইল",
            selector: (row) => row.mobileNumber || "N/A",
            wrap: true,
        },
        {
            name: "বিস্তারিত",
            selector: (row) => <Button asChild className={" rounded-full text-[12px] bg-blue-500 cursor-pointer"}>
                <Link href={`/dashboard/jobs-profile/details/${row._id}`}>

                    বিস্তারিত
                </Link>
            </Button>,
            width: "120px"
        },
        {
            name: "Delete",
            cell: (row) => (
                <DeleteButton deleteApi={jobProfilePutDelete + row._id} />
            ),
            ignoreRowClick: true,

        },

    ];


    return (
        <div className="w-full md:w-[90%] mx-auto p-4">
            <DataTable
                title="🎓 জব প্রোফাইল তালিকা"
                columns={columns}
                data={jobProfiles}
                pagination
                highlightOnHover
                striped
                responsive
            />
        </div>
    );
}
