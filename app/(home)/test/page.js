"use client"
import { Input } from '@/components/ui/input';
import React from 'react'

export default function TestPage() {
    const admissionService = {
        id: 101,
        serviceName: "Honours 1st Year Admission 2026",
        deadline: "2026-03-15",
        serviceCharge: 150,
        formFields: [
            {
                id: "f1",
                label: "SSC Roll Number",
                type: "number",
                placeholder: "Enter your SSC roll",
                required: true
            },
            {
                id: "f2",
                label: "Education Board",
                type: "select",
                options: ["Dhaka", "Rajshahi", "Dinajpur", "Chattogram"],
                required: true
            },
            {
                id: "f3",
                label: "Marksheet Copy",
                type: "file",
                required: true
            }
        ]
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // FormData ব্যবহার করে সব ডাটা একসাথে সংগ্রহ করা
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        console.log("Submitted Data:", data);
        alert("আবেদনটি জমা হয়েছে! ড্যাশবোর্ডে ডাটা চেক করুন।");
        // এখানে আপনি আপনার API কল করতে পারেন ডাটা সেভ করার জন্য
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-5">

            {/* Form Builder  */}
            <div className=' my-10'>
                <form onSubmit>
                    <div className='heading border p-1 space-y-1.5 '>
                        <Input name={"serviceName"} placeholder={"Serviece Name"} />
                        <Input name={"deadline"} placeholder={"Deadline"} />
                        <Input name={"seviceCharge"} placeholder={"serviceCharge"} />

                    </div>
                </form>
            </div>
            {/* Form Builder  */}



            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                {/* হেডার সেকশন */}
                <div className="bg-blue-600 p-4 text-white">
                    <h2 className="text-xl font-bold">{admissionService.serviceName}</h2>
                    <p className="text-sm opacity-90">শেষ সময়: {admissionService.deadline}</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {admissionService.formFields.map((field) => (
                        <div key={field.id} className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">
                                {field.label} {field.required && <span className="text-red-500">*</span>}
                            </label>

                            {/* যদি টাইপ select হয় */}
                            {field.type === "select" ? (
                                <select
                                    name={field.label}
                                    required={field.required}
                                    className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="">সিলেক্ট করুন</option>
                                    {field.options.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            ) : (
                                /* বাকি সব ইনপুট টাইপের জন্য (text, number, file) */
                                <input
                                    name={field.label}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                    className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                            )}
                        </div>
                    ))}

                    <div className="pt-4">
                        <div className="flex justify-between items-center mb-4 p-3 bg-yellow-50 rounded-md border border-yellow-200">
                            <span className="text-sm text-gray-600">সার্ভিস চার্জ:</span>
                            <span className="font-bold text-gray-800">{admissionService.serviceCharge} TK</span>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition duration-200 shadow-md"
                        >
                            আবেদন জমা দিন
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
}