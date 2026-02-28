"use client";

import React, { useContext, useEffect, useState } from "react";
import { globalContext } from "@/contextApi/ContextApi";
import { getDepartmentsByProgram } from "@/LocalDatabase/departments";
import { getYearsByProgram } from "@/LocalDatabase/year";
import { servicesPostGetAll } from "@/constans";
import { PostActionAdmin } from "@/actions/admins/PostAction";
import { getAllSubAdmins } from "@/handlers/subAdmins";

// UI Components
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import InputField from "@/utilities/InputField";
import TextareaField from "@/utilities/TextareaField";
import SelectField from "@/utilities/SelectField";
import Spinner from "@/utilities/Spinner";
import { Trash2, Save, GraduationCap, Archive } from "lucide-react";

export default function AddServicePage({ initialData = null, open, setOpen, refreshData }) {
    const { showToast } = useContext(globalContext);
    const [departments, setDepartments] = useState([]);
    const [year, setYear] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [institutes, setInstitutes] = useState([]);

    const [deparmentData, setDepartmentData] = useState({
        department: "",
        collegeFee: 0,
        subjectFee: 0,
        chargeFee: 0,
        processingFee: 0,
        totalFee: 0,
    });
console.log(deparmentData)
    const [formData, setFormData] = useState({
        type: "",
        institute: "",
        title: "",
        description: "",
        program: "",
        departmentFees: [],
        classYear: "",
        requiredDocuments: "",
    });

    // 🔄 initialData থাকলে ফর্ম ফিল আপ হবে, না থাকলে রিসেট হবে
    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                institute: initialData.institute?._id || initialData.institute,
                requiredDocuments: Array.isArray(initialData.requiredDocuments)
                    ? initialData.requiredDocuments.join(", ")
                    : initialData.requiredDocuments
            });
        } else {
            setFormData({
                type: "",
                institute: "",
                title: "",
                description: "",
                program: "",
                departmentFees: [],
                classYear: "",
                requiredDocuments: "",
            });
        }
    }, [initialData, open]);

    // ইন্সটিটিউট লিস্ট লোড করা
    useEffect(() => {
        const getData = async () => {
            const { status, data } = await getAllSubAdmins();
            if (status === 200) {
                const formatedData = data.map((ins) => ({
                    label: ins.username,
                    value: ins._id
                }));
                setInstitutes(formatedData);
            }
        };
        getData();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleDepartmentChange = (e) => {
        const { name, value } = e.target;
        const newData = { ...deparmentData, [name]: value };
        newData.totalFee = Number(newData.collegeFee) + Number(newData.subjectFee) + Number(newData.chargeFee);
        setDepartmentData(newData);
    };

    // প্রোগ্রাম অনুযায়ী ডিপার্টমেন্ট এবং বর্ষ ফিল্টার করা
    useEffect(() => {
        if (formData.program) {
            const filterdDeparment = getDepartmentsByProgram(formData.program);
            const filteredYear = getYearsByProgram(formData.program);
            setYear(filteredYear);
            setDepartments(filterdDeparment);
        }
    }, [formData.program]);

    const handleAddMultipleDepartmentDataInformState = () => {
        if (!deparmentData.department) return alert("বিভাগ সিলেক্ট করুন");
        setFormData((prev) => ({
            ...prev,
            departmentFees: [...prev.departmentFees, deparmentData]
        }));
        setDepartmentData({ department: "", collegeFee: 0, subjectFee: 0, chargeFee: 0, totalFee: 0 });
    };

    const handleRemoveFeeClick = (indexToRemove) => {
        const updatedFees = formData.departmentFees.filter((_, index) => index !== indexToRemove);
        setFormData({ ...formData, departmentFees: updatedFees });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const finalData = {
            ...formData,
            requiredDocuments: typeof formData.requiredDocuments === 'string'
                ? formData.requiredDocuments.split(",").map((doc) => doc.trim())
                : formData.requiredDocuments,
        };

        try {
            const payload = {
                method: initialData ? "PUT" : "POST",
                endpoint: initialData ? `${servicesPostGetAll}/${initialData._id}` : servicesPostGetAll,
                body: finalData
            };
            const { status, data } = await PostActionAdmin(payload);
            showToast(status, data);
            if (status === 200) {
                setOpen(false);
                if (refreshData) refreshData(); // ডাটা রিফ্রেশ করার জন্য কলব্যাক
            }
        } catch (error) {
            console.log("Failed to process service: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-4xl md:w-[90%] w-[95%] max-h-[95vh] overflow-hidden rounded-[2.5rem] p-0 border-none shadow-2xl flex flex-col">

                <DialogHeader className="p-8 bg-blue-600 text-white flex-shrink-0">
                    <DialogTitle className="text-3xl font-black uppercase tracking-tight flex items-center gap-3">
                        <GraduationCap size={32} />
                        {initialData ? "সার্ভিস আপডেট করুন" : "নতুন সার্ভিস যুক্ত করুন"}
                    </DialogTitle>
                    <p className="text-blue-100 text-sm font-bold uppercase tracking-widest mt-1 italic">
                        মোড: {initialData ? "এডিট সার্ভিস" : "ক্রিয়েট সার্ভিস"}
                    </p>
                </DialogHeader>

                <div className="p-6 space-y-8 overflow-y-auto flex-grow bg-white">
                    {/* 📋 বেসিক ইনফো গ্রিড */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SelectField
                            label="প্রতিষ্ঠান নির্বাচন করুন"
                            name="institute"
                            value={formData.institute}
                            onChange={handleChange}
                            options={institutes}
                            required
                        />
                        <SelectField
                            label="সার্ভিসের ধরন"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            options={[
                                { label: "Admission with Form Fillup", value: "admission_with_form_fillup" },
                                { label: "Year Change Admission", value: "year_change_admission" },
                                { label: "Regular Form Fillup", value: "regular_form_fillup" },
                                { label: "Improvement Form Fillup", value: "improvement_form_fillup" },
                            ]}
                            required
                        />
                        <div className="md:col-span-2">
                            <InputField
                                label="সার্ভিস শিরোনাম (Title)"
                                name="title"
                                placeholder="উদা: অনার্স ১ম বর্ষ ফরম ফিলাপ ২০২৪"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <TextareaField
                                label="বিস্তারিত বিবরণ (Description)"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <SelectField
                            label="প্রোগ্রাম (Honors/Degree...)"
                            name="program"
                            value={formData.program}
                            onChange={handleChange}
                            options={[
                                { label: "অনার্স", value: "honors" },
                                { label: "ডিগ্রি", value: "degree" },
                                { label: "ইন্টারমেডিয়েট", value: "intermediate" },
                            ]}
                            required
                        />
                        <SelectField
                            label="বর্ষ (Year)"
                            name="classYear"
                            value={formData.classYear}
                            onChange={handleChange}
                            options={year}
                            required
                        />
                    </div>

                    {/* 💰 ফী সেটআপ সেকশন */}
                    <div className="bg-blue-50/50 p-5 rounded-[2rem] border-2 border-dashed border-blue-100 space-y-6">
                        <h3 className="text-sm font-black uppercase tracking-widest text-blue-600 flex items-center gap-2">
                            <Save size={18} /> বিভাগ ও ফী লিস্ট
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-4 rounded-2xl shadow-sm">
                            <SelectField label="বিভাগ" name="department" value={deparmentData.department} onChange={handleDepartmentChange} options={departments} />

                            <InputField label="কলেজ ফি" name="collegeFee" type="number" value={deparmentData.collegeFee} onChange={handleDepartmentChange} />

                            <InputField label="সাবজেক্ট ফি" name="subjectFee" type="number" value={deparmentData.subjectFee} onChange={handleDepartmentChange} />

                            <InputField label="স্টাফ ফি (প্রসেসিং)" name="processingFee" type="number" value={deparmentData.processingFee} onChange={handleDepartmentChange} />

                            <InputField label="চার্জ ফি" name="chargeFee" type="number" value={deparmentData.chargeFee} onChange={handleDepartmentChange} />
                        </div>

                        <Button type="button" onClick={handleAddMultipleDepartmentDataInformState} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl py-6 shadow-lg transition-all active:scale-95">
                            তালিকায় ডাটা যুক্ত করুন
                        </Button>

                        {formData.departmentFees.length > 0 && (
                            <div className="border border-blue-100 rounded-[1.5rem] overflow-hidden bg-white shadow-sm">
                                <Table>
                                    <TableHeader className="bg-blue-50">
                                        <TableRow>
                                            <TableHead className="font-black text-blue-800 text-xs">DEPARTMENT</TableHead>
                                            <TableHead className="font-black text-blue-800 text-xs text-center">FEE (SUM)</TableHead>
                                            <TableHead className="text-right font-black text-blue-800 text-xs px-6">REMOVE</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {formData.departmentFees.map((d, i) => (
                                            <TableRow key={i} className="hover:bg-gray-50 transition-colors">
                                                <TableCell className="font-bold text-gray-700 uppercase text-xs">{d.department}</TableCell>
                                                <TableCell className="font-black text-center text-blue-600">৳ {d.totalFee}</TableCell>
                                                <TableCell className="text-right px-6">
                                                    <button type="button" onClick={() => handleRemoveFeeClick(i)} className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-lg transition-all">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </div>

                    <TextareaField
                        label="প্রয়োজনীয় ডকুমেন্ট (কমা দিয়ে আলাদা করুন)"
                        name="requiredDocuments"
                        placeholder="উদা: ছবি, মার্কশিট, এডমিট কার্ড"
                        value={formData.requiredDocuments}
                        onChange={handleChange}
                        required
                    />

                    <Button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-8 rounded-[1.5rem] shadow-xl shadow-green-100 uppercase tracking-[0.2em] transition-all text-lg"
                    >
                        {isLoading ? <Spinner /> : initialData ? "✅ আপডেট নিশ্চিত করুন" : "🚀 সার্ভিস পাবলিশ করুন"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}