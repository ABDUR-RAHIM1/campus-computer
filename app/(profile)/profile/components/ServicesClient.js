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
            <div className=" py-4 border rounded-md my-4 p-3">
                <p className=" mb-2 text-sm">আপনার কলেজ নির্বাচন করে কার্যক্রম গুলো দেখুন</p>
                <Select onValueChange={(value) => setSelectedInstitute(value)} className={"w-full md:w-full"}>
                    <SelectTrigger>
                        <SelectValue placeholder="Institute নির্বাচন করুন" />
                    </SelectTrigger>

                    <SelectContent>
                        {institutes.map((inst, idx) => (
                            <SelectItem key={idx} value={inst.value}>
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
