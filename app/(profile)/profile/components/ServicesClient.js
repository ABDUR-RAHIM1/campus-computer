"use client";

import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ServicesCard from "@/components/services/ServicesCard";
import { getAllSubAdmins } from "@/handlers/subAdmins";

export default function ServicesClient({ data, colsStyle }) {
    const [selectedInstitute, setSelectedInstitute] = useState("");
    const [institutes, setInstitutes] = useState([]);
    const [cols, setCols] = useState("grid-cols-1 md:grid-cols-2")

    const filteredData = selectedInstitute
        ? data.filter(item => item.institute._id === selectedInstitute)
        : data;


    // getAll Institue
    useEffect(() => {
        const getData = async () => {
            const { status, data } = await getAllSubAdmins();
            if (status === 200) {

                const formatedData = data.map((ins, i) => {
                    return {
                        label: ins.username,
                        value: ins._id
                    }
                })

                setInstitutes(formatedData)
            }
        };

        getData()
    }, []);

    //  set grid cols style in the state
    useEffect(() => {
        setCols(colsStyle)
    }, [colsStyle])

    return (
        <div className="space-y-6 w-full ">
            {/* Institute Filter Select */}
            <div className="w-full bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                    <div className="h-9 w-9 flex items-center justify-center rounded-full bg-blue-600 text-white text-lg">
                        🎓
                    </div>
                    <h3 className="text-lg font-semibold text-blue-700">
                        আপনার কলেজ নির্বাচন করুন
                    </h3>
                </div>

                <p className="text-sm text-blue-600 mb-3">
                    কলেজ বাছাই করলে শুধুমাত্র সেই প্রতিষ্ঠানের কার্যক্রমগুলো দেখাবে।
                </p>

                <Select
                    onValueChange={(value) => setSelectedInstitute(value)}
                >
                    <SelectTrigger className="w-full h-11 border-blue-300 focus:ring-2 focus:ring-blue-500 text-base">
                        <SelectValue placeholder="🎓 আপনার কলেজ নির্বাচন করুন" />
                    </SelectTrigger>

                    <SelectContent className="max-h-64">
                        {institutes.map((inst, idx) => (
                            <SelectItem
                                key={idx}
                                value={inst.value}
                                className="cursor-pointer text-[15px]"
                            >
                                {inst.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>


            {/* Services Cards */}
            <div className={`grid ${cols} gap-4`}>

                <ServicesCard servicesData={filteredData} />
            </div>
        </div>
    );
}
