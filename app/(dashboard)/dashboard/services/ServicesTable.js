"use client"
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

export default function ServicesTable({ data }) {

    const [servicesData, setServicesData] = useState([]);

    useEffect(() => {
        setServicesData(data)
    }, [data]);


    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "50px"
        },
        {
            name: "title",
            selector: row => row.title,
            width: "200px",
            wrap: true
        },
        {
            name: "program",
            selector: row => row.program,
            width: "120px"
        },
        {
            name: "Session",
            selector: row => row.session,
            width: "140px"
        },
        {
            name: "Price",
            selector: row => row.fee
        },
        {
            name: "Update",
            selector: row => <Button className={" bg-blue-500 text-white"} >
                Update
            </Button>
        },
        {
            name: "Delete",
            selector: row => <Button className={" bg-red-500 text-white"} >
                Delete
            </Button>
        },
    ]

    return (
        <div className=' my-10'>
            <DataTable
                title={"Services List"}
                columns={columns}
                data={servicesData}
                pagination
                responsive
                highlightOnHover
            />
        </div>
    )
}
