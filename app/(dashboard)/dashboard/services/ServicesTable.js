"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ServicesOverview from "@/components/overviewCards/ServicesOverview";
import DeleteButton from "../components/DeleteButton";
import { servicesActions } from "@/constans";
import UpdateButton from "../components/UpdateButton";

export default function ServicesTable({ data }) {
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    setServicesData(data);
  }, [data]);

 

  const columns = [
    {
      name: "#",
      cell: (row, index) => index + 1,
      width: "50px",
    },
    {
      name: "Type",
      selector: (row) => <div className={`py-1 px-2 rounded-sm text-[12px] ${row.type === "নিয়মিত" ? "bg-blue-100 text-blue-500" :" bg-red-100 text-red-500"}`}>
        {row.type}
      </div>,
      wrap: true,
      width: "120px",
    },
    {
      name: "Title",
      selector: (row) => row.title,
      wrap: true,
      width: "250px",
    },
    {
      name: "Program",
      selector: (row) => row.program,
      width: "100px",
    },
    {
      name: "Session",
      selector: (row) => row.session,
      width: "120px",
    },
    {
      name: "Total Fee",
      selector: (row) =>
        row?.departmentFees?.reduce(
          (sum, item) => sum + (item?.totalFee || 0),
          0
        ) ?? "N/A",
      width: "120px",
    },
    {
      name: "Update",
      cell: (row) =>
        <UpdateButton />,
      width: "100px",
    },
    {
      name: "Delete",
      cell: (row) => (
        <DeleteButton deleteApi={servicesActions + row._id} />
      ),
      width: "100px",
    },
  ];

  const FeeBreakdown = ({ data }) => {
     
    return (
      <div className="p-3 bg-blue-50 rounded-md">
        <h4 className="font-semibold text-blue-700 mb-2">
          📊 ডিপার্টমেন্ট অনুযায়ী ফী - <span>{data.institute?.username}</span>
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-blue-200 rounded">
            <thead>
              <tr className="bg-blue-200 text-blue-700">
                <th className="border p-2">Department</th>
                <th className="border p-2">College Fee</th>
                <th className="border p-2">Subject Fee</th>
                <th className="border p-2">Charge Fee</th>
                <th className="border p-2">Total Fee</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.departmentFees?.map((item, index) => (
                <tr key={index}>
                  <td className="border p-2">{item.department}</td>
                  <td className="border p-2">{item.collegeFee}</td>
                  <td className="border p-2">{item.subjectFee}</td>
                  <td className="border p-2">{item.chargeFee}</td>
                  <td className="border p-2">{item.totalFee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full md:w-[90%] m-auto my-10  ">
      <ServicesOverview />
      <DataTable
        title={
          <span className="text-xl font-semibold text-gray-700">
            📋 Services List
          </span>
        }
        columns={columns}
        data={servicesData}
        pagination
        responsive
        highlightOnHover
        expandableRows
        expandableRowsComponent={FeeBreakdown}
        customStyles={{
          headCells: {
            style: {
              backgroundColor: "#f3f4f6",
              fontWeight: "bold",
            },
          },
          rows: {
            style: {
              borderBottom: "1px solid #e5e7eb",
            },
          },
        }}
      />
    </div>
  );
}
