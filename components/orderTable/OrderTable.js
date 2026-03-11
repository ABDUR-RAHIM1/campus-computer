"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import DataTable from "react-data-table-component";
import { format } from "date-fns";
import OrderAction from "./OrderAction";
import OrderOverViewCard from "@/components/overviewCards/OrderOverViewCard";
import { orderStatusUpdate } from "@/constans";
import { PostActionAdmin } from "@/actions/admins/PostAction";
import { globalContext } from "@/contextApi/ContextApi";

export default function OrderTable({ orders, isAdmin = false }) {
  const {showToast} = useContext(globalContext)
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    if (orders) {
      setOrderList(orders);
    }
  }, [orders]);

  const activeOrderCount = orderList?.filter(orderItem => orderItem.status === "active")?.length || 0;
  const successOrderCount = orderList?.filter(orderItem => orderItem.status === "success")?.length || 0;
  const cancelOrderCount = orderList?.filter(orderItem => orderItem.status === "cancel")?.length || 0;

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
      name: "শিক্ষার্থী ও বিভাগ",
      selector: (row) => row.profileId?.studentName,
      cell: (row) => (
        <div className="py-3">
          <p className="font-bold text-blue-900">{row.profileId?.studentName || "N/A"}</p>
          <p className="text-[10px] text-gray-500 uppercase tracking-tighter">{row.department || "N/A"}</p>
        </div>
      ),
      sortable: true,
      width: "180px",
    },
    {
      name: "সেবার বিবরণ",
      selector: (row) => row.serviceId?.title,
      cell: (row) => (
        <div className="py-2">
          <p className="text-sm leading-tight mb-1">{row.serviceId?.title || "Removed"}</p>
          <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600 border">
            {row.orderType === "full_service" ? "🏛️ ফুল সার্ভিস" : "📦 অফিস কপি"}
          </span>
        </div>
      ),
      sortable: true,
      width: "250px",
    },
    {
      name: "মোট ফি",
      selector: (row) => row.totalFee,
      cell: (row) => <p className="font-semibold text-gray-800">{row.totalFee}৳</p>,
      sortable: true,
      width: "100px",
    },
    {
      name: "চার্জ",
      selector: (row) => row.chargeFee,
      cell: (row) => <p className="text-gray-600">{row.chargeFee}৳</p>,
      sortable: true,
      width: "90px",
    },
    {
      name: "তারিখ",
      selector: (row) => row.createdAt,
      cell: (row) => <p className="text-xs">{format(new Date(row.createdAt), "dd/MM/yyyy")}</p>,
      sortable: true,
      width: "110px",
    },
    {
      name: "স্ট্যাটাস",
      selector: (row) => row.status,
      cell: (row) => {
        const statusMap = {
          pending: { bg: "bg-yellow-100", text: "text-yellow-700", label: "পেন্ডিং" },
          cancel: { bg: "bg-red-100", text: "text-red-700", label: "বাতিল" },
          active: { bg: "bg-blue-100", text: "text-blue-700", label: "চলমান" },
          success: { bg: "bg-green-100", text: "text-green-700", label: "সম্পন্ন" },
        };
        const current = statusMap[row.status] || { bg: "bg-gray-100", text: "text-gray-700", label: row.status };

        return (
          <div className={`text-[11px] px-2 py-1 rounded-full border font-bold ${current.bg} ${current.text}`}>

            {isAdmin ?

              <select
                value={row.status}
                onChange={(e) => handleStatusChange(row._id, e.target.value)}
                className={`text-xs px-2 py-1 rounded border font-medium ${current.bg} ${current.text}`}
              >
                <option value="cancel">বাতিল</option>
                <option value="active">চলমান</option>
                <option value="success">সম্পন্ন</option>
                <option value="pending">পেন্ডিং</option>
              </select>

              : current.label}

          </div>
        );
      },
      width: "100px",
    },
    {
      name: "পেমেন্ট",
      selector: (row) => row.paymentStatus,
      cell: (row) => (
        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${row.paymentStatus === "paid" ? "bg-green-600 text-white" :
          row.paymentStatus === "pending" ? "bg-orange-500 text-white" : "bg-red-600 text-white"
          }`}>
          {row.paymentStatus}
        </span>
      ),
      width: "100px",
    },
    {
      name: "অ্যাকশন",
      cell: (row) => {
        const detailsPath = isAdmin ? "/dashboard/orders" : "/profile/orders"
        return (
          <div className="flex gap-2">
            <Link
              href={`${detailsPath}/${row._id}`}
              className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
              title="বিস্তারিত দেখুন"
            >
              👁️
            </Link>

            {
              isAdmin ? "Delete" :
                <OrderAction orderId={row._id} />

            }
          </div>
        )
      },
      width: "120px",
    }
  ];

  const ExpandableComponent = ({ data }) => {
    return (
      <div className="p-4 bg-gray-50 border-x border-b rounded-b-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* হিসাব নিকাশ */}
          <div className="space-y-1 text-sm border-r pr-4">
            <h4 className="font-bold text-gray-700 border-b pb-1 mb-2">💰 ফি ব্রেকডাউন</h4>
            <div className="flex justify-between"><span>কলেজ ফি:</span> <span>{data.collegeFee}৳</span></div>
            <div className="flex justify-between"><span>সাবজেক্ট ফি:</span> <span>{data.subjectFee}৳</span></div>
            <div className="flex justify-between"><span>প্রসেসিং ফি:</span> <span>{data.processingFee}৳</span></div>
            <div className="flex justify-between text-[10px] text-gray-500 italic"><span>সাব-টোটাল:</span> <span>{data.subTotal}৳</span></div>
            <div className="flex justify-between text-[10px] text-gray-500 italic"><span>রকেট বিলার চার্জ:</span> <span>{data.billerCharge}৳</span></div>
            <div className="flex justify-between text-[10px] text-gray-500 italic"><span> ক্যাশআউট চার্জ:</span> <span>{data.cashOutCharge}৳</span></div>

            <div className="flex justify-between font-bold border-t pt-1 mt-1"><span>মোট পেমেন্ট:</span> <span>{data.calculatedTotal}৳</span></div>
          </div>

          {/* স্ট্যাটাস কাস্টম মেসেজ */}
          <div className="flex items-center">
            {data.status === "cancel" ? (
              <div className="w-full p-3 bg-red-100 border-l-4 border-red-500 rounded">
                <p className="font-bold text-red-700">❌ অর্ডার বাতিল তথ্য</p>
                <p className="text-sm mt-1"><strong>ফেরত নাম্বার:</strong> {data?.cancelOrderInfo?.recivedNumber || "N/A"}</p>
                <p className="text-sm italic text-red-600"><strong>কারণ:</strong> {data?.cancelOrderInfo?.reason || "N/A"}</p>
              </div>
            ) : (
              <div className="flex items-center w-full">
                {(() => {
                  switch (data.status) {
                    case "pending":
                      return (
                        <div className="w-full p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded shadow-sm">
                          <p className="font-bold text-yellow-800 flex items-center gap-2">
                            ⏳ আপনার অর্ডারটি যাচাই করা হচ্ছে
                          </p>
                          <p className="text-xs text-yellow-700 mt-1">
                            আপনার দেওয়া তথ্যগুলো আমাদের প্রতিনিধি পরীক্ষা করছেন। যাচাই শেষ হলে দ্রুত কাজ শুরু হবে। আমাদের সাথেই থাকুন।
                          </p>
                        </div>
                      );
                    case "active":
                      return (
                        <div className="w-full p-4 bg-blue-50 border-l-4 border-blue-500 rounded shadow-sm">
                          <p className="font-bold text-blue-800 flex items-center gap-2">
                            🚀 কাজ চলমান রয়েছে
                          </p>
                          <p className="text-xs text-blue-700 mt-1">
                            অর্ডারটি বর্তমানে প্রসেসিং করা হচ্ছে। সংশ্লিষ্ট কাজ শেষ হওয়া মাত্রই আপনি আপডেট পেয়ে যাবেন।
                          </p>
                        </div>
                      );
                    case "cancel":
                      return (
                        <div className="w-full p-4 bg-red-50 border-l-4 border-red-500 rounded shadow-sm">
                          <p className="font-bold text-red-800 flex items-center gap-2">
                            ❌ অর্ডারটি বাতিল করা হয়েছে
                          </p>
                          <p className="text-xs text-red-700 mt-1">
                            <strong>ফেরত নাম্বার:</strong> {data?.cancelOrderInfo?.recivedNumber || "N/A"} <br />
                            <strong>কারণ:</strong> {data?.cancelOrderInfo?.reason || "তথ্যগত ত্রুটি বা অন্য কোনো সমস্যা।"}
                          </p>
                        </div>
                      );
                    case "reject":
                      return (
                        <div className="w-full p-4 bg-gray-100 border-l-4 border-gray-600 rounded shadow-sm">
                          <p className="font-bold text-gray-800 flex items-center gap-2">
                            🚫 অর্ডারটি প্রত্যাখ্যাত (Rejected)
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            দুঃখিত, আপনার পেমেন্ট বা ডকুমেন্টে অসংগতি থাকায় অর্ডারটি গ্রহণ করা সম্ভব হয়নি। বিস্তারিত জানতে সাপোর্টে যোগাযোগ করুন।
                          </p>
                        </div>
                      );
                    case "success":
                      return (
                        <div className="w-full p-4 bg-green-50 border-l-4 border-green-500 rounded shadow-sm">
                          <p className="font-bold text-green-800 flex items-center gap-2">
                            ✅ সফলভাবে সম্পন্ন
                          </p>
                          <p className="text-xs text-green-700 mt-1">
                            আপনার অর্ডারটির কাজ সফলভাবে শেষ হয়েছে। আমাদের সেবা ব্যবহারের জন্য ধন্যবাদ।
                          </p>
                        </div>
                      );
                    default:
                      return (
                        <div className="w-full p-3 bg-gray-50 border border-dashed border-gray-300 rounded text-center">
                          <p className="text-sm text-gray-500 italic font-medium">অর্ডারের রেফারেন্স আইডি: {data.reference}</p>
                        </div>
                      );
                  }
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden p-4 md:p-8">
        <header className="mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-blue-950 mb-2">📋 অর্ডার ড্যাশবোর্ড</h2> 
          <p className="text-gray-500 text-sm md:text-base">
            Campus Computer এর মাধ্যমে করা সকল অর্ডারের বর্তমান অবস্থা এবং পেমেন্ট ডিটেইলস এখানে ট্র্যাক করুন।
          </p>
        </header>

        <OrderOverViewCard
          total={orderList?.length || 0}
          active={activeOrderCount}
          success={successOrderCount}
          cancel={cancelOrderCount}
        />

        <div className="mt-8 border rounded-xl overflow-hidden">
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
                  backgroundColor: "#F8FAFC",
                  color: "#1E293B",
                  fontSize: "13px",
                  fontWeight: "800",
                  textTransform: "uppercase",
                  paddingTop: "15px",
                  paddingBottom: "15px",
                },
              },
              rows: {
                style: {
                  fontSize: "14px",
                  "&:not(:last-of-type)": {
                    borderBottomStyle: "solid",
                    borderBottomWidth: "1px",
                    borderBottomColor: "#F1F5F9",
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}