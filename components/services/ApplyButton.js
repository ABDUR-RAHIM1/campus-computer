"use client";
import { PostAction } from "@/actions/students/PostAction";
import { Button } from "@/components/ui/button";
import { orderPostGetall } from "@/constans";
import { globalContext } from "@/contextApi/ContextApi";
import Spinner from "@/utilities/Spinner";
import React, { useContext, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function ApplyButton({ serviceData }) {
    const { showToast } = useContext(globalContext);
    const [open, setOpen] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [isOthersStudent, setIsOthersStudent] = useState(false)
    const [selectedDepartment, setSelectedDepartment] = useState(null);



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
                    fee: selectedDepartment.fee,
                    isOthersStudent: isOthersStudent
                },
            };
            const { status, data } = await PostAction(payload);
            showToast(status, data);
            setOpen(false);
            setSelectedDepartment(null); // Reset after submit
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
        }}>
            <DialogTrigger asChild>
                <Button className="min-w-[130px] mt-4 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition cursor-pointer">
                    আবেদন করুন
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-md"
                onInteractOutside={(event) => {
                    event.preventDefault(); // বাইরে ক্লিক করলে modal বন্ধ হবে না
                }}

            >
                <DialogHeader>
                    <DialogTitle>বিভাগ নির্বাচন করুন</DialogTitle>
                </DialogHeader>

                <div className=" my-5">
                    <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                        <Checkbox
                            onCheckedChange={(checked) => setIsOthersStudent(!!checked)}
                            checked={isOthersStudent}
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

                </div>

                {
                    isOthersStudent &&
                    <div className=" my-4">
                        others student
                    </div>
                }

                <div className="space-y-4">
                    {selectedDepartment ? (
                        <div
                            className="border p-3 rounded bg-blue-50 border-blue-600"
                            onClick={() => setSelectedDepartment(null)}
                        >
                            <p className="font-medium">{selectedDepartment.department}</p>
                            <p className="text-sm text-gray-600">
                                ফি: {selectedDepartment.fee}৳
                            </p>
                            <p className="text-xs text-blue-600 mt-1">
                                ← পরিবর্তন করতে ক্লিক করুন
                            </p>
                        </div>
                    ) : (
                        serviceData.departmentFees?.map((dept, i) => (
                            <div
                                key={i}
                                onClick={() => setSelectedDepartment(dept)}
                                className="border p-3 rounded cursor-pointer hover:border-blue-400"
                            >
                                <p className="font-medium">{dept.department}</p>
                                <p className="text-sm text-gray-600">ফি: {dept.fee}৳</p>
                            </div>
                        ))
                    )}
                </div>



                <Button
                    onClick={handleSubmit}
                    className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                    disabled={waiting}
                >
                    {waiting ? <Spinner /> : "নিশ্চিত করুন"}
                </Button>
            </DialogContent>
        </Dialog>
    );
}
