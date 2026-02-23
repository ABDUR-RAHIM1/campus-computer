"use client";
import { PostActionAdmin } from "@/actions/admins/PostAction";
import { Button } from "@/components/ui/button";
import { adminLogin } from "@/constans";
import { globalContext } from "@/contextApi/ContextApi";
import InputField from "@/utilities/InputField";
import Spinner from "@/utilities/Spinner";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { LockKeyhole, ShieldAlert, Smartphone } from "lucide-react";

export default function AdminAuth() {
    const { showToast } = useContext(globalContext);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [formData, setFormData] = useState({
        phone: "",
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
        setIsLoading(true);
        try {
            const payload = {
                method: "POST",
                endpoint: adminLogin,
                body: formData
            };

            const { status, data } = await PostActionAdmin(payload);
            showToast(status, data);

            if (data?.token) {
                router.push("/dashboard");
            }

        } catch (error) {
            console.log("Failed to login admin/moderator");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden">
            {/* Background Decorative Circles */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -ml-20 -mt-20"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -mr-20 -mb-20"></div>

            <div className="w-full max-w-md z-10 px-4">
                {/* Logo or Title Area */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-600 shadow-xl shadow-blue-500/20 mb-6">
                        <LockKeyhole size={40} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
                        অ্যাডমিন <span className="text-blue-500">প্যানেল</span>
                    </h2>
                    <p className="text-gray-400 font-medium mt-2">আপনার ক্রেডেনশিয়াল ব্যবহার করে লগইন করুন</p>
                </div>

                {/* Login Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-blue-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <Smartphone size={14} /> ফোন নাম্বার
                            </label>
                            <InputField
                                name="phone"
                                type="phone"
                                placeholder="01*********"
                                value={formData.phone}
                                onChange={(e) => handleChange("phone", e.target.value)}
                                className="bg-white/10 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500 h-14 rounded-2xl"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-blue-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <LockKeyhole size={14} /> পাসওয়ার্ড
                            </label>
                            <InputField
                                name="password"
                                type="password"
                                placeholder="********"
                                value={formData.password}
                                onChange={(e) => handleChange("password", e.target.value)}
                                className="bg-white/10 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500 h-14 rounded-2xl"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Spinner /> : (
                                <>
                                    লগইন করুন <ShieldAlert size={20} />
                                </>
                            )}
                        </Button>
                    </form>
                </div>

                {/* Footer Link */}
                <div className="mt-8 text-center">
                    <button 
                        onClick={() => router.push("/")}
                        className="text-gray-500 hover:text-blue-400 text-sm font-bold transition-colors uppercase tracking-widest"
                    >
                        ← মেইন ওয়েবসাইটে ফিরে যান
                    </button>
                </div>
            </div>
        </div>
    );
}