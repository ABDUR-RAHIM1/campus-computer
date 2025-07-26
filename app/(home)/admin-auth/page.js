"use client";
import { PostActionAdmin } from "@/actions/admins/PostAction";
import { Button } from "@/components/ui/button";
import { adminLogin } from "@/constans";
import { globalContext } from "@/contextApi/ContextApi";
import InputField from "@/utilities/InputField";
import Spinner from "@/utilities/Spinner";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

export default function AdminAuth() {
    const { showToast } = useContext(globalContext);
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {

            const payload = {
                method: "POST",
                endpoint: adminLogin,
                body: formData
            };

            const { status, data } = await PostActionAdmin(payload)
            showToast(status, data)

            if (data.token) {
                router.push("/dashboard")
            }

        } catch (error) {
            console.log("fialed to login admin/modaretor")
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md p-8 rounded-md w-full max-w-md space-y-6">
                <h2 className="text-2xl font-bold text-center">🔐 অ্যাডমিন লগইন</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField
                        label="ফোন নাম্বার"
                        name="phone"
                        type="phone"
                        placeholder="01*********"
                        value={formData.email}
                        onChange={(e) => handleChange("phone", e.target.value)}
                    />

                    <InputField
                        label="পাসওয়ার্ড"
                        name="password"
                        type="password"
                        placeholder="********"
                        value={formData.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                    />

                    <Button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        {
                            isLoading ? <Spinner /> : "লগইন করুন"
                        }
                    </Button>
                </form>
            </div>
        </div>
    );
}
