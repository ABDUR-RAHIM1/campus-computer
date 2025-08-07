"use client";

import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PostAction } from "@/actions/students/PostAction";
import { orderCencel } from "@/constans";
import { globalContext } from "@/contextApi/ContextApi";
import Spinner from "@/utilities/Spinner";

export function CancelOrderDialog({ orderId, isOpen, setIsOpen }) {
    const [isLoading, setIsLoading] = useState(false);
    const { showToast } = useContext(globalContext);

    const [formData, setFormData] = useState({
        recivedNumber: "",
        reason: ""
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true) 
        if (!formData.recivedNumber || !formData.reason) {
            alert("দয়া করে সব ফিল্ড পূরণ করুন");
            return;
        }

        try {

            const payload = {
                method: "PUT",
                endpoint: orderCencel + orderId,
                body: formData
            }
            const { status, data } = await PostAction(payload);
            showToast(status, data)

        } catch (error) {
            console.log("failed to cencel Order")
        } finally {
            setIsLoading(false)
        }

        // শেষ হলে modal বন্ধ
        setIsOpen(false);
    };
 

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
           
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>অর্ডার বাতিল করুন</DialogTitle>
                        <DialogDescription className="space-y-1 text-gray-600 text-sm leading-relaxed">
                        </DialogDescription>

                        <ul className=" list-disc ml-4 text-left">
                            <li>মোবাইল নাম্বার দিন যেখানে টাকা ফেরত যাবে।</li>
                            <li>বাতিলের কারণ লিখুন।</li>
                            <li>সর্বোচ্চ ১২ ঘণ্টার মধ্যে টাকা ফেরত পাঠানো হবে।</li>
                            <li>টাকা ফেরতের ট্রান্সেকশন আইডি আপনি আপনার প্রোফাইলে দেখতে পারবেন।</li>

                        </ul>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="phone">ফেরতের বিকাশ নাম্বার</Label>
                            <Input
                                id="phone"
                                type="tel"
                                name="recivedNumber"
                                placeholder="01XXXXXXXXX"
                                value={formData.recivedNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="reason">বাতিলের কারণ</Label>
                            <Textarea
                                id="reason"
                                name="reason"
                                placeholder="আপনার বাতিলের কারণ লিখুন..."
                                rows={4}
                                value={formData.reason}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                বাতিল
                            </Button>
                        </DialogClose>
                        <Button onClick={handleSubmit} type="submit" className={" cursor-pointer "}>
                            {isLoading ? <Spinner /> : "দাখিল করুন"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
         
        </Dialog>
    );
}
