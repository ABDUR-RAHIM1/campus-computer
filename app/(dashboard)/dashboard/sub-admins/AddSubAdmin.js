"use client";

import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import InputField from "@/utilities/InputField";
import { PostActionAdmin } from "@/actions/admins/PostAction";
import { subAdminRegGetAll } from "@/constans";
import { globalContext } from "@/contextApi/ContextApi";
import Spinner from "@/utilities/Spinner";

export default function SubAdminForm() {
    const {showToast} = useContext(globalContext);
    const [ loading, setLoading ] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        phone: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const payload = {
                method: "POST",
                endpoint: subAdminRegGetAll,
                body: formData
            }

            const { status, data } = await PostActionAdmin(payload)

            showToast(status, data)

        } catch (error) {
            console.log("failed to create Sub Admin", error)
        } finally {
            setLoading(false)
        }

    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 bg-white rounded-lg shadow">
            <h2 className=" font-semibold">সাব এডমিন তৈরি করুন</h2>
            <InputField
                label="ইউজার নাম"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="এখানে কলজের নাম লিখুন"
                required
            />

            <InputField
                label="মোবাইল"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
                required
            />

            <InputField
                label="পাসওয়ার্ড"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="শক্তিশালী পাসওয়ার্ড দিন"
                required
            />

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer">
               {
                loading ? <Spinner/> : " তৈরি করুন"
               }
            </Button>
        </form>
    );
}
