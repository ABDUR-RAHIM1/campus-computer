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

export default function ApplyButton({ serviceData }) {
    const { showToast, studentIsLogin: loginStatus, studentInfo } = useContext(globalContext);
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


    const handleSubmit = async () => {
        if (!selectedDepartment) {
            showToast("error", "দয়া করে একটি বিভাগ নির্বাচন করুন।");
            return;
        }

        setWaiting(true);

        try {
            const payload = {
                method: "POST",
                endpoint: orderPostGetall,
                body: {
                    serviceId: serviceData._id,
                    department: selectedDepartment.department,
                    collegeFee: selectedDepartment.collegeFee,
                    subjectFee: selectedDepartment.subjectFee,
                    chargeFee: selectedDepartment.chargeFee,
                    totalFee: finalTotalFee,
                    // isOthersStudent: formData.isOthersStudent,
                    profileId: formData.profile._id
                },
            };

            const { status, data } = await PostAction(payload);
            showToast(status, data);
            setOpen(false);
            // setSelectedDepartment(null); // Reset after submit
        } catch (error) {
            console.log(error);
        } finally {
            setWaiting(false);
        }
    };


    return (
        <Dialog open={open} onOpenChange={(val) => {
            setOpen(val);
            if (!val) setSelectedDepartment(null); // Reset when modal closes
        }}
        >
            <DialogTrigger asChild>
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
            </DialogTrigger>

            <DialogContent className="w-[90vw] max-w-3xl h-[80vh] overflow-y-auto"
                onInteractOutside={(event) => {
                    event.preventDefault(); // বাইরে ক্লিক করলে modal বন্ধ হবে না
                }}

            >
                <DialogHeader>
                    <DialogTitle>বিভাগ নির্বাচন করুন</DialogTitle>
                </DialogHeader>

                {/* <div className=" my-5">
                    <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                        <Checkbox
                            onCheckedChange={(checked) => setFormData((prev) => ({
                                ...prev,
                                isOthersStudent: !!checked
                            }))}
                            checked={formData.isOthersStudent}
                            id="toggle-2"
                            defaultChecked
                            className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                        />
                        <div className="grid gap-1.5 font-normal">
                            <p className="text-sm leading-none font-medium">
                                অন্য শিক্ষার্থীর জন্য অর্ডার দিচ্ছেন ?
                            </p>
                            <p className="text-muted-foreground text-sm">
                                যদি আপনার নিজের জন্য হয় তাহলে টিক দেওয়ার দরকার নেই।
                            </p>
                        </div>
                    </Label>

                </div> */}


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
                        onClick={handleSubmit}
                        className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                        disabled={waiting || !formData.profile?._id}
                    >
                        {waiting ? <Spinner /> : "নিশ্চিত করুন"}
                    </Button>
                }
            </DialogContent>
        </Dialog>
    );
}
