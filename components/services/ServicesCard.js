"use client";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { globalContext } from "@/contextApi/ContextApi";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function ServicesCard({ servicesData }) {
    const router = useRouter();
    const pathName = usePathname();
    const { setServiceData } = useContext(globalContext);

    const colors = [
        { bg: "from-blue-50 to-blue-100", text: "text-blue-700", desc: "text-blue-600" },
        { bg: "from-green-50 to-green-100", text: "text-green-700", desc: "text-green-600" },
        { bg: "from-yellow-50 to-yellow-100", text: "text-yellow-700", desc: "text-yellow-600" },
        { bg: "from-purple-50 to-purple-100", text: "text-purple-700", desc: "text-purple-600" },
        { bg: "from-pink-50 to-pink-100", text: "text-pink-700", desc: "text-pink-600" },
        { bg: "from-indigo-50 to-indigo-100", text: "text-indigo-700", desc: "text-indigo-600" },
    ];

   
    const handleNavigateToOrder = (data) => {
        if (pathName.startsWith("/profile")) {
            setServiceData(data);
            router.push("/profile/create-order");
        } else {
            router.push("/profile");
        }
    };

    return (
        <>
            {servicesData.map((service, index) => {
                const color = colors[index % colors.length];

                return (
                    <div
                        key={service._id}
                        className={`block bg-gradient-to-br ${color.bg} border rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition p-5`}
                    >
                        {/* Header */}
                        <div className="mb-3">
                            <h4 className={`text-lg font-bold ${color.text} flex items-center gap-1`}>
                                📄 {service.title}
                            </h4>
                            <p className={`${color.desc} text-sm mt-1`}>
                                {service.description}
                            </p>
                        </div>

                        {/* Meta Info */}
                        <div className="my-3 flex items-center justify-between flex-wrap gap-3">
                            <p className="text-xs text-gray-600">
                                🎓 {service.program.toUpperCase()} | 📅 {service.session}
                            </p>

                            <div
                                className={`py-1 px-3 text-xs rounded-full ${service.type === "নিয়মিত"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-red-100 text-red-500"
                                    }`}
                            >
                                {service.type}
                            </div>
                        </div>

                        {/* NEW FIELD — Institute Name */}
                        <div className="bg-white p-3 rounded-lg border mb-4">
                            <p className="text-sm font-medium text-gray-700">🏫 প্রতিষ্ঠান:</p>
                            <p className="text-sm text-gray-600 mt-1">{service?.institute?.username || "N/A"}</p>
                        </div>

                        {/* Department Fees */}
                        <div className="mb-4">
                            <h2 className="font-semibold text-center border p-2 rounded bg-white">
                                বিভাগ অনুযায়ী ফি
                            </h2>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">বিভাগ</TableHead>
                                        <TableHead>ফী</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {service?.departmentFees?.map((item, index) => (
                                        <TableRow key={index} className="hover:bg-gray-50">
                                            <TableCell>{item.department}</TableCell>
                                            <TableCell>{item.collegeFee}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Required Documents */}
                        {service.requiredDocuments?.length > 0 && (
                            <div className="mb-4 bg-white p-3 rounded-lg border">
                                <p className="font-semibold text-gray-700">📎 প্রয়োজনীয় ডকুমেন্ট:</p>
                                <ul className="mt-3 text-sm text-gray-700 list-disc list-inside">
                                    {service.requiredDocuments.map((doc, i) => (
                                        <li key={i}>{doc}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Button */}
                        <Button
                            onClick={() => handleNavigateToOrder(service)}
                            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            আবেদন করুন
                        </Button>
                    </div>
                );
            })}
        </>
    );
}
