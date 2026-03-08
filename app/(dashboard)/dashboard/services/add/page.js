"use client";

import React, { useContext, useEffect, useState } from "react";
import { globalContext } from "@/contextApi/ContextApi";
import { getDepartmentsByProgram } from "@/LocalDatabase/departments";
import { getYearsByProgram } from "@/LocalDatabase/year";
import { servicesActions, servicesPostGetAll } from "@/constans";
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
    DialogTrigger,
} from "@/components/ui/dialog";
import InputField from "@/utilities/InputField";
import TextareaField from "@/utilities/TextareaField";
import SelectField from "@/utilities/SelectField";
import Spinner from "@/utilities/Spinner";
import { Plus, Trash2, Save, GraduationCap, Archive, Edit2, Info } from "lucide-react";
import { feeCalculation } from "@/utilities/FeeCalculation";

import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"


// যদি এডিট করতে চান তবে initialData প্রপস হিসেবে পাঠাতে পারেন
export default function AddServicePage({ mood = "add", initialData = null }) {
    const { showToast } = useContext(globalContext);
    const [departments, setDepartments] = useState([]);
    const [year, setYear] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [institutes, setInstitutes] = useState([]);
    const [open, setOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const [deparmentData, setDepartmentData] = useState({
        department: "",
        collegeFee: 0,
        subjectFee: 0,
        chargeFee: 0,
        processingFee: 0,
        // rocketBillerCharge: 0,
        // totalFee: 0,
    });

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

    // 🔄 আগের ডাটা লোড করার জন্য useEffect
    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                institute: initialData.institute?._id || initialData.institute,
                requiredDocuments: Array.isArray(initialData.requiredDocuments)
                    ? initialData.requiredDocuments.join(", ")
                    : initialData.requiredDocuments
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

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


    const handleDepartmentChange = (e) => {
        const { name, value } = e.target;
        const newData = { ...deparmentData, [name]: value };

        // ১. সব ফি গুলোর সাব-টোটাল (বিলার চার্জ ছাড়া)
        // const subTotal = Number(newData.collegeFee || 0) +
        //     Number(newData.subjectFee || 0) +
        //     Number(newData.processingFee || 0) +
        //     Number(newData.chargeFee || 0);

        // const billerCharge = rocketBillerChargeCalculate(subTotal);
        // newData.rocketBillerCharge = billerCharge;

        // newData.totalFee = subTotal + billerCharge;

        setDepartmentData(newData);
    };
    console.log(deparmentData)

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
        setFormData((prev) => {
            // ১. আগের সব ডাটা কপি করে নিন
            let updatedFees = [...prev.departmentFees];

            if (editIndex !== null) {
                // ২. যদি এডিট মোড হয়, তবে নির্দিষ্ট ইনডেক্সে নতুন ডাটা বসিয়ে দিন
                updatedFees[editIndex] = deparmentData;
                setEditIndex(null); // কাজ শেষ হলে ইনডেক্স রিসেট করুন
            } else {
                // ৩. যদি নতুন ডাটা হয়, তবে আগের মতোই শেষে যোগ করুন
                updatedFees.push(deparmentData);
            }

            return {
                ...prev,
                departmentFees: updatedFees
            };
        });

    };

    // =======  Depertment & fee Update ======= 

    const handleEditClick = (index, data) => {
        setDepartmentData(data);
        setEditIndex(index)
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
            requiredDocuments: formData.requiredDocuments.split(",").map((doc) => doc.trim()),
        };

        const isEditMood = initialData && mood === "update"

        try {

            const payload = {
                method: isEditMood ? "PUT" : "POST",
                endpoint: isEditMood ? servicesActions + initialData._id : servicesPostGetAll,
                body: finalData
            };

            const { status, data } = await PostActionAdmin(payload);
            showToast(status, data);
            if (status === 200) setOpen(false);
        } catch (error) {
            console.log("failed to post services: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 px-6 rounded-2xl flex items-center gap-2 shadow-lg shadow-blue-100 transition-all active:scale-95">
                    {initialData ? <Archive size={20} /> : <Plus size={20} />}
                    {mood === "update" ? "সার্ভিস আপডেট করুন" : "সার্ভিস যুক্ত করুন"}

                </Button>
            </DialogTrigger>

            {/* 📏 Width বাড়াতে max-w-4xl অথবা max-w-5xl ব্যবহার করুন */}
            <DialogContent className="max-w-4xl md:w-[90%] w-[95%] max-h-[95vh] overflow-hidden rounded-[2.5rem] p-0 border-none shadow-2xl flex flex-col">

                <DialogHeader className="p-8 bg-blue-600 text-white flex-shrink-0">
                    <DialogTitle className="text-3xl font-black uppercase tracking-tight flex items-center gap-3">
                        <GraduationCap size={32} />
                        {initialData ? "সার্ভিস আপডেট করুন" : "নতুন সার্ভিস যুক্ত করুন"}
                    </DialogTitle>
                    <p className="text-blue-100 text-sm font-bold uppercase tracking-widest mt-1 italic">
                        সার্ভিস আইডি: {initialData?._id || "নতুন"}
                    </p>
                </DialogHeader>

                <div className="p-4 space-y-8 overflow-y-auto flex-grow bg-white">
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
                                { label: "Irregular Form Fillup", value: "irregular_form_fillup" },
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

                    {/* 💰 ফী সেটআপ সেকশন - আগের ডাটা সহ */}
                    <div className="bg-blue-50/50 p-3 rounded-[2rem] border-2 border-dashed border-blue-100 space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-sm font-black uppercase tracking-widest text-blue-600 flex items-center gap-2">
                                <Save size={18} /> বিভাগ ও ফী লিস্ট
                            </h3>
                            <span className="text-[10px] bg-blue-600 text-white px-3 py-1 rounded-full font-bold uppercase">
                                মোট বিভাগ: {formData.departmentFees.length}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-2 rounded-2xl shadow-sm">
                            <div className="col-span-2">
                                <SelectField label="বিভাগ" name="department" value={deparmentData.department} onChange={handleDepartmentChange} options={departments} />
                            </div>

                            <InputField label="কলেজ ফি" name="collegeFee" type="number" value={deparmentData.collegeFee} onChange={handleDepartmentChange} />

                            <InputField label="সাবজেক্ট ফি" name="subjectFee" type="number" value={deparmentData.subjectFee} onChange={handleDepartmentChange} />

                            <InputField label="স্টাফ ফি (প্রসেসিং)" name="processingFee" type="number" value={deparmentData.processingFee} onChange={handleDepartmentChange} />

                            <InputField label="চার্জ ফি" name="chargeFee" type="number" value={deparmentData.chargeFee} onChange={handleDepartmentChange} />
                        </div>

                        <Button type="button" onClick={handleAddMultipleDepartmentDataInformState} className={`w-full ${editIndex !== null ? "bg-yellow-600 hover:bg-yellow-700" : "bg-blue-600 hover:bg-blue-700"} text-white font-bold rounded-xl py-6 shadow-lg shadow-blue-100 transition-transform active:scale-[0.98]`}>
                            {editIndex !== null ? "তালিকায় ডাটা আপডেট করুন" : "তালিকায় ডাটা যুক্ত করুন"}
                        </Button>

                        {formData.departmentFees.length > 0 && (
                            <div className="border border-blue-100 rounded-[1.5rem] overflow-hidden bg-white shadow-sm">
                                <Table>
                                    <TableHeader className="bg-blue-50">
                                        <TableRow>
                                            <TableHead className="font-black text-blue-800 text-xs">DEPARTMENT</TableHead>
                                            <TableHead className="font-black text-blue-800 text-xs text-center">SubTotal</TableHead>
                                            <TableHead className="text-right font-black text-blue-800 text-xs px-6">REMOVE</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {formData.departmentFees.map((d, i) => {
                                            const { collegeFee, subjectFee, processingFee, chargeFee } = d;
                                            const { subTotal, rocketBillerCharge, totalFee } = feeCalculation(collegeFee, subjectFee, processingFee, chargeFee);

                                            return (
                                                <TableRow key={i} className="hover:bg-gray-50 transition-colors">
                                                    <TableCell className="font-bold text-gray-700 uppercase text-xs">{d.department}</TableCell>
                                                    <TableCell className="font-black text-center text-blue-600">

                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <button className="text-blue-700 outline-none flex items-center gap-1 ml-auto active:scale-95 transition-transform border-b border-dashed border-blue-400 cursor-help">
                                                                    ৳{subTotal} <Info size={14} className="text-blue-300" />
                                                                </button>
                                                            </PopoverTrigger>
                                                            <PopoverContent align="end" className="w-72 p-4 rounded-2xl shadow-2xl border-2 z-50">
                                                                <div className="space-y-3">
                                                                    <p className="text-xs font-black text-gray-800 border-b pb-2 text-center uppercase tracking-widest">পেমেন্ট ব্রেকডাউন</p>

                                                                    <div className="flex justify-between text-xs text-gray-500">
                                                                        <span>মূল ফি (নোটিশ অনুযায়ী):</span>
                                                                        <span className="font-bold">৳{subTotal}</span>
                                                                    </div>

                                                                    <div className="flex justify-between text-xs text-red-600 bg-red-50 p-2 rounded-lg font-bold">
                                                                        <span> Porcessing চার্জ (অফিস):</span>
                                                                        <span>৳{processingFee}</span>
                                                                    </div>
                                                                    <div className="flex justify-between text-xs text-blue-600 bg-blue-50 p-2 rounded-lg font-bold">
                                                                        <span>সার্ভিস চার্জ:</span>
                                                                        <span>৳{chargeFee}</span>
                                                                    </div>

                                                                    <div className="flex justify-between text-xs text-amber-600 bg-amber-50 p-2 rounded-lg font-bold">
                                                                        <span>বিলার চার্জ (রকেট):</span>
                                                                        <span>৳{rocketBillerCharge}</span>
                                                                    </div>

                                                                    <div className="border-t-2 border-dashed pt-2 flex justify-between text-sm font-black text-gray-900">
                                                                        <span>সর্বমোট প্রদেয়:</span>
                                                                        <span className="text-emerald-600 text-lg">৳{totalFee}</span>
                                                                    </div>

                                                                  
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </TableCell>


                                                    <TableCell className="text-right px-6">
                                                        <button onClick={() => handleRemoveFeeClick(i)} className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-lg transition-all">
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </TableCell>
                                                    <TableCell className="text-right px-6">
                                                        <button onClick={() => handleEditClick(i, d)} className={`${editIndex === i ? "bg-yellow-500 text-white" : ""} bg-red-50 text-yellow-800 hover:bg-yellow-500 hover:text-white p-2 rounded-lg transition-all`}>
                                                            <Edit2 size={16} />
                                                        </button>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
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

