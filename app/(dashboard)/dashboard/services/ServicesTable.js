"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component"; 
import ServicesOverview from "@/components/overviewCards/ServicesOverview";
import DeleteButton from "../components/DeleteButton";
import { servicesActions } from "@/constans";
import UpdateButton from "../components/UpdateButton";
import { CreditCard, Info, Trash2, Edit3, Boxes } from "lucide-react";

export default function ServicesTable({ data }) {
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    setServicesData(data);
  }, [data]);

  const columns = [
    {
      name: "#",
      cell: (row, index) => <span className="font-bold text-gray-400">{index + 1}</span>,
      width: "60px",
    },
    {
      name: "Type",
      cell: (row) => (
        <div className={`py-1 px-3 rounded-full text-[10px] font-black uppercase tracking-widest border ${
          row.type === "নিয়মিত" 
          ? "bg-blue-50 text-blue-600 border-blue-100" 
          : "bg-amber-50 text-amber-600 border-amber-100"
        }`}>
          {row.type}
        </div>
      ),
      width: "120px",
    },
    {
      name: "Title",
      selector: (row) => (
        <div className="flex flex-col">
          <span className="font-bold text-gray-800 uppercase text-[13px] tracking-tight">{row.title}</span>
          <span className="text-[10px] text-gray-400 font-medium">{row.institute?.username}</span>
        </div>
      ),
      wrap: true,
      grow: 2,
    },
    {
      name: "Program",
      cell: (row) => <span className="text-[11px] font-black uppercase text-gray-500">{row.program}</span>,
      width: "120px",
    },
    {
      name: "Avg. Fee",
      cell: (row) => {
        const total = row?.departmentFees?.reduce((sum, item) => sum + (item?.totalFee || 0), 0) || 0;
        return <span className="font-black text-blue-600">৳ {total}</span>;
      },
      width: "120px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <UpdateButton id={row._id} /> 
          <DeleteButton deleteApi={servicesActions + row._id} />
        </div>
      ),
      width: "140px",
    },
  ];

  // ড্রপডাউন বা এক্সপ্যান্ডেড ফী ব্রেকডাউন ডিজাইন
  const FeeBreakdown = ({ data }) => {
    return (
      <div className="p-6 bg-gray-50/50 border-b border-gray-100 animate-in slide-in-from-top-2 duration-300">
        <div className="bg-white rounded-[1.5rem] shadow-sm border border-blue-50 overflow-hidden">
          <div className="px-5 py-3 bg-blue-600 flex justify-between items-center text-white">
            <h4 className="text-[11px] font-black uppercase tracking-widest flex items-center gap-2">
              <CreditCard size={14} /> ফী ব্রেকডাউন (ডিপার্টমেন্ট ভিত্তিক)
            </h4>
            <span className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded-md">{data.title}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-blue-50/50 text-[10px] font-black uppercase text-blue-400 tracking-wider">
                  <th className="px-5 py-3">Department</th>
                  <th className="px-5 py-3 text-center">College Fee</th>
                  <th className="px-5 py-3 text-center">Subject Fee</th>
                  <th className="px-5 py-3 text-center">Charge</th>
                  <th className="px-5 py-3 text-right">Total Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.departmentFees?.map((item, index) => (
                  <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-5 py-3 text-xs font-bold text-gray-700">{item.department}</td>
                    <td className="px-5 py-3 text-xs text-center font-medium text-gray-500">৳{item.collegeFee}</td>
                    <td className="px-5 py-3 text-xs text-center font-medium text-gray-500">৳{item.subjectFee}</td>
                    <td className="px-5 py-3 text-xs text-center font-medium text-gray-500">৳{item.chargeFee}</td>
                    <td className="px-5 py-3 text-xs text-right font-black text-gray-900 underline decoration-blue-200">৳{item.totalFee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full space-y-4">
      <ServicesOverview />
      
      <div className="bg-white rounded-[2rem] shadow-xl shadow-blue-50/50 border border-gray-100 overflow-hidden">
        <DataTable
          columns={columns}
          data={servicesData}
          pagination
          responsive
          highlightOnHover
          expandableRows
          expandableRowsComponent={FeeBreakdown}
          customStyles={{
            table: {
              style: {
                backgroundColor: "#ffffff",
              },
            },
            headRow: {
              style: {
                backgroundColor: "#fcfdfe",
                borderBottom: "1px solid #f1f5f9",
                minHeight: "56px",
              },
            },
            headCells: {
              style: {
                fontSize: "10px",
                fontWeight: "900",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#94a3b8",
              },
            },
            rows: {
              style: {
                minHeight: "70px",
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor: "#f8fafc",
                },
              },
            },
            pagination: {
              style: {
                borderTop: "1px solid #f1f5f9",
                padding: "10px",
                fontSize: "12px",
                fontWeight: "bold",
              },
            },
          }}
        />
      </div>
    </div>
  );
}