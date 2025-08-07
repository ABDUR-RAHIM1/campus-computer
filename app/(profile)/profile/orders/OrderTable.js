"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import DataTable from "react-data-table-component";
import { format } from "date-fns";
import { Button } from "@/components/ui/button"
import OrderAction from "./OrderAction";
import OrderOverViewCard from "@/components/overviewCards/OrderOverViewCard";


export default function OrderTable({ orders }) {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    if (orders) {
      setOrderList(orders);
    }
  }, [orders]);

  const columns = [

    {
      name: "অর্ডার প্রোফাইল",
      selector: (row) => (
        <p className="my-4">{row.profileId?.studentName || "N/A"}</p>
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
        <p className="my-2">{row.collegeFee || "N/A"}</p>
      ),
      sortable: true,
      width: "100px",
      wrap: true,
    },
    {
      name: "চার্জ",
      selector: (row) => (
        <p className="my-2">{row.chargeFee || "N/A"}</p>
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
        let statusText = "";

        if (row.status === "cancel") {
          bgClass = "bg-red-100";
          textClass = "text-red-800";
          statusText = "বাতিল";
        } else if (row.status === "active") {
          bgClass = "bg-blue-100";
          textClass = "text-blue-800";
          statusText = "চলমান";
        } else if (row.status === "success") {
          bgClass = "bg-green-100";
          textClass = "text-green-800";
          statusText = "সম্পন্ন";
        }

        return (
          <p
            className={`text-xs px-2 py-1 rounded border font-medium ${bgClass} ${textClass}`}
          >
            {statusText}
          </p>
        );
      },
    },
    {
      name: "পেমেন্ট",
      selector: (row) => row.paymentStatus,
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium text-white ${row.paymentStatus === "paid"
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
          href={`/profile/orders/${row._id}`}
          className={
            " inline-block py-2 px-3 rounded-md bg-green-600 text-white cursor-pointer text-sm"
          }
        >
          ক্লিক করো
        </Link>
      ),
      width: "120px",
    },
    {
      name: "Manage",
      selector: row => <OrderAction orderId={row._id} />,
      width: "120px",
    }
  ];

  const ExpandableComponent = ({ data }) => {
    return (
      <>
        {data.status === "cancel" && (
          <div className="p-4 text-sm bg-red-100 rounded">
            <p>
              <span className="font-semibold">📱 ফেরতের নাম্বার:</span>{" "}
              {data?.cancelOrderInfo?.recivedNumber || "N/A"}
            </p>
            <p className="mt-1">
              <span className="font-semibold">📝 কারণ:</span>{" "}
              {data?.cancelOrderInfo?.reason || "N/A"}
            </p>
          </div>
        )}

        {data.status === "active" && (
          <div className="my-3 bg-blue-100 p-3 rounded">
            <h2>🚚 অর্ডারটি চলমান রয়েছে</h2>
            <p>আপনার অর্ডারটি প্রক্রিয়াধীন রয়েছে।</p>
          </div>
        )}

        {data.status === "success" && (
          <div className="my-3 bg-green-100 p-3 rounded">
            <h2>✅ অর্ডারটি সফলভাবে সম্পন্ন হয়েছে</h2>
            <p>আপনার অর্ডারটি ডেলিভারি সম্পন্ন হয়েছে। ধন্যবাদ!</p>
          </div>
        )}
      </>
    );
  };




  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className=" w-full mx-auto bg-white shadow-lg rounded-lg p-2 md:p-6">
        <h2 className=" text-xl md:text-2xl font-bold text-gray-800 mb-4">
          📋 অর্ডারসমূহ
        </h2>
        <p className=" text-sm md:text-xl text-gray-700 mb-6">
          নিচে সব কার্যক্রমের অর্ডার তালিকা দেওয়া হলো। প্রতিটি সার্ভিসের বিস্তারিত দেখতে সারির উপরে ক্লিক করুন।
        </p>


        <OrderOverViewCard total={20} success={8} cancel={2} />



        <DataTable
          columns={columns}
          data={orderList}
          pagination
          highlightOnHover
          responsive
          expandableRows
          expandableRowsComponent={ExpandableComponent}
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







