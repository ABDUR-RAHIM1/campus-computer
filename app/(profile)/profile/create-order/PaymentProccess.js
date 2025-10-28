"use client";

import { PostAction } from '@/actions/students/PostAction';
import { orderPostGetall } from '@/constans';
import { globalContext } from '@/contextApi/ContextApi';
import Spinner from '@/utilities/Spinner';
import React, { useContext, useState } from 'react';

// Receiving Number (Defined once)
const RECEIVING_NUMBER = "01321040273";

// Payment Methods
const paymentMethods = [
    { value: 'Bkash', label: 'বিকাশ (bKash)' },
    { value: 'Nagad', label: 'নগদ (Nagad)' },
    { value: 'Rocket', label: 'রকেট (Rocket)' },
];

// Reusable Copyable Number Display Component
const CopyableNumberDisplay = ({ number }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(number);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div
            className="flex items-center justify-center p-3 border-2 border-dashed border-green-500 rounded-lg bg-green-50 cursor-pointer hover:bg-green-100 transition-all relative"
            onClick={handleCopy}
            title="কপি করতে ক্লিক করুন"
        >
            <span className="text-xl font-extrabold text-green-700 select-none">
                {number}
            </span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 ml-3 text-green-600"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 16.5H18a2.25 2.25 0 0 0 2.25-2.25V7.5a2.25 2.25 0 0 0-2.25-2.25H12.75V16.5Z" />
            </svg>
            {isCopied && (
                <span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full shadow-lg whitespace-nowrap z-10 animate-pulse">
                    কপি!
                </span>
            )}
        </div>
    );
};


