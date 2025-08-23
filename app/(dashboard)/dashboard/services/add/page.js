"use client";

import { Button } from "@/components/ui/button";
import InputField from "@/utilities/InputField";
import SelectField from "@/utilities/SelectFiled";
import React, { useContext, useEffect, useState } from "react";
import { getDepartmentsByProgram } from "@/LocalDatabase/departments";
import { sessionList } from "@/LocalDatabase/seasion";
import { getYearsByProgram } from "@/LocalDatabase/year";
import { servicesPostGetAll } from "@/constans";
import { globalContext } from "@/contextApi/ContextApi";
import Spinner from "@/utilities/Spinner";
import { PostActionAdmin } from "@/actions/admins/PostAction";
import { instituteList } from "@/LocalDatabase/Institute";
import { getAllSubAdmins } from "@/handlers/subAdmins";



export default function AddServicePage() {
    const { showToast } = useContext(globalContext)
    const [departments, setDepartments] = useState([]);
    const [year, setYear] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [institutes, setInstitutes] = useState([]);
    const [deparmentData, setDepartmentData] = useState({
        department: "",
        collegeFee: 0,
        subjectFee: 0,
        chargeFee: 0,
        totalFee: 0,
    });
    const [formData, setFormData] = useState({
        type: "",
        institute: "",
        title: "",
        description: "",
        program: "",
        departmentFees: [],
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

    // getAll Institue/ subAdmins
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
    }, [])



    //  departmentChange
    const handleDepartmentChange = (e) => {
        const { name, value } = e.target;

        const newData = {
            ...deparmentData,
            [name]: value
        }

        newData.totalFee = Number(newData.collegeFee) + Number(newData.subjectFee) + Number(newData.chargeFee);
        setDepartmentData(newData)

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

    const handleAddMultipleDepartmentDataInformState = () => {
        setFormData((prev) => ({
            ...prev,
            departmentFees: [...prev.departmentFees, deparmentData]
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const finalData = {
            ...formData,
            requiredDocuments: formData.requiredDocuments
                .split(",")
                .map((doc) => doc.trim()),
        };

        try {

            const payload = {
                method: "POST",
                endpoint: servicesPostGetAll,
                body: finalData
            }
            const { status, data } = await PostActionAdmin(payload);
            showToast(status, data)
            console.log(data)

        } catch (error) {
            console.log("failed t post servies: ", error)
        } finally {
            setIsLoading(false)
        }


    };


    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10 flex items-start justify-center">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8 border">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    🎓 নতুন সার্ভিস যুক্ত করুন
                </h2>




                <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-1">


                    <SelectField
                        label="ধরন"
                        name="institute"
                        value={formData.institute}
                        onChange={handleChange}
                        required
                        options={institutes}
                    />
                    <SelectField
                        label="ধরন"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        options={[
                            { label: "নিয়মিত", value: "নিয়মিত" },
                            { label: "অনিয়মিত", value: "অনিয়মিত" },
                            { label: "মান-উন্নায়ন", value: "মান-উন্নায়ন" },
                            { label: "অন্যান্য", value: "অন্যান্য" },
                        ]}
                    />

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


                    {/*  depertment and fees */}
                    <div className=" border my-5 py-4 px-1">
                        <div className=" grid grid-cols-2 gap-2">
                            <SelectField
                                label="📚 বিভাগ"
                                name="department"
                                value={deparmentData.department}
                                onChange={handleDepartmentChange}
                                required
                                options={departments}
                            />
                            <InputField
                                label=" কলেজ ফি (৳)"
                                name="collegeFee"
                                type="number"
                                value={deparmentData.collegeFee}
                                onChange={handleDepartmentChange}
                                required
                            />
                            <InputField
                                label=" সাবজেক্ট ফি (যদি থাকে)"
                                name="subjectFee"
                                type="number"
                                value={deparmentData.subjectFee}
                                onChange={handleDepartmentChange}

                            />
                            <InputField
                                label="চার্জ ফি (৳)"
                                name="chargeFee"
                                type="number"
                                value={deparmentData.chargeFee}
                                onChange={handleDepartmentChange}
                                required
                            />
                        </div>

                        <div className=" text-center">
                            <Button onClick={handleAddMultipleDepartmentDataInformState} type={"button"} className={" text-sm my-3 cursor-pointer"}>
                                যুক্ত করুন
                            </Button>
                        </div>
                    </div>


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
                        label="প্রয়োজনীয় ডকুমেন্ট (কমা দিয়ে আলাদা করুন)"
                        name="requiredDocuments"
                        placeholder="আধার কার্ড, আবেদন ফরম, সনদ"
                        value={formData.requiredDocuments}
                        onChange={handleChange}
                        required
                    />

                    <Button
                        type="submit"
                        className={`w-full  my-20 bg-green-600 text-white font-semibold rounded hover:bg-green-700 ${isLoading ? " cursor-progress" : " cursor-pointer"}`}
                    >
                        {
                            isLoading ? <Spinner /> : "✅ সাবমিট করুন"
                        }
                    </Button>
                </form>
            </div>
        </div>
    );
}
