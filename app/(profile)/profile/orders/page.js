"use client";
import React from "react";
import Link from "next/link";
import DataTable from "react-data-table-component";

const orders = [
  {
    id: 1,
    title: "অনার্স ভর্তি আবেদন",
    date: "২০২৫-০৭-১৫",
    status: "সম্পন্ন",
    payment: "Success",
  },
  {
    id: 2,
    title: "ডিগ্রী ১ম বর্ষ আবেদন",
    date: "২০২৫-০৭-১২",
    status: "চলমান",
    payment: "Pending",
  },
  {
    id: 3,
    title: "ভর্তি কনফার্মেশন",
    date: "২০২৫-০৭-১০",
    status: "অপেক্ষমাণ",
    payment: "Failed",
  },
];

const columns = [
  {
    name: "কাজের নাম",
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: "তারিখ",
    selector: (row) => row.date,
  },
  {
    name: "স্ট্যাটাস",
    selector: (row) => row.status,
    cell: (row) => (
      <span
        className={`px-2 py-1 rounded text-xs font-medium text-white ${
          row.status === "সম্পন্ন"
            ? "bg-green-500"
            : row.status === "চলমান"
            ? "bg-yellow-500"
            : "bg-red-500"
        }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    name: "পেমেন্ট",
    selector: (row) => row.payment,
    cell: (row) => (
      <span
        className={`px-2 py-1 rounded text-xs font-medium text-white ${
          row.payment === "Success"
            ? "bg-green-600"
            : row.payment === "Pending"
            ? "bg-yellow-600"
            : "bg-red-600"
        }`}
      >
        {row.payment}
      </span>
    ),
  },
  {
    name: "অ্যাকশন",
    cell: (row) => (
      <Link
        href={`/campus-computer/orders/${row.id}`}
        className="text-blue-600 hover:underline text-sm"
      >
        বিস্তারিত দেখুন
      </Link>
    ),
  },
];

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📋 আমার অর্ডারসমূহ</h2>

        <p className="text-gray-700 mb-6">
          নিচে আপনার সব কার্যক্রমের অর্ডার তালিকা দেওয়া হলো। প্রতিটি সার্ভিসের বিস্তারিত দেখতে নিচের টেবিল ব্যবহার করুন। পেমেন্ট সফল হলে তবেই অর্ডার কনফার্ম হবে।
        </p>

        <DataTable
          columns={columns}
          data={orders}
          pagination
          highlightOnHover
          responsive
          customStyles={{
            headCells: {
              style: {
                backgroundColor: "#f3f4f6",
                fontWeight: "bold",
              },
            },
          }}
        />
      </div>
    </div>
  );
}
