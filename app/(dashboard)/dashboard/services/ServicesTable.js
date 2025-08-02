"use client"
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

export default function ServicesTable({ data }) {

    const [servicesData, setServicesData] = useState([]);

    useEffect(() => {
        setServicesData(data)
    }, [data]);


    const handleDelete = (id) => {
        try {
            console.log(id)
        } catch (error) {

        }
    }

    const columns = [
        {
            name: "#",
            cell: (row, index) => index + 1,
            width: "50px"
        },
        {
            name: "Title",
            selector: row => row.title,
            wrap: true,
            width: "250px"
        },
        {
            name: "Program",
            selector: row => row.program,
            width: "100px"
        },
        {
            name: "Session",
            selector: row => row.session,
            width: "120px"
        },
        {
            name: "Total Fee",
            selector: row =>
                row.departmentFees?.reduce((sum, item) => sum + item.fee, 0) ?? "N/A",
            width: "120px"
        },
        {
            name: "Update",
            cell: row => (
                <Button onClick={() => handleUpdate(row)} className="bg-blue-500 text-white">
                    Update
                </Button>
            ),
            width: "150px"
        },
        {
            name: "Delete",
            cell: row => (
                <Button onClick={() => handleDelete(row._id)} className="bg-red-500 text-white">
                    Delete
                </Button>
            ),
            width: "150px"
        }
    ];

    const FeeBreakdown = ({ data }) => {
        return (
            <div className="p-2">
                <h4 className="font-bold mb-2">Department-wise Fees</h4>
                <table className="w-full border border-gray-300 text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-1 text-left">Department</th>
                            <th className="border p-1 text-left">Fee</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.departmentFees?.map((item, index) => (
                            <tr key={index}>
                                <td className="border p-1">{item.department}</td>
                                <td className="border p-1">{item.fee}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };



    return (
        <div className=' w-full md:w-[80%] m-auto my-10'>
            <DataTable
                title={"Services List"}
                columns={columns}
                data={servicesData}
                pagination
                responsive
                highlightOnHover
                expandableRows
                expandableRowsComponent={FeeBreakdown}
            />
        </div>
    )
}
