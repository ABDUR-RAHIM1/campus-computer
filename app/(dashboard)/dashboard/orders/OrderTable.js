"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import DataTable from "react-data-table-component";
import { format } from "date-fns";
import { PostActionAdmin } from "@/actions/admins/PostAction";
import { orderStatusUpdate } from "@/constans";
import { globalContext } from "@/contextApi/ContextApi";

export default function OrderTable({ orders }) {
  const { showToast } = useContext(globalContext);
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    if (orders) {
      setOrderList(orders);
    }
  }, [orders]);

  //  order stutus update handler
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const payload = {
        method: "PUT",
        endpoint: orderStatusUpdate + orderId,
        body: { orderStatus: newStatus },
      };
      const { status, data } = await PostActionAdmin(payload);
      showToast(status, data)

      if (status === 200) {
        // ✅ অর্ডার লিস্ট আপডেট (লোকালি UI তে পরিবর্তন)
        setOrderList((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.log("🛑 Failed to update order status", error);
    }
  };




const columns = [
  {
    name: "অর্ডারকারী",
    selector: (row) => (
      <div>
        <p className="my-2">{row.reference?.username || "N/A"}</p>
      </div>
    ),
    sortable: true,
    width: "150px",
    wrap: true,
  },
  {
    name: "অর্ডার প্রোফাইল",
    selector: (row) => (
      <p className="my-2">{row.profileId?.studentName || "N/A"}</p>
    ),
    sortable: true,
    width: "200px",
    wrap: true,
  },
  {
    name: "সেবার নাম",
    selector: (row) => (
      <p className="my-2">{row.serviceId?.title || "N/A"}</p>
    ),
    sortable: true,
    width: "250px",
    wrap: true,
  },
  {
    name: "বিভাগ ",
    selector: (row) => (
      <p className="my-2">{row.department || "N/A"}</p>
    ),
    sortable: true,
    width: "150px",
    wrap: true,
  },
  {
    name: "দাম ",
    selector: (row) => (
      <p className="my-2">{row.amount || "N/A"}</p>
    ),
    sortable: true,
    width: "100px",
    wrap: true,
  },
  {
    name: "তারিখ",
    selector: (row) =>
      format(new Date(row.createdAt), "dd/MM/yyyy") || "N/A",
  },
  {
    name: "স্ট্যাটাস",
    selector: (row) => row.status,
    cell: (row) => {
      let bgClass = "";
      let textClass = "";

      if (row.status === "pending") {
        bgClass = "bg-yellow-100";
        textClass = "text-yellow-800";
      } else if (row.status === "active") {
        bgClass = "bg-blue-100";
        textClass = "text-blue-800";
      } else if (row.status === "success") {
        bgClass = "bg-green-100";
        textClass = "text-green-800";
      }

      return (
        <select
          value={row.status}
          onChange={(e) => handleStatusChange(row._id, e.target.value)}
          className={`text-xs px-2 py-1 rounded border font-medium ${bgClass} ${textClass}`}
        >
          <option value="pending">প্রক্রিয়াধীন</option>
          <option value="active">চলমান</option>
          <option value="success">সম্পন্ন</option>
        </select>
      );
    },
  },
  {
    name: "পেমেন্ট",
    selector: (row) => row.paymentStatus,
    cell: (row) => (
      <span
        className={`px-2 py-1 rounded text-xs font-medium text-white ${
          row.paymentStatus === "paid"
            ? "bg-green-600"
            : row.paymentStatus === "pending"
            ? "bg-yellow-600"
            : "bg-red-600"
        }`}
      >
        {row.paymentStatus === "paid"
          ? "Success"
          : row.paymentStatus === "pending"
          ? "Pending"
          : "Failed"}
      </span>
    ),
  },
  {
    name: "বিস্তারিত",
    selector: (row) => (
      <Link
        href={`/dashboard/orders/${row._id}`}
        className={
          " inline-block py-2 px-3 rounded-md bg-green-600 text-white cursor-pointer text-sm"
        }
      >
        ক্লিক করো
      </Link>
    ),
    width: "120px",
  },
];




  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className=" mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          📋 আমার অর্ডারসমূহ
        </h2>
        <p className="text-gray-700 mb-6">
          নিচে আপনার সব কার্যক্রমের অর্ডার তালিকা দেওয়া হলো। প্রতিটি সার্ভিসের বিস্তারিত দেখতে সারির উপরে ক্লিক করুন।
        </p>

        <DataTable
          columns={columns}
          data={orderList}
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
