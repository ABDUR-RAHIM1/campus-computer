"use client";
import InputField from '@/utilities/InputField';
import SelectField from '@/utilities/SelectField';
import React from 'react';
import { ShieldCheck, HelpCircle, ArrowRightCircle, CreditCard, Sparkles, Layers, Bookmark } from 'lucide-react';

export default function AdmissionServiceForm({ admissionService }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
      
        alert(" এই মর্হুতে আবেদনটি গ্রহন করা যাচ্ছে না! কাজ চলমান রয়েছে।");
    };

    if (!admissionService) return null;

    return (
        <div className="max-w-6xl mx-auto my-10 p-0 md:p-4">
            <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100">

                {/* ⬅️ বাম পাশ: Information Section */}
                <div className="w-full lg:w-2/5 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 p-8 md:p-12 text-white relative">
                    <div className="relative z-10">
                        <span className="bg-blue-400/20 text-blue-100 py-1 px-3 rounded-full text-xs font-bold tracking-widest uppercase mb-4 inline-block border border-blue-400/30">
                            Admission Service
                        </span>
                        <h2 className="text-4xl font-black mb-6 leading-tight">
                            {admissionService.name || "অ্যাডমিশন ফরম"}
                        </h2>

                        <div className="space-y-6 mt-10">
                            <div className="flex gap-4">
                                <div className="bg-white/10 p-2 rounded-lg h-fit"><ShieldCheck className="text-blue-300" /></div>
                                <div>
                                    <h4 className="font-bold text-lg">নিরাপদ আবেদন</h4>
                                    <p className="text-blue-200 text-sm opacity-80">আপনার সকল তথ্য গোপন রাখা হবে এবং সরাসরি কর্তৃপক্ষের কাছে পৌঁছাবে।</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="bg-white/10 p-2 rounded-lg h-fit"><HelpCircle className="text-blue-300" /></div>
                                <div>
                                    <h4 className="font-bold text-lg">সহায়তা প্রয়োজন?</h4>
                                    <p className="text-blue-200 text-sm opacity-80">আবেদন করতে সমস্যা হলে আমাদের হেল্পলাইন <u>01611530939</u> নম্বরে যোগাযোগ করুন।</p>
                                </div>
                            </div>
                        </div>

                        {/* চার্জ কার্ড */}
                        <div className="mt-12 p-6 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
                            <p className="text-[10px] font-bold uppercase opacity-70 tracking-widest">Payable Service Charge</p>
                            <div className="flex items-end gap-2 mt-1">
                                <span className="text-4xl font-black text-blue-100">৳{admissionService.serviceCharge}</span>
                                <span className="text-sm opacity-70 mb-1">/আবেদন</span>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
                </div>

                {/* ➡️ ডান পাশ: Form Section */}
                <div className="w-full lg:w-3/5 p-8 md:p-12 bg-white">
                    <div className="mb-8">
                        <h3 className="text-2xl font-black text-gray-800 flex items-center gap-2 tracking-tighter">
                            আবেদন ফর্ম পূরণ করুন <ArrowRightCircle className="text-blue-600" size={20} />
                        </h3>
                        <p className="text-gray-500 font-medium text-sm mt-1">সঠিক তথ্য দিয়ে নিচের ফর্মটি সম্পন্ন করুন।</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* 🆕 নতুন যুক্ত হওয়া ফিল্ড: Service Type & Name */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50 mb-8">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-black text-blue-600 uppercase tracking-wider flex items-center gap-1">
                                    <Layers size={14} /> আবেদনের ধরন
                                </label>
                                <input
                                    type="text"
                                    name="serviceType"
                                    value={admissionService.type || "Admission"}
                                    readOnly
                                    className="bg-transparent font-bold text-gray-700 outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-1 border-l-0 md:border-l md:pl-5 border-blue-100">
                                <label className="text-xs font-black text-blue-600 uppercase tracking-wider flex items-center gap-1">
                                    <Bookmark size={14} /> সেবার নাম
                                </label>
                                <input
                                    type="text"
                                    name="serviceName"
                                    value={admissionService.serviceName}
                                    readOnly
                                    className="bg-transparent font-bold text-gray-700 outline-none"
                                />
                            </div>
                        </div>

                        {/* ডাইনামিক ফর্ম ফিল্ডস */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {admissionService.formFields.map((field, index) => (
                                <div
                                    key={field.id || index}
                                    className={`flex flex-col ${field.type === "file" ? "md:col-span-2" : ""}`}
                                >
                                    {field.type === "select" ? (
                                        <SelectField
                                            label={field.label}
                                            name={field.label}
                                            required={field.required}
                                            options={field.options}
                                            className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-blue-500 outline-none transition-all font-medium"
                                        />
                                    ) : (
                                        <InputField
                                            label={field.label}
                                            name={field.label}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            required={field.required}
                                            className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-blue-500 outline-none transition-all font-medium"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="pt-8">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-[1.2rem] shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-2 group active:scale-[0.98] text-lg"
                            >
                                <Sparkles size={20} className="group-hover:animate-pulse" />
                                আবেদন জমা দিন
                            </button>
                            <p className="text-center text-[11px] text-gray-400 mt-5 font-medium">
                                "আবেদন জমা দিন" বাটনে ক্লিক করলে আপনার তথ্যগুলো আমাদের ডাটাবেজে সংরক্ষিত হবে এবং আমাদের টিম কাজ শুরু করবে।
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}