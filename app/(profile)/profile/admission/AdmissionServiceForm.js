"use client";
import InputField from '@/utilities/InputField';
import SelectField from '@/utilities/SelectField';
import React from 'react';
import { ShieldCheck, HelpCircle, ArrowRightCircle, Sparkles, Layers, Bookmark, Info, AlertCircle } from 'lucide-react';
import TextareaField from '@/utilities/TextareaField';

export default function AdmissionServiceForm({ admissionService }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        alert("এই মুহূর্তে আবেদনটি গ্রহণ করা যাচ্ছে না! কাজ চলমান রয়েছে।");
    };

    if (!admissionService) return null;

    return (
        <div className="max-w-6xl mx-auto my-10 p-0 md:p-4">
            <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100">

                {/* ➡️ Form Section */}
                <div className="w-full p-3 md:p-12 bg-white">
                    <div className="mb-8">
                        <h3 className="text-2xl font-black text-gray-800 flex items-center gap-2 tracking-tighter">
                            আবেদন ফর্ম পূরণ করুন <ArrowRightCircle className="text-blue-600" size={20} />
                        </h3>
                        <p className="text-gray-500 font-medium text-sm mt-1">সঠিক তথ্য দিয়ে নিচের ফর্মটি সম্পন্ন করুন।</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* 📎 রিলেটেড ফাইল এবং টেক্সট এরিয়া সেকশন (যদি থাকে) */}
                        {admissionService.reletedFile && (
                            <div className="p-2 bg-amber-50/50 rounded-3xl border border-amber-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-2 opacity-5">
                                    <AlertCircle size={80} className="text-amber-600" />
                                </div>

                                <div className="relative space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="bg-amber-100 p-2 rounded-xl text-amber-600 shrink-0">
                                            <Info size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-amber-800 text-sm uppercase tracking-tight">নির্দেশনা অনুযায়ী তথ্য প্রদান করুন</h3>
                                            <p className="text-[11px] text-amber-600 font-medium leading-relaxed mt-1">
                                                নিচের লিংকে ক্লিক করে ফাইলটি দেখুন এবং সেখানে থাকা তথ্যগুলো নিচের বক্সে <span className="underline font-bold text-red-500">নির্ভুলভাবে</span> লিখে দিন।
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 py-1">
                                        <a
                                            href={admissionService.reletedFile}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2.5 rounded-xl text-xs font-black shadow-sm border border-blue-100 hover:bg-blue-50 transition-all group"
                                        >
                                            <Bookmark size={16} className="group-hover:scale-110 transition-transform" />
                                            প্রয়োজনীয় ফাইলটি দেখুন (Open File)
                                        </a>
                                    </div>

                                    <div className="space-y-2">
                                        
                                        <TextareaField
                                            label={"ফাইলে দেওয়া তথ্যগুলো এখানে লিখুন"}
                                            name="reletedFileText"
                                            required
                                           placeholder={`Example:\nName: Abdur Rahim\nAge: 24\nRoll: 123456`}
                                            rows={4}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ডাইনামিক ফর্ম ফিল্ডস */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            <p className="text-center text-[11px] text-gray-400 mt-5 font-medium leading-relaxed">
                                "আবেদন জমা দিন" বাটনে ক্লিক করলে আপনার তথ্যগুলো আমাদের ডাটাবেজে সংরক্ষিত হবে এবং আমাদের টিম কাজ শুরু করবে।
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}