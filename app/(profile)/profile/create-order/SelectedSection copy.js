"use client";
import { globalContext } from "@/contextApi/ContextApi";
import React, { useContext, useEffect, useState, useCallback } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getMyAllProfile } from "@/handlers/profile";
import { Label } from "@/components/ui/label";
import { feeCalculation } from "@/utilities/FeeCalculation";
import { ArrowDown, AlertCircle, CheckCircle2, School, BookOpen, Settings, BadgeDollarSign, XCircle } from "lucide-react";

export default function SelectedSection() {
    const { setIsProfileMatch, setOrderDataForPayment, showToast } = useContext(globalContext);
    const [serviceData, setServiceData] = useState(null);
    const [profileList, setProfileList] = useState([]);
    const [formData, setFormData] = useState({ profile: null });
    const [orderScope, setOrderScope] = useState("office_copy");
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [fee, setFee] = useState({ subTotal: 0, rocketBillerCharge: 0, totalFee: 0, chargeFee: 0 });

    const isImprovementService = serviceData?.type === "improvement_form_fillup" || serviceData?.type === "অনিয়মিত";

    useEffect(() => {
        const getData = localStorage.getItem("pending_order");
        if (getData) {
            try {
                const decodedData = decodeURIComponent(escape(atob(getData)));
                const data = JSON.parse(decodedData)?.serviceData || null;
                setServiceData(data);

                // ডাটা লোড হওয়ার সাথে সাথে পেমেন্ট স্টেট রিসেট করুন
                setOrderDataForPayment(null);
                setFee({ subTotal: 0, rocketBillerCharge: 0, totalFee: 0, chargeFee: 0 });
            } catch (e) {
                console.error("Data Parse Error", e);
            }
        }

        const getMyProfileList = async () => {
            try {
                const { status, data } = await getMyAllProfile();
                if (status === 200) setProfileList(data);
            } catch (error) { console.log("Profile Load Error:", error); }
        };
        getMyProfileList();
    }, []);

    const calculateAndSetFee = useCallback((dept, currentProfile, currentScope) => {
        if (!dept || !currentProfile) return;

        const improvementCount = currentProfile?.improvementSubjects?.length || 0;
        const baseCollegeFee = Number(dept.collegeFee || 0);
        const baseSubjectFee = Number(dept.subjectFee || 0);
        const baseProcessingFee = Number(dept.processingFee || 0);
        let baseChargeFee = Number(dept.chargeFee || 0);

        if (currentScope === "full_service") baseChargeFee *= 2;

        const finalSubjectFee = isImprovementService ? baseSubjectFee * improvementCount : baseSubjectFee;
        const result = feeCalculation(baseCollegeFee, finalSubjectFee, baseProcessingFee, baseChargeFee);

        setFee({ ...result, chargeFee: baseChargeFee });

        setOrderDataForPayment({
            serviceId: serviceData?._id,
            serviceType: serviceData?.type,
            department: dept.department,
            collegeFee: baseCollegeFee,
            subjectFee: finalSubjectFee,
            processingFee: baseProcessingFee,
            chargeFee: baseChargeFee,
            subTotal: result.subTotal, // new 
            billerCharge: result.rocketBillerCharge,
            totalFee: result.totalFee,
            profileId: currentProfile._id,
            orderType: currentScope
        });
    }, [isImprovementService, serviceData, setOrderDataForPayment]);

    const handleProfileChange = (profile) => {
        setFormData({ profile });
        setSelectedDepartment(null);
        setErrorMsg("");
    };

    const handleSelectDepartment = (dept) => {
        if (!formData.profile) {
            setErrorMsg("আগে একটি প্রোফাইল নির্বাচন করুন");
            showToast(500, "আগে একটি প্রোফাইল নির্বাচন করুন");
            return;
        }

        const improvementCount = formData.profile?.improvementSubjects?.length || 0;
        if (isImprovementService && improvementCount === 0) {
            setErrorMsg("আপনার প্রোফাইলে কোন ইম্প্রুভমেন্ট সাবজেক্ট নেই।");
            showToast(500, "আপনার প্রোফাইলে কোন ইম্প্রুভমেন্ট সাবজেক্ট নেই।");
            return;
        };

        setSelectedDepartment(dept);
        setErrorMsg("");
        calculateAndSetFee(dept, formData.profile, orderScope);
    };

    const handleScopeChange = (e) => {
        const newScope = e.target.value;
        setOrderScope(newScope);
        if (selectedDepartment) {
            calculateAndSetFee(selectedDepartment, formData.profile, newScope);
        }
    };

    // ডিপার্টমেন্ট ম্যাচ চেক
    const isDeptMatch = selectedDepartment && formData.profile && selectedDepartment.department === formData.profile.department;
    const canProceed = isDeptMatch && (isImprovementService ? (formData.profile?.improvementSubjects?.length > 0) : true);

    useEffect(() => {
        setIsProfileMatch(canProceed);
    }, [canProceed, setIsProfileMatch]);

    if (!serviceData) return <div className="text-center p-10">লোড হচ্ছে...</div>;

    return (
        <div className="my-4 max-w-2xl mx-auto p-0">
            <h2 className="mb-6 text-xl md:text-2xl font-bold text-gray-800 border-l-4 border-green-500 pl-3">
                আবেদন প্রক্রিয়া নিশ্চিত করুন
            </h2>

            {/* প্রোফাইল সিলেকশন */}
            <div className="space-y-2 mb-6">
                <Label className="text-sm font-semibold text-gray-700">প্রোফাইল নির্বাচন করুন</Label>
                <Select onValueChange={handleProfileChange}>
                    <SelectTrigger className="w-full border-2 border-green-200 h-12 rounded-xl bg-white shadow-sm">
                        <SelectValue placeholder="আপনার প্রোফাইল বাছাই করুন" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {profileList.map((p) => (
                                <SelectItem key={p._id} value={p}>{p.studentName} ({p.department})</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {/* সার্ভিস ডেলিভারি অপশন */}
            <div className="mb-6 p-2 bg-blue-50 border border-blue-100 rounded-xl shadow-sm">
                <Label className="font-bold text-blue-800 mb-2 block">সার্ভিস ডেলিভারি মেথড</Label>
                <select
                    value={orderScope}
                    onChange={handleScopeChange}
                    className="w-full p-2.5 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                    <option value="office_copy"> কলেজ কপি</option>
                    <option value="full_service"> সম্পূর্ণ আবেদন </option>
                </select>
                <p className={` ${orderScope === "full_service" ? "bg-green-50 text-green-500" : "bg-red-100 text-red-500"} my-2 text-sm  w-full p-2 rounded-md`}>
                    {
                        orderScope === "full_service"
                            ? "আপনার আবেদন সম্পন্ন হওয়ার পর আমাদের প্রতিনিধি আপনার পক্ষ থেকে প্রয়োজনীয় কাগজপত্র কলেজে জমা দিয়ে আসবে।"
                            : "আমরা আপনার আবেদন সম্পন্ন করে রাখব। পরে আমাদের কাছ থেকে কাগজপত্র সংগ্রহ করে আপনাকে নিজে কলেজে জমা দিতে হবে।"
                    }
                </p>
            </div>

            {errorMsg && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm flex items-center gap-2">
                    <AlertCircle size={18} /> {errorMsg}
                </div>
            )}

            {/* ডিপার্টমেন্ট লিস্ট */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-gray-600 italic">
                        {canProceed ? "আপনার নির্বাচিত বিভাগ:" : "বিভাগ নিশ্চিত করুন:"}
                    </label>
                    {selectedDepartment && (
                        <button
                            onClick={() => setSelectedDepartment(null)}
                            className="text-xs flex items-center gap-1 text-red-500 hover:text-red-700 font-bold"
                        >
                            <XCircle size={14} /> পরিবর্তন করুন
                        </button>
                    )}
                </div>

                {serviceData.departmentFees?.map((dept, i) => {
                    const isDeptMatchLocal = formData.profile?.department === dept.department;
                    const isSelected = selectedDepartment?.department === dept.department;
                    const improvementCount = formData.profile?.improvementSubjects?.length || 0;

                    // লজিক: যদি সঠিক ডিপার্টমেন্ট সিলেক্ট হয়, তবে অন্যগুলো হাইড হবে
                    if (canProceed && !isSelected) return null;

                    return (
                        <div
                            key={i}
                            onClick={() => !isSelected && handleSelectDepartment(dept)}
                            className={`relative border-2 p-4 rounded-2xl cursor-pointer transition-all duration-300
                                ${isSelected
                                    ? (isDeptMatchLocal ? "border-green-500 bg-green-50 shadow-md" : "border-red-400 bg-red-50")
                                    : "border-gray-200 bg-white hover:border-blue-300"}
                            `}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800">{dept.department}</h3>
                                    {isDeptMatchLocal && <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Your Dept</span>}
                                </div>
                                {isSelected && (
                                    <span className={`${isDeptMatchLocal ? 'text-green-600' : 'text-red-600'}`}>
                                        {isDeptMatchLocal ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                                    </span>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-[13px] bg-white/50 p-3 rounded-xl border border-gray-100">
                                <div className="flex items-center gap-2">
                                    <School size={14} className="text-blue-500" />
                                    <span>কলেজ ফি: <b>{dept.collegeFee}৳</b></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Settings size={14} className="text-emerald-500" />
                                    <span>প্রসেসিং: <b>{dept.processingFee}৳</b></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BadgeDollarSign size={14} className="text-orange-500" />
                                    <span>চার্জ: <b>{isSelected ? fee.chargeFee : (orderScope === "full_service" ? dept.chargeFee * 2 : dept.chargeFee)}৳</b></span>
                                </div>
                                {(isImprovementService || dept.subjectFee > 0) && (
                                    <div className="flex items-center gap-2">
                                        <BookOpen size={14} className="text-purple-500" />
                                        <span>সাবজেক্ট ফি: <b>{isImprovementService ? `${dept.subjectFee} × ${improvementCount}` : dept.subjectFee}৳</b></span>
                                    </div>
                                )}
                            </div>

                            {isSelected && (
                                <div className="mt-4 pt-4 border-t border-dashed border-gray-300">
                                    {isDeptMatchLocal ? (
                                        <div className="space-y-1 font-medium text-sm text-gray-700">
                                            <div className="flex justify-between"><span>সাব-টোটাল:</span> <span>{fee.subTotal}৳</span></div>
                                            <div className="flex justify-between text-blue-600"><span>Biller Charge (Rocket):</span> <span>{fee.rocketBillerCharge}৳</span></div>
                                            <div className="flex justify-between items-center bg-green-600 text-white p-3 rounded-xl mt-2 shadow-lg">
                                                <span className="font-bold uppercase tracking-wide text-xs">সর্বমোট ফি:</span>
                                                <span className="text-xl font-black">{fee.totalFee}৳</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-3 bg-red-100 border border-red-200 rounded-xl flex gap-2">
                                            <AlertCircle size={18} className="text-red-600 shrink-0" />
                                            <div>
                                                <p className="text-red-700 font-bold text-xs uppercase underline">বিভাগ মিলেনি!</p>
                                                <p className="text-red-600 text-[11px]">আপনার প্রোফাইলের বিভাগ <b>({formData.profile?.department})</b> এর সাথে এটি মিলছে না।</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {canProceed && (
                <div className="mt-8 p-5 rounded-2xl bg-green-600 text-white text-center font-bold shadow-xl animate-bounce flex flex-col items-center">
                    <p className="flex items-center gap-2 text-sm"> <ArrowDown size={18} /> পেমেন্ট সম্পন্ন করুন </p>
                    <p className="text-[10px] font-normal opacity-90 flex items-center gap-2"> <span className="hidden md:block">ডান পাশের</span> <span className="block md:hidden">নিচের</span>   পেমেন্ট গেটওয়ে ব্যবহার করুন</p>
                </div>
            )}
        </div>
    );
}