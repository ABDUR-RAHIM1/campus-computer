"use client";

import { Button } from "@/components/ui/button";
import InputField from "@/utilities/InputField";
import SelectField from "@/utilities/SelectFiled";
import React, { useEffect, useState } from "react";
import { getDepartmentsByProgram } from "@/LocalDatabase/departments";
import { sessionList } from "@/LocalDatabase/seasion";
import { getYearsByProgram } from "@/LocalDatabase/year";

export default function AddServicePage() {

    const [departments, setDepartments] = useState([]);
    const [year, setYear] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        program: "",
        department: "",
        classYear: "",
        session: "",
        fee: "",
        requiredDocuments: "", 
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };


    // deparment filter using Program
    // ekhane formData.program er name ar departments.json er program nam same thakte hobe , tobei ata kaj korbe.
    useEffect(() => {
        if (formData.program) {
            const filterdDeparment = getDepartmentsByProgram(formData.program);
            const filteredYear = getYearsByProgram(formData.program);
            setYear(filteredYear)
            setDepartments(filterdDeparment);
        }
    }, [formData.program])

    const sessionOptions = sessionList.map((s) => ({
        label: s,
        value: s,
    }));



    const handleSubmit = (e) => {
        e.preventDefault();

        const finalData = {
            ...formData,
            requiredDocuments: formData.requiredDocuments
                .split(",")
                .map((doc) => doc.trim()),
        };

        console.log("✅ Submitted data:", finalData);
        // API call here...
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10 flex items-start justify-center">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8 border">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    🎓 নতুন সার্ভিস যুক্ত করুন
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-1">
                    <InputField
                        label=" শিরোনাম"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                    <InputField
                        label="বিস্তারিত বিবরণ"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />

                    <SelectField
                        label="🏛️ প্রোগ্রাম (অনার্স/ডিগ্রি/ইন্টারমেডিয়েট)"
                        name="program"
                        value={formData.program}
                        onChange={handleChange}
                        required
                        options={[
                            { label: "অনার্স", value: "honors" },
                            { label: "ডিগ্রি", value: "degree" },
                            { label: "ইন্টারমেডিয়েট", value: "intermediate" },
                        ]}
                    />


                    <SelectField
                        label="📚 বিভাগ"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                        options={departments}
                    />


                    <SelectField
                        label="📚 বর্ষ"
                        name="classYear"
                        value={formData.classYear}
                        onChange={handleChange}
                        required
                        options={year}
                    />

                    <SelectField
                        label="📚 সেশন"
                        name="session"
                        value={formData.session}
                        onChange={handleChange}
                        required
                        options={sessionOptions}
                    />

                    <InputField
                        label="ফি (৳)"
                        name="fee"
                        type="number"
                        value={formData.fee}
                        onChange={handleChange}
                        required
                    />
                    <InputField
                        label="প্রয়োজনীয় ডকুমেন্ট (কমা দিয়ে আলাদা করুন)"
                        name="requiredDocuments"
                        placeholder="আধার কার্ড, আবেদন ফরম, সনদ"
                        value={formData.requiredDocuments}
                        onChange={handleChange}
                        required
                    />

                    <Button
                        type="submit"
                        className="w-full  my-20 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
                    >
                        ✅ সাবমিট করুন
                    </Button>
                </form>
            </div>
        </div>
    );
}
