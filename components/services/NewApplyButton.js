"use client";
import { PostAction } from "@/actions/students/PostAction";
import { Button } from "@/components/ui/button";
import { orderPostGetall } from "@/constans";
import { globalContext } from "@/contextApi/ContextApi";
import Spinner from "@/utilities/Spinner";
import React, { useContext, useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { DialogTrigger } from "@radix-ui/react-dialog";
import { getMyAllProfile } from "@/handlers/profile";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewApplyButton() {
    const router = useRouter();
    const { showToast, studentIsLogin: loginStatus, setTotalAmount , servicesData , setOrderDataForPayment  } = useContext(globalContext);
    const [open, setOpen] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [formData, setFormData] = useState({
        // isOthersStudent: false,
        profile: null
    })


    const [profileList, setProfileList] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [finalTotalFee, setFinalTotalFee] = useState(0);


    //  profile dropdown change
    const handleProfileChange = (profile) => {

        setFormData((prev) => ({
            ...prev,
            profile: profile
        }))
    }


    const handleSelectDepartment = (value) => {
        setSelectedDepartment(value);
        const imporoveSub = formData.profile && formData.profile.improvementSubjects?.length || 0;
        const imporveFeeCount = Number(imporoveSub) * Number(value.subjectFee || 0);
        const totalFee = imporveFeeCount + Number(value.chargeFee || 0) + Number(value.collegeFee || 0)
        setFinalTotalFee(totalFee);
        setTotalAmount(totalFee)
    }


    useEffect(() => {
        const getMyProfileList = async () => {
            try {
                const { status, data } = await getMyAllProfile();

                if (status === 200) {
                    setProfileList(data)
                }

            } catch (error) {
                console.log(error)
            }
        };
        getMyProfileList()
    }, [])


    const handleProceedToPayment = () => {
        // ১. প্রাথমিক ভ্যালিডেশন
        if (!selectedDepartment) {
            showToast("error", "দয়া করে একটি বিভাগ নির্বাচন করুন।");
            return;
        }
        if (!formData.profile?._id) {
            showToast("error", "দয়া করে একটি প্রোফাইল নির্বাচন করুন।");
            return;
        }

        // ২. সকল ডেটা একটি অবজেক্টে সংগ্রহ করা
        const orderData = {
            serviceId: serviceData._id,
            department: selectedDepartment.department,
            collegeFee: selectedDepartment.collegeFee,
            subjectFee: selectedDepartment.subjectFee,
            chargeFee: selectedDepartment.chargeFee,
            totalFee: finalTotalFee,
            profileId: formData.profile._id,
            // আপনি চাইলে সম্পূর্ণ প্রোফাইল ডেটা বা ডিপার্টমেন্ট ডেটা এখানে সংরক্ষণ করতে পারেন
            selectedDepartmentDetails: selectedDepartment,
            selectedProfileDetails: formData.profile
        };

        // ৩. Context-এ ডেটা সংরক্ষণ করা
        setOrderDataForPayment(orderData); // 🚨 এই ফাংশনটি Context-এ থাকতে হবে

        // ৪. পেমেন্ট পেজে রিডাইরেক্ট করা
        router.push("/profile/payment");
    };
    // --- `handleProceedToPayment` ফাংশন সমাপ্ত ---





    // const handleSubmit = async () => {
    //     if (!selectedDepartment) {
    //         showToast("error", "দয়া করে একটি বিভাগ নির্বাচন করুন।");
    //         return;
    //     }

    //     setWaiting(true);

    //     try {
    //         const payload = {
    //             method: "POST",
    //             endpoint: orderPostGetall,
    //             body: {
    //                 serviceId: serviceData._id,
    //                 department: selectedDepartment.department,
    //                 collegeFee: selectedDepartment.collegeFee,
    //                 subjectFee: selectedDepartment.subjectFee,
    //                 chargeFee: selectedDepartment.chargeFee,
    //                 totalFee: finalTotalFee,
    //                 // isOthersStudent: formData.isOthersStudent,
    //                 profileId: formData.profile._id
    //             },
    //         };

    //         const { status, data } = await PostAction(payload);
    //         showToast(status, data);
    //         setOpen(false);
    //         // setSelectedDepartment(null); // Reset after submit
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setWaiting(false);
    //     }
    // };


    return (
        <Dialog open={open} onOpenChange={(val) => {
            setOpen(val);
            if (!val) setSelectedDepartment(null); // Reset when modal closes
        }}
        >
            {/* <DialogTrigger asChild>
                <Button
                    onClick={(e) => {
                        if (!loginStatus) {
                            e.preventDefault(); // modal open বন্ধ করে দিবে
                            showToast(401, "দয়া করে আগে লগইন করুন");
                            return;
                        }
                        setOpen(true);
                    }}
                    className="min-w-[130px] mt-4 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition cursor-pointer"
                >
                    আবেদন করুন
                </Button>
            </DialogTrigger> */}

            <DialogContent className="w-[90vw] max-w-3xl h-[80vh] overflow-y-auto"
                onInteractOutside={(event) => {
                    event.preventDefault(); // বাইরে ক্লিক করলে modal বন্ধ হবে না
                }}

            >
                <DialogHeader>
                    <DialogTitle>বিভাগ নির্বাচন করুন</DialogTitle>
                </DialogHeader>


                <div className=" my-4">
                    <SelectGroup>
                        <SelectLabel>
                            প্রোফাইল নির্বাচন করুন
                        </SelectLabel>
                        <Select

                            onValueChange={handleProfileChange}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="এখান থেকে প্রোফাইল বাছাই করুন" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectLabel>
                                    {
                                        profileList && profileList?.length > 0 ?
                                            "আপনার প্রোফাইল তালিকা"
                                            :
                                            " আপনি এখনো কোন প্রোফাইল তৈরি করেননি  "
                                    }
                                </SelectLabel>
                                {
                                    profileList && profileList.map((profile) => (
                                        <SelectItem
                                            key={profile._id} value={profile}>
                                            {profile.studentName || "N/A"}
                                        </SelectItem>
                                    ))

                                }
                            </SelectContent>
                        </Select>

                    </SelectGroup>
                </div>


                <div className=" mb-3 rounded-md w-full border border-green-400 bg-green-100 text-green-900 p-3 ">
                    {
                        formData.profile?._id ?
                            <div className=" text-[12px]">
                                <p>নাম: {formData.profile?.studentName}</p>
                                <p>বিভাগ: {formData.profile?.department}</p>
                                {formData.profile.improvementSubjects.length > 0 && <p> ইম্প্রুভ আছেঃ {formData.profile.improvementSubjects?.length} -টি</p>}
                            </div>
                            :
                            <p className=" text-[12px]">
                                প্রোফাইল নির্বাচন করলে এখানে নাম ও বিভাগ দেখাবে , সে অনুযায়ী নিচের দেওয়া বিভাগ গুলো থেকে বাছাই করুন
                            </p>

                    }
                </div>

                <div className="space-y-4">
                    {selectedDepartment ? (
                        <div
                            className={`border p-3 rounded  ${selectedDepartment.department === formData?.profile?.department
                                ? "bg-green-100 border-green-500"
                                : "bg-red-100 border-red-500"
                                }`}

                        >
                            <div className="flex items-center justify-between flex-wrap">
                                <p className="font-medium">{selectedDepartment.department}</p>
                                <p
                                    className={`text-sm underline ${selectedDepartment.department === formData?.profile?.department
                                        ? "text-green-600"
                                        : "text-red-600"
                                        }`}
                                >
                                    {selectedDepartment.department === formData?.profile?.department
                                        ? "✅ আপনার বিভাগ"
                                        : "⚠ এটি আপনার বিভাগ নয়"}
                                </p>
                            </div>

                            <p className="text-sm text-gray-600">
                                কলেজ ফি: {selectedDepartment.collegeFee}৳
                            </p>
                            <p className="text-sm text-gray-600">
                                প্রতি সাবজেক্ট ফি: {selectedDepartment.subjectFee}৳
                            </p>
                            <p className="text-sm text-gray-600">
                                চার্জ ফি: {selectedDepartment.chargeFee}৳
                            </p>
                            <p className="text-sm text-gray-600">মোট ফি: {finalTotalFee}৳</p>


                            <div className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                                {selectedDepartment.department === formData?.profile?.department ? (
                                    <p>
                                        <ArrowDown size={14} className="inline-block" />
                                        নিশ্চিত করুন বাটনে ক্লিক করুন
                                    </p>
                                ) : (
                                    <p
                                        className="cursor-pointer"
                                        onClick={() => setSelectedDepartment(null)}>
                                        "← পরিবর্তন করতে ক্লিক করুন"
                                    </p>
                                )}
                            </div>
                        </div>
                    ) : (
                        serviceData.departmentFees?.map((dept, i) => {
                            const isSelected = formData?.profile?.department === dept.department;
                            const selectStyle =
                                "border border-green-400 bg-green-100 text-green-900";
                            const selectText = "আপনার বিভাগ";

                            return (
                                <div
                                    key={i}
                                    onClick={() => handleSelectDepartment(dept)}
                                    className={`border p-3 rounded cursor-pointer hover:border-blue-400 ${isSelected ? selectStyle : ""
                                        } `}
                                >
                                    <div className="flex items-center justify-between flex-wrap">
                                        <p className="font-medium">{dept.department}</p>
                                        <p className="text-sm underline">{isSelected && selectText}</p>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        কলেজ ফি: {dept.collegeFee}৳
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        প্রতি সাবজেক্ট ফি: {dept.subjectFee}৳
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        চার্জ ফি: {dept.chargeFee}৳
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        মোট ফি: {dept.totalFee}৳
                                    </p>
                                </div>
                            );
                        })
                    )}
                </div>




                {
                    selectedDepartment && formData.profile?._id && selectedDepartment?.department === formData?.profile?.department &&
                    
                    <Button
                        onClick={handleProceedToPayment} // 🚨 এখানে পরিবর্তিত ফাংশন ব্যবহার করুন
                        className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                        disabled={!formData.profile?._id}
                    >
                        পরবর্তী ধাপে যান
                    </Button>

                }
            </DialogContent>
        </Dialog>
    );
}
