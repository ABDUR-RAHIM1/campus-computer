"use client";
import { Button } from "@/components/ui/button";
import { globalContext } from "@/contextApi/ContextApi";
import React, { useContext, useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { getMyAllProfile } from "@/handlers/profile";
import { ArrowDown, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function SelectedSection() {
    const { setIsProfileMatch, serviceData, setOrderDataForPayment, showToast } = useContext(globalContext);

    const [profileList, setProfileList] = useState([]);
    const [formData, setFormData] = useState({ profile: null });
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [finalTotalFee, setFinalTotalFee] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");

    // ১. সার্ভিস টাইপ চেক (Improvement কি না)
    const isImprovementService = serviceData?.type === "improvement_form_fillup" || serviceData?.type === "অনিয়মিত";





    // প্রোফাইল লিস্ট লোড করা
    useEffect(() => {
        const getMyProfileList = async () => {
            try {
                const { status, data } = await getMyAllProfile();
                if (status === 200) setProfileList(data);
            } catch (error) {
                console.log("Profile Load Error:", error);
            }
        };
        getMyProfileList();
    }, []);


    //  profile select handler
    const handleProfileChange = (profile) => {
        setFormData({ profile });
        setSelectedDepartment(null);
        setFinalTotalFee(0);
        setErrorMsg("");
    };

    //   department Handler 
    const handleSelectDepartment = (dept) => {
        if (!formData.profile) {
            setErrorMsg("আগে একটি প্রোফাইল নির্বাচন করুন");
            showToast(400, "আগে একটি প্রোফাইল নির্বাচন করুন")
            return;
        }


        // const improvementCount = (formData.profile.improvementSubjects?.length || 0) || formData.profile?.hasImprovement;  


        const hasImp = formData.profile?.hasImprovement === true;
        const subLength = formData.profile?.improvementSubjects?.length || 0;
        const improvementCount = (hasImp && subLength > 0) ? subLength : 0;

        // ইম্প্রুভমেন্ট সার্ভিস হলে এবং সাবজেক্ট না থাকলে আটকে দিবে
        if (isImprovementService && improvementCount === 0) {
            setErrorMsg("আপনার প্রোফাইলে কোন ইম্প্রুভমেন্ট সাবজেক্ট নেই।");
            showToast(404, "আপনার প্রোফাইলে কোন ইম্প্রুভমেন্ট সাবজেক্ট নেই।")
            setSelectedDepartment(null);
            return;
        }

        setSelectedDepartment(dept);
        setErrorMsg("");

        // --- ক্যালকুলেশন সংশোধন ---
        let totalFee = 0;
        const subFee = Number(dept.subjectFee || 0);
        const collegeBaseFee = Number(dept.collegeFee || 0); // আপনার লজিক অনুযায়ী এটি ১৪০০
        const charge = Number(dept.chargeFee || 0);
        if (isImprovementService) {
            // ইম্প্রুভমেন্টের ক্ষেত্রে: (১৪০০ + (৩ * ৩০০) + ২০) = ২৩২০
            totalFee = collegeBaseFee + (improvementCount * subFee) + charge;
        } else {
            // রেগুলারের ক্ষেত্রে: (১৪০০ + (১ * ৩০০) + ২০) = ১৭২০
            totalFee = collegeBaseFee + subFee + charge;
        }

        setFinalTotalFee(totalFee);
    };

    // ভ্যালিডেশন চেক (বিভাগ মিলছে কি না এবং টাইপ ঠিক আছে কি না)
    // const isDeptMatch = selectedDepartment && formData.profile && selectedDepartment.department === formData.profile.department;
    // const isEligible = isImprovementService ? (formData.profile?.improvementSubjects?.length > 0) : true;
    // const canProceed = isDeptMatch && isEligible;

    // ১. বিভাগ মিলছে কি না চেক (এটি সবার জন্য বাধ্যতামূলক)
    const isDeptMatch = selectedDepartment &&
        formData.profile &&
        selectedDepartment.department === formData.profile.department;

    // ২. ইম্প্রুভমেন্ট সার্ভিসের ক্ষেত্রে স্টুডেন্টের ইম্প্রুভমেন্ট সাবজেক্ট আছে কি না চেক
    // serviceData.type যদি "improvement_form_fillup" হয়, তবে অবশ্যই improvementSubjects থাকতে হবে
    const isImprovementServiceType = serviceData?.type === "improvement_form_fillup" || serviceData?.type === "অনিয়মিত";
    const hasImprovementSubjects = formData.profile?.improvementSubjects?.length > 0;

    // ৩. চূড়ান্ত ভ্যালিডেশন: 
    // বিভাগ মিলতে হবে এবং (যদি ইম্প্রুভমেন্ট সার্ভিস হয় তবে সাবজেক্ট থাকতে হবে, অন্যথায় দরকার নেই)
    const canProceed = isDeptMatch && (isImprovementServiceType ? hasImprovementSubjects : true);

    useEffect(() => {
        setIsProfileMatch(canProceed);
    }, [canProceed, setIsProfileMatch]);

    // পেমেন্ট ডাটা আপডেট
    useEffect(() => {
        if (selectedDepartment && formData.profile) {
            const orderData = {
                serviceId: serviceData?._id,
                serviceType: serviceData?.serviceType,
                department: selectedDepartment.department,
                collegeFee: selectedDepartment.collegeFee,
                subjectFee: selectedDepartment.subjectFee,
                chargeFee: selectedDepartment.chargeFee,
                totalFee: finalTotalFee,
                profileId: formData.profile._id,
            };
            setOrderDataForPayment(orderData);
        }
    }, [selectedDepartment, finalTotalFee, formData.profile]);

    if (!serviceData || Object.keys(serviceData).length === 0) {
        return (
            <div className="w-full min-h-screen my-10 flex flex-col items-center justify-center gap-3 p-5">
                <div className="w-full p-8 rounded-xl border-2 border-dashed border-red-200 bg-red-50 text-center space-y-4">
                    <h2 className="text-2xl font-bold text-red-700">কোন সার্ভিস পাওয়া যায়নি!</h2>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 rounded-full px-8">
                        <Link href="/profile">সার্ভিস পেজে ফিরে যান</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="my-4 max-w-2xl mx-auto p-2">
            <h2 className="my-4 text-xl md:text-2xl font-bold text-gray-800 border-l-4 border-green-500 pl-3">
                আবেদন প্রক্রিয়া নিশ্চিত করুন
                <span className="block text-sm font-normal text-gray-500 mt-1">সঠিক প্রোফাইল ও বিভাগ নির্বাচন করুন</span>
            </h2>

            {/* প্রোফাইল সিলেকশন */}
            <div className="space-y-2 mb-6">
                <label className="text-sm font-semibold text-gray-700">প্রোফাইল নির্বাচন করুন</label>
                <Select onValueChange={handleProfileChange}>
                    <SelectTrigger className="w-full border-2 border-green-200 focus:ring-green-500 h-12">
                        <SelectValue placeholder="আপনার প্রোফাইল বাছাই করুন" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>{profileList?.length > 0 ? "আপনার প্রোফাইলসমূহ" : "কোন প্রোফাইল নেই"}</SelectLabel>
                            {profileList?.map((profile) => (
                                <SelectItem key={profile._id} value={profile}>
                                    {profile.studentName} ({profile.department})
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {/* প্রোফাইল ইনফো বক্স */}
            <div className={`mb-6 rounded-lg p-4 border ${formData.profile ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                {formData.profile ? (
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <p><span className="font-semibold">নাম:</span> {formData.profile.studentName}</p>
                        <p><span className="font-semibold">বিভাগ:</span> {formData.profile.department}</p>
                        <p className="col-span-2">
                            <span className="font-semibold text-blue-700">ইম্প্রুভমেন্ট সাবজেক্ট:</span> {formData.profile.improvementSubjects?.length || 0} টি
                        </p>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                        <AlertCircle size={16} /> প্রোফাইল নির্বাচন করলে তথ্য এখানে দেখাবে
                    </p>
                )}
            </div>

            {/* এরর মেসেজ */}
            {errorMsg && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm flex items-center gap-2">
                    <AlertCircle size={18} /> {errorMsg}
                </div>
            )}

            {/* বিভাগ সিলেকশন কার্ডস */}
            <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 italic">নিচের তালিকা থেকে আপনার বিভাগটি নিশ্চিত করুন:</label>
                {serviceData.departmentFees?.map((dept, i) => {
                    const isDeptMatchLocal = formData.profile?.department === dept.department;
                    const isSelected = selectedDepartment?.department === dept.department;

                    return (
                        <div
                            key={i}
                            onClick={() => handleSelectDepartment(dept)}
                            className={`relative border-2 p-4 rounded-xl cursor-pointer transition-all ${isSelected
                                ? "border-green-600 bg-green-50 shadow-md"
                                : "border-gray-200 hover:border-blue-300 bg-white"
                                }`}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800">{dept.department}</h3>
                                    <div className="text-xs text-gray-500 mt-1 space-y-0.5">
                                        <p>কলেজ ফি: {dept.collegeFee}৳</p>
                                        <p>সাবজেক্ট ফি: {dept.subjectFee}৳ (প্রতিটি)</p>
                                        <p>সার্ভিস চার্জ: {dept.chargeFee}৳</p>
                                    </div>
                                </div>
                                {isDeptMatchLocal && (
                                    <span className="bg-green-600 text-white text-[10px] px-2 py-1 rounded-full flex items-center gap-1">
                                        <CheckCircle2 size={10} /> আপনার বিভাগ
                                    </span>
                                )}
                            </div>
                            {isSelected && (
                                <div className="mt-3 pt-3 border-t border-green-200 flex justify-between items-center">
                                    <p className="font-bold text-green-700">মোট ফি: {finalTotalFee}৳</p>
                                    {!isDeptMatchLocal && (
                                        <p className="text-[10px] text-red-500 font-bold underline">⚠ এটি আপনার প্রোফাইলের বিভাগ নয়</p>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* কনফার্মেশন বাটন */}
            {canProceed ? (
                <div className="mt-8 animate-bounce">
                    <div className="py-4 px-6 rounded-xl bg-green-600 text-white text-center font-bold shadow-lg flex items-center justify-center gap-2">
                        <ArrowDown size={20} /> <span className="block md:hidden">নিচের</span>
                        <span className="hideen md:block">ডাদ দিকের</span>
                        ফরমে পেমেন্ট সম্পন্ন করুন 
                    </div>
                </div>
            ) : (
                formData.profile && (
                    <div className="mt-8 py-4 px-6 rounded-xl bg-gray-100 text-gray-400 text-center border-2 border-dashed border-gray-300">
                        সঠিক বিভাগ নির্বাচন করুন
                    </div>
                )
            )}
        </div>
    );
}