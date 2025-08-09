"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import DataTable from "react-data-table-component";
import { format } from "date-fns";
import { PostActionAdmin } from "@/actions/admins/PostAction";
import { orderStatusUpdate } from "@/constans";
import { globalContext } from "@/contextApi/ContextApi";
import OrderOverViewCard from "@/components/overviewCards/OrderOverViewCard";

export default function OrderTable({ orders }) {
  const { showToast } = useContext(globalContext);
  const [orderList, setOrderList] = useState([]);


  useEffect(() => {
    if (orders) {
      setOrderList(orders);
    }
  }, [orders]);


  const activeOrderCount = orderList?.filter(orderItem => orderItem.status === "active")?.length || 0
  const successOrderCount = orderList?.filter(orderItem => orderItem.status === "success")?.length || 0
  const cancelOrderCount = orderList?.filter(orderItem => orderItem.status === "cancel")?.length || 0




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
          <select
            value={row.status}
            onChange={(e) => handleStatusChange(row._id, e.target.value)}
            className={`text-xs px-2 py-1 rounded border font-medium ${bgClass} ${textClass}`}
          >
            <option value="cancel">বাতিল</option>
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
            <p> অর্ডারটি প্রক্রিয়াধীন রয়েছে।</p>
          </div>
        )}

        {data.status === "success" && (
          <div className="my-3 bg-green-100 p-3 rounded">
            <h2>✅ অর্ডারটি সফলভাবে সম্পন্ন হয়েছে</h2>
            <p> অর্ডারটি ডেলিভারি সম্পন্ন হয়েছে!</p>
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

        <OrderOverViewCard
          total={orderList?.length || 0}
          active={activeOrderCount}
          success={successOrderCount}
          cancel={cancelOrderCount}
        />

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