export default function PaymentProccess() {

    const {
        showToast, 
        finalTotalFee,
        orderDataForPayment
    } = useContext(globalContext);


    const [formData, setFormData] = useState({
        method: '',
        amount: '',
        senderNumber: '',
        txnId: '',
    });

    const [waiting, setWaiting] = useState(false);
    const [localMessage, setLocalMessage] = useState({ text: '', type: '' });

    const amountToPay = orderDataForPayment?.totalFee || 0;

    const feeToPay = finalTotalFee || amountToPay;



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ১. পেমেন্ট ফিল্ড ভ্যালিডেশন
        if (!formData.method || !formData.amount || !formData.senderNumber || !formData.txnId) {
            showToast("error", "অনুগ্রহ করে পেমেন্ট ডিটেইলসের সকল ফিল্ড পূরণ করুন।");
            return;
        }

        // ২. টাকার পরিমাণের ভ্যালিডেশন (Amount Validation)
        const submittedAmount = parseFloat(formData.amount);
        if (submittedAmount < amountToPay) {
            showToast("error", `প্রদেয় টাকার পরিমাণ ৳${amountToPay} এর কম হতে পারবে না।`);
            return;
        }

        // ৩. আপনার মূল অর্ডারের ভ্যালিডেশন
        if (!orderDataForPayment) {
            showToast("error", "দয়া করে একটি বিভাগ নির্বাচন করুন।");
            return;
        }

        // ৪. সব ঠিক থাকলে সাবমিট শুরু
        setWaiting(true);

        try {
            const body = {
                ...orderDataForPayment,
                payment: formData
            }

            const payload = {
                method: "POST",
                endpoint: orderPostGetall,
                body: body
            };

            const { status, data } = await PostAction(payload);

            showToast(status, data || "মেসেজ খুঁজে পাওয়া যায়নি");

            setLocalMessage({ text: data.message || "পেমেন্ট তথ্য সফলভাবে জমা দেওয়া হয়েছে।", type: status });



            // ফর্ম রিসেট
            // setFormData({
            //     method: '',
            //     amount: '',
            //     senderNumber: '',
            //     trxId: '',
            // });



        } catch (error) {
            console.error("Payment submission failed:", error);
            showToast("error", error.message || "পেমেন্ট জমা দিতে সমস্যা হয়েছে।");
            setLocalMessage({ text: "পেমেন্ট জমা দিতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।", type: "error" });
        } finally {
            setWaiting(false);
        }
    };


    return (
        <div className="my-10 max-w-xl mx-2 md:mx-auto p-6 bg-white shadow-lg rounded-xl border border-blue-200">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">ম্যানুয়াল পেমেন্ট ফর্ম</h2>

            {/* Total Amount Display */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-300 rounded-lg text-center">
                <p className="text-lg font-semibold text-gray-700">
                    আপনাকে মোট পরিশোধ করতে হবে:
                </p>
                <p className="text-3xl font-extrabold text-blue-600 mt-1">
                    ৳ {amountToPay.toLocaleString('bn-BD')}
                </p>
            </div>

            {/* Receiving Number Section */}
            <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-md">
                <p className="font-semibold text-lg text-gray-800 mb-2 text-center">
                    টাকা পাঠানোর জন্য <span className="text-red-500">আমাদের একাউন্ট নম্বর:</span>
                </p>
                <CopyableNumberDisplay number={RECEIVING_NUMBER} />
                <p className="text-sm text-center text-gray-600 mt-2">
                    অনুগ্রহ করে এই নম্বরে আপনার পেমেন্টটি সম্পন্ন করুন <span className='text-red-500 font-bold'>(শুধুমাত্র- Send Money)</span> এবং ট্রানজেকশন আইডিটি নিচে জমা দিন।
                </p>
            </div>

            {/* --- */}

            {/* ফিডব্যাক মেসেজ */}
            {localMessage.text && (
                <div
                    className={`p-3 mb-4 rounded-lg ${localMessage.type === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'
                        }`}
                >
                    {localMessage.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* 1. Payment Method Selection (Dropdown) */}
                <div>
                    <label htmlFor="method" className="block text-sm font-medium text-gray-700 mb-1">
                        পেমেন্ট মেথড নির্বাচন করুন <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="method"
                        name="method"
                        value={formData.method}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-150 ease-in-out bg-white"
                    >
                        <option value="" disabled>-- নির্বাচন করুন --</option>
                        {paymentMethods.map(method => (
                            <option key={method.value} value={method.value}>
                                {method.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 2. Amount - User Input */}
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                        আপনার পাঠানো টাকার পরিমাণ (Amount) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        min={amountToPay}
                        placeholder={`ন্যূনতম ${amountToPay} টাকা`}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-150 ease-in-out"
                    />
                    {/* Dynamic validation hint */}
                    {formData.amount && parseFloat(formData.amount) < amountToPay && (
                        <p className="text-sm text-red-600 mt-1">প্রদেয় টাকার পরিমাণ ৳{amountToPay} এর কম।</p>
                    )}
                </div>

                {/* 3. Sender Number */}
                <div>
                    <label htmlFor="senderNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        যে নম্বর থেকে টাকা পাঠানো হয়েছে <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="senderNumber"
                        name="senderNumber"
                        value={formData.senderNumber}
                        onChange={handleChange}
                        required
                        pattern="^01[3-9]\d{8}$"
                        placeholder="যেমন: ০১৭********"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-150 ease-in-out"
                    />
                    <p className="text-xs text-gray-500 mt-1">অনুগ্রহ করে পেমেন্ট করার সময় ব্যবহৃত সম্পূর্ণ নম্বরটি দিন।</p>
                </div>

                {/* 4. txnId */}
                <div>
                    <label htmlFor="txnId" className="block text-sm font-medium text-gray-700 mb-1">
                        ট্রানজেকশন আইডি (txnId) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="txnId"
                        name="txnId"
                        value={formData.txnId}
                        onChange={handleChange}
                        required
                        placeholder="TrxID, যেমন: F3G4H5J6K7"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-150 ease-in-out"
                    />
                    <p className="text-xs text-gray-500 mt-1">পেমেন্ট সফল হলে আপনার মেসেজে এই আইডিটি পাবেন।</p>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-[1.01]"
                    disabled={waiting}
                >
                    {waiting ? <Spinner /> : "পেমেন্ট নিশ্চিত করুন"}
                </button>
            </form>

            <div className="mt-6 pt-4 border-t text-sm text-gray-600 text-center">
                <p>⚠️ দ্রষ্টব্য: এই তথ্যগুলি জমা দেওয়ার পর কর্তৃপক্ষ ম্যানুয়ালি যাচাই করবে।</p>
            </div>
        </div>
    );
}