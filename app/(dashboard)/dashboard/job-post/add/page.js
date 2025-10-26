"use client";

import { useContext, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PostActionAdmin } from "@/actions/admins/PostAction";
import { jobPostCreateGetAll } from "@/constans";
import { globalContext } from "@/contextApi/ContextApi";

export default function JobPostForm() {
    const { showToast } = useContext(globalContext);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        payPaymentPrice: 0,
        charge: 0,
        totalPrice: 0,
        noticeLink: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        const updatedData = {
            ...formData,
            [name]: value,
        };

        if (name === "payPaymentPrice" || name === "charge") {
            const pay = name === "payPaymentPrice" ? Number(value) : Number(formData.payPaymentPrice);
            const ch = name === "charge" ? Number(value) : Number(formData.charge);
            updatedData.totalPrice = pay + ch;
        }

        setFormData(updatedData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {

            const payload = {
                method: "POST",
                endpoint: jobPostCreateGetAll,
                body: formData
            }

            const { status, data } = await PostActionAdmin(payload);

            showToast(status, data)

            if (status === 200) {
                setFormData({
                    title: "",
                    description: "",
                    payPaymentPrice: 0,
                    charge: 0,
                    totalPrice: 0,
                    noticeLink: "",
                });
            };

        } catch (err) {
            setMessage(`❌ ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    
    return (
        <div className="max-w-md mx-auto my-10 p-6 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">জব পোস্ট তৈরি করুন</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Title</label>
                    <Input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Pay Payment Price</label>
                    <Input
                        type="number"
                        name="payPaymentPrice"
                        value={formData.payPaymentPrice}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Charge</label>
                    <Input
                        type="number"
                        name="charge"
                        value={formData.charge}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Total Price</label>
                    <Input
                        type="number"
                        name="totalPrice"
                        value={formData.totalPrice}
                        readOnly
                        className="bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Notice Link</label>
                    <Input
                        type="text"
                        name="noticeLink"
                        value={formData.noticeLink}
                        onChange={handleChange}
                        required
                    />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "পোস্ট করা হচ্ছে..." : "পোস্ট করুন"}
                </Button>
            </form>

            {message && <p className="mt-3 text-center">{message}</p>}
        </div>
    );
}
