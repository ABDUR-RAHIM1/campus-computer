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
export default function SelectedSection() {

    const { setIsProfileMatch, serviceData, setOrderDataForPayment } = useContext(globalContext);
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


    const isMatch = selectedDepartment && formData.profile?._id && selectedDepartment?.department === formData?.profile?.department

    //  profile match in services information
    useEffect(() => {
        if (isMatch) {
            setIsProfileMatch(true)
        } else {
            setIsProfileMatch(false)
        }
    }, [isMatch])


    // setOrderDataForPayment (contextApi)
    useEffect(() => {

        // ২. সকল ডেটা একটি অবজেক্টে সংগ্রহ করা
        const orderData = {
            serviceId: serviceData?._id,
            department: selectedDepartment?.department,
            collegeFee: selectedDepartment?.collegeFee,
            subjectFee: selectedDepartment?.subjectFee,
            chargeFee: selectedDepartment?.chargeFee,
            totalFee: finalTotalFee,
            profileId: formData?.profile?._id,
        };


        setOrderDataForPayment(orderData);
    }, [selectedDepartment])


    if (!serviceData || Object.keys(serviceData).length === 0) {
        return (
            <div className="w-full min-h-screen my-10 flex flex-col items-center justify-center gap-3">
                <div className="w-full p-5 rounded-md border border-red-700 bg-red-50 text-center space-y-1.5">
                    <h2 className=" text-2xl font-medium">আপনার অধীনে কোন সার্ভিস নেই!</h2>
                    <p>পুনরায় প্রফাইল থেকে সার্ভিস বাছাই করুন</p>

                    <Button
                        asChild
                        className="bg-blue-600 text-white hover:bg-blue-700 rounded-full"
                    >
                        <Link href="/profile">
                            সার্ভিস পেজে যান
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }




    return (
        <div className=" my-4">

            <h2 className="my-4 text-lg md:text-2xl font-medium underline">নিয়ম মেনে সঠিকভাবে আবেদন নিশ্চিত করুন </h2>

            <SelectGroup>
                <SelectLabel>
                    প্রোফাইল নির্বাচন করুন
                </SelectLabel>
                <Select

                    onValueChange={handleProfileChange}
                >
                    <SelectTrigger className="w-full border border-green-400">
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



            <div className=" my-3 rounded-md w-full border border-green-400 bg-green-100 text-green-900 p-3 ">
                {
                    formData.profile?._id ?
                        <div className=" text-[12px] capitalize">
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
                isMatch &&
                <>
                    <div
                        className="hidden md:block py-5 px-3 rounded-md w-full mt-4 bg-green-600 hover:bg-green-700 text-white cursor-not-allowed"
                    >
                        ডানদিকে পেমেন্ট তথ্য দিয়ে আবেদন নিশ্চিত করুন
                    </div>
                    <div
                        className="block md:hidden py-5 px-3 rounded-md w-full mt-4 bg-green-600 hover:bg-green-700 text-white cursor-not-allowed"
                    >
                        নিচে পেমেন্ট তথ্য দিয়ে আবেদন নিশ্চিত করুন
                    </div>
                </>
            }
        </div>
    )
}
