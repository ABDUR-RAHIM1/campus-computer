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
import { getAllSubAdmins } from "@/handlers/subAdmins"; 
import { Badge } from "../ui/badge";

export default function OrderTable({ orders, isAdmin = false }) {
  const { showToast } = useContext(globalContext);
  const [orderList, setOrderList] = useState([]);
  const [collegeList, setCollegeList] = useState([]);
  const [selectedCollegeId, setSelectedCollegeId] = useState("");

  useEffect(() => {
    if (isAdmin) {
      const savedCollege = localStorage.getItem("dashboard_filter_college_id");
      if (savedCollege) {
        setSelectedCollegeId(savedCollege);
      }
    }
  }, [isAdmin]);

  useEffect(() => {
    if (orders) {
      setOrderList(orders);
    }
  }, [orders]);

  // ২. সাব-অ্যাডমিন/কলেজ লিস্ট ফেচ করা (শুধু অ্যাডমিনদের জন্য)
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const { status, data } = await getAllSubAdmins();
        if (status === 200 || status === 201) {
          setCollegeList(data);
        }
      } catch (error) {
        console.log("College Load Error:", error);
      }
    };

    if (isAdmin) {
      fetchColleges();
    }
  }, [isAdmin]);

  // ৩. ডাটা ফিল্টার লজিক
  const filteredOrders = orderList?.filter((order) => {
    if (!isAdmin || !selectedCollegeId || selectedCollegeId === "all") return true;
    // এখানে reference._id অথবা reference (পপুলেটেড থাকলে) চেক করা হচ্ছে
    const refId = order.institute?._id
    return refId === selectedCollegeId;
  });


  // ফিল্টার চেঞ্জ হ্যান্ডলার
  const handleFilterChange = (e) => {
    const val = e.target.value;
    setSelectedCollegeId(val);
    localStorage.setItem("dashboard_filter_college_id", val);
  };

  // ৪. ফিল্টার অনুযায়ী কাউন্ট আপডেট করা
  const activeOrderCount = filteredOrders?.filter(item => item.status === "active")?.length || 0;
  const successOrderCount = filteredOrders?.filter(item => item.status === "success")?.length || 0;
  const cancelOrderCount = filteredOrders?.filter(item => item.status === "cancel")?.length || 0;

  // ৫. স্ট্যাটাস আপডেট হ্যান্ডলার
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const payload = {
        method: "PUT",
        endpoint: orderStatusUpdate + orderId,
        body: { orderStatus: newStatus },
      };
      const { status, data } = await PostActionAdmin(payload);
      showToast(status, data);

      if (status === 200) {
        setOrderList((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.log("🛑 Status update failed", error);
    }
  };

  const columns = [
    {
      name: "শিক্ষার্থী ও বিভাগ",
      selector: (row) => row.profileId?.studentName,
      cell: (row) => (
        <div className="py-3">
          <p className="font-bold text-blue-900">{row.profileId?.studentName || "N/A"}</p>
          <p className="text-[10px] text-gray-500 uppercase tracking-tighter">{row.institute?.username || "N/A"}</p>
          <p className="text-[10px] text-gray-500 uppercase tracking-tighter text-center">({row.department || "N/A"})</p>
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
      selector: (row) => row.calculatedTotal,
      cell: (row) => <div>
        <p className="font-semibold text-gray-800">{row.calculatedTotal}৳</p>
        <Badge className={` ${row?.paymentMethod === "Rocket" ? "bg-green-500" : "bg-red-500 text-white"}`}>
          {row?.paymentMethod || "N/A"}
        </Badge>
      </div>,
      sortable: true,
      width: "100px",
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
          <div className="w-full">
            {isAdmin ? (
              <select
                value={row.status}
                onChange={(e) => handleStatusChange(row._id, e.target.value)}
                className={`text-[11px] px-2 py-1 rounded border font-bold outline-none cursor-pointer ${current.bg} ${current.text}`}
              >
                <option value="pending">পেন্ডিং</option>
                <option value="active">চলমান</option>
                <option value="success">সম্পন্ন</option>
                <option value="cancel">বাতিল</option>
              </select>
            ) : (
              <span className={`text-[11px] px-2 py-1 rounded-full border font-bold ${current.bg} ${current.text}`}>
                {current.label}
              </span>
            )}
          </div>
        );
      },
      width: "120px",
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
        const detailsPath = isAdmin ? "/dashboard/orders" : "/profile/orders";
        return (
          <div className="flex gap-2">
            <Link
              href={`${detailsPath}/${row._id}`}
              className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
              title="বিস্তারিত দেখুন"
            >
              👁️
            </Link>
            {isAdmin ? (
              <button className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-md transition-colors" title="Delete">🗑️</button>
            ) : (
              <OrderAction orderId={row._id} />
            )}
          </div>
        );
      },
      width: "120px",
    }
  ];
 

  const ExpandableComponent = ({ data }) => {
  return (
    <div className="p-4 bg-gray-50 border-x border-b rounded-b-xl shadow-inner">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* বাম পাশ: স্ট্যাটাস অনুযায়ী ডাইনামিক মেসেজ */}
        <div className="flex-1 w-full">
          {(() => {
            switch (data.status) {
              case "pending":
                return (
                  <div className="p-4 bg-white border-l-4 border-yellow-500 rounded shadow-sm">
                    <p className="font-bold text-yellow-800 flex items-center gap-2 text-sm">⏳ যাচাইকরণ চলছে</p>
                    <p className="text-[12px] text-gray-600 mt-1 leading-relaxed">
                      আপনার প্রদানকৃত তথ্যগুলো আমাদের প্রতিনিধিরা যাচাই করছেন। নির্ভুল থাকলে দ্রুতই কাজ শুরু হবে।
                    </p>
                  </div>
                );
              case "active":
                return (
                  <div className="p-4 bg-white border-l-4 border-blue-500 rounded shadow-sm">
                    <p className="font-bold text-blue-800 flex items-center gap-2 text-sm">🚀 কাজ চলমান</p>
                    <p className="text-[12px] text-gray-600 mt-1 leading-relaxed">
                      অর্ডারটি বর্তমানে প্রসেসিং লিস্টে আছে। কাজ শেষ হওয়া মাত্রই আপনি আপডেট পেয়ে যাবেন।
                    </p>
                  </div>
                );
              case "cancel":
                return (
                  <div className="p-4 bg-white border-l-4 border-red-500 rounded shadow-sm">
                    <p className="font-bold text-red-800 flex items-center gap-2 text-sm">❌ অর্ডার বাতিল</p>
                    <div className="text-[12px] text-gray-600 mt-1 space-y-1">
                      <p><strong>ফেরত নাম্বার:</strong> {data?.cancelOrderInfo?.recivedNumber || "N/A"}</p>
                      <p className="text-red-600 italic font-medium"><strong>কারণ:</strong> {data?.cancelOrderInfo?.reason || "তথ্যগত ভুল বা পেমেন্ট সমস্যা।"}</p>
                    </div>
                  </div>
                );
              case "success":
                return (
                  <div className="p-4 bg-white border-l-4 border-green-500 rounded shadow-sm">
                    <p className="font-bold text-green-800 flex items-center gap-2 text-sm">✅ সফলভাবে সম্পন্ন</p>
                    <p className="text-[12px] text-gray-600 mt-1">
                      অভিনন্দন! আপনার অর্ডারটির কাজ সফলভাবে শেষ হয়েছে। আমাদের সেবা ব্যবহারের জন্য ধন্যবাদ।
                    </p>
                  </div>
                );
              default:
                return (
                  <div className="p-3 bg-white border border-dashed border-gray-300 rounded text-center">
                    <p className="text-xs text-gray-500 italic">অর্ডারের আপডেট শীঘ্রই জানানো হবে।</p>
                  </div>
                );
            }
          })()}
        </div>

      

      </div>
    </div>
  );
};


  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden p-4 md:p-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-blue-950 mb-2">📋 অর্ডার ড্যাশবোর্ড</h2>
            <p className="text-gray-500 text-sm">ক্যাম্পাস কম্পিউটার অর্ডার ট্র্যাকিং সিস্টেম</p>
          </div>

          {/* ফিল্টার সেকশন */}
          {isAdmin && (
            <div className="w-full md:w-auto">
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1">কলেজ ফিল্টার</label>
              <select
                value={selectedCollegeId}
                onChange={handleFilterChange}
                className="w-full md:w-64 p-2.5 bg-blue-50 border-2 border-blue-100 rounded-xl text-sm font-bold text-blue-900 outline-none focus:border-blue-400 transition-all cursor-pointer"
              >
                <option value="all">সকল কলেজ (All)</option>
                {collegeList?.map((college) => (
                  <option key={college._id} value={college._id}>
                    🏛️ {college.username}
                  </option>
                ))}
              </select>
            </div>
          )}
        </header>

        <OrderOverViewCard
          total={filteredOrders?.length || 0}
          active={activeOrderCount}
          success={successOrderCount}
          cancel={cancelOrderCount}
        />

        <div className="mt-8 border rounded-xl overflow-hidden">
          <DataTable
            columns={columns}
            data={filteredOrders}
            pagination
            highlightOnHover
            responsive
            expandableRows
            expandableRowsComponent={ExpandableComponent}
            customStyles={{
              headCells: {
                style: { backgroundColor: "#F8FAFC", color: "#1E293B", fontSize: "13px", fontWeight: "800", textTransform: "uppercase", padding: "15px" },
              },
              rows: {
                style: { fontSize: "14px", "&:not(:last-of-type)": { borderBottom: "1px solid #F1F5F9" } },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}