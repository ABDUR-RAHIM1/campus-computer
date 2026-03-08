"use client";

import { PostAction } from '@/actions/students/PostAction';
import { orderPostGetall } from '@/constans';
import { globalContext } from '@/contextApi/ContextApi';
import Spinner from '@/utilities/Spinner';
import React, { useContext, useEffect, useState } from 'react';
import { CashoutChargeCalculator } from './CashoutChargeCalculator';
import { CheckCircle2, Info, Copy, Wallet } from 'lucide-react';

const RECEIVING_NUMBER = "01321040273";

const paymentMethods = [
    { value: 'Rocket', label: 'রকেট (Rocket) - ক্যাশআউট চার্জ ফ্রি' },
    { value: 'Bkash', label: 'বিকাশ (bKash)' },
    { value: 'Nagad', label: 'নগদ (Nagad)' },
];

const CopyableNumberDisplay = ({ number }) => {
    const [isCopied, setIsCopied] = useState(false);
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(number);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) { console.error('Failed to copy', err); }
    };

    return (
        <div className="flex items-center justify-center border-2 border-dashed border-green-500 rounded-xl bg-green-50 cursor-pointer hover:bg-green-100 transition-all relative p-3" onClick={handleCopy}>
            <span className="text-2xl font-black text-green-700">{number}</span>
            <Copy size={20} className="ml-3 text-green-600" />
            {isCopied && <span className="absolute -top-3 bg-green-600 text-white text-[10px] px-2 py-1 rounded-full animate-bounce">কপি হয়েছে!</span>}
        </div>
    );
};
export default function PaymentProccess() {
    const { showToast, isProfileMatch, orderDataForPayment } = useContext(globalContext);

    console.log(orderDataForPayment)
    const [formData, setFormData] = useState({
        method: '',
        amount: '',
        senderNumber: '',
        txnId: '',
    });

    const [waiting, setWaiting] = useState(false);
    const [localMessage, setLocalMessage] = useState({ text: '', type: '' });

    // --- 📌 স্মার্ট ক্যালকুলেশন লজিক ---
    const baseAmount = orderDataForPayment?.totalFee || 0;

    // ১. রকেট খরচ: রকেট বিলার চার্জ (হাজারে ১৩ টাকা) যা সবার থেকে নেওয়া হবে

    // ২. ইউজারের খরচ: বিকাশ/নগদ হলে ক্যাশআউট চার্জ যোগ হবে (হাজারে ১৮.৫০ টাকা)
    const cashoutExtra = CashoutChargeCalculator(baseAmount);

    // ৩. ফাইনাল প্রদেয় টাকা
    const totalPayable = (formData.method === 'Bkash' || formData.method === 'Nagad')
        ? (baseAmount + cashoutExtra)
        : baseAmount;

    // ৪. সাশ্রয় (বিকাশ/নগদ বনাম রকেট)
    const userSavings = (formData.method === 'Rocket') ? cashoutExtra : 0;

    // মেথড পাল্টালে অটোমেটিক অ্যামাউন্ট আপডেট
    useEffect(() => {
        if (baseAmount > 0 && formData.method) {
            setFormData(prev => ({ ...prev, amount: totalPayable }));
        }
    }, [formData.method, baseAmount, totalPayable]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePaymentDetails = () => {
        // ১. ডাটা থেকে বেসিক ভ্যালুগুলো নেওয়া
        const collegeFee = Number(orderDataForPayment.collegeFee) || 0;
        const subjectFee = Number(orderDataForPayment.subjectFee) || 0;
        const officialFee = Number(orderDataForPayment.processingFee) || 0;
        const serviceCharge = Number(orderDataForPayment.chargeFee) || 0;
        const billerCharge = Number(orderDataForPayment.billerCharge) || 0;

        // ২. সার্ভিস থেকে আসা নিট ফি (বিলার চার্জ সহ কিন্তু ক্যাশআউট চার্জ ছাড়া)
        const serviceTotal = Number(orderDataForPayment.totalFee) || 0;

        // ৩. ক্যাশআউট চার্জ ক্যালকুলেশন (শুধুমাত্র রকেট বাদে অন্য মেথডের জন্য)
        const isRocket = formData.method === "Rocket";
        const cashOutCharge = !isRocket ? CashoutChargeCalculator(serviceTotal) : 0;

        // ৪. ফাইনাল অ্যামাউন্ট (যেটা ইউজারকে পাঠাতে হবে)
        const finalTotalPayable = serviceTotal + cashOutCharge;

        // ৫. সাবজেক্ট সংখ্যা বের করা (সঠিক ব্রেকডাউন দেখানোর জন্য)
        const fixedFees = collegeFee + officialFee + serviceCharge + billerCharge;
        const subjectsAmount = serviceTotal - fixedFees;
        const estimatedSubCount = subjectFee > 0 ? Math.round(subjectsAmount / subjectFee) : 0;

        alert(`
        --- পেমেন্ট ব্রেকডাউন ---
        
        কলেজ মূল ফি: ${collegeFee}৳
        অফিস প্রসেসিং ফি: ${officialFee}৳
        ${estimatedSubCount > 0 ? `সাবজেক্ট ফি: ${subjectFee}৳ × ${estimatedSubCount}টি = ${subjectsAmount}৳` : `সাবজেক্ট ফি: ${subjectsAmount}৳`}
        আমাদের সার্ভিস চার্জ: ${serviceCharge}৳
        রকেট বিলার চার্জ: ${billerCharge}৳ 
        -----------------------------------
        নিট সার্ভিস ফি: ${serviceTotal}৳
        ক্যাশআউট চার্জ: ${isRocket ? "০৳ (রকেট স্পেশাল)" : `${cashOutCharge}৳ (${formData.method})`} 
        -----------------------------------
        সর্বমোট প্রদেয়: ${finalTotalPayable}৳
        
        ${isRocket
                ? "বিঃদ্রঃ রকেট পে-বিলের মাধ্যমে পেমেন্ট করলে আলাদা কোনো ক্যাশআউট খরচ লাগে না।"
                : `বিঃদ্রঃ ${formData.method} এ পেমেন্ট করলে ক্যাশআউট চার্জসহ টাকা পাঠাতে হয়।`
            }
    `);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.method || !formData.amount || !formData.senderNumber || !formData.txnId) {
            showToast("error", "সবগুলো ফিল্ড সঠিকভাবে পূরণ করুন।");
            return;
        }
        if (parseFloat(formData.amount) < totalPayable) {
            showToast("error", `অ্যামাউন্ট ৳${totalPayable} এর কম হওয়া যাবে না।`);
            return;
        }

        setWaiting(true);
        try {
            const body = {
                ...orderDataForPayment,
                payment: formData,
                cashOutCharge: cashoutExtra,
                calculatedTotal: totalPayable
            };

            const payload = { method: "POST", endpoint: orderPostGetall, body: body };
            const { status, data } = await PostAction(payload);
            showToast(status, data.message || "পেমেন্ট সফলভাবে জমা হয়েছে");
            setLocalMessage({ text: data.message || "আপনার তথ্য সফলভাবে জমা দেওয়া হয়েছে।", type: status });
        } catch (error) {
            showToast("error", "সার্ভারে সমস্যা হচ্ছে।");
        } finally {
            setWaiting(false);
        }
    };

    return (
        <div className="my-10 max-w-xl mx-2 md:mx-auto p-4 md:p-8 bg-white shadow-2xl rounded-3xl border border-blue-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Wallet size={80} />
            </div>

            <h2 className="text-2xl font-extrabold mb-8 text-blue-800 flex items-center gap-2">
                <CheckCircle2 className="text-green-500" /> পেমেন্ট প্রক্রিয়া
            </h2>

            {/* Total Amount Card */}
            <div className="mb-8 p-4 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 rounded-2xl text-white shadow-xl">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs uppercase tracking-widest opacity-70 font-bold">Total Payable Amount</p>
                        <p className="text-4xl font-black mt-1">৳ {totalPayable.toLocaleString('bn-BD')}</p>
                    </div>
                    <button onClick={handlePaymentDetails} className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-all">
                        <Info size={18} />
                    </button>
                </div>

                {/* Savings Alert */}
                {formData.method === 'Rocket' && userSavings > 0 && (
                    <div className="mt-4 py-2 px-3 bg-green-400/20 border border-green-400/30 rounded-lg flex items-center gap-2 text-[12px] font-medium text-green-100">
                        <span className="bg-green-500 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">SAVINGS</span>
                        রকেটে ক্যাশআউট চার্জ নেই! আপনার ৳{userSavings} বেঁচে গেল।
                    </div>
                )}
            </div>

            {/* Account Info Box */}
            <div className="mb-8 space-y-4">
                <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl">
                    <p className="text-sm font-bold text-orange-900 mb-3 text-center flex items-center justify-center gap-2">
                        এই নম্বরে টাকা পাঠান (Send Money)
                    </p>
                    <CopyableNumberDisplay number={RECEIVING_NUMBER} />
                </div>
                <p className="text-[11px] text-gray-500 text-center italic">
                    বি:দ্র: রকেটে পেমেন্ট করলে হাজারে ১৮.৫০ টাকা ক্যাশআউট চার্জ দিতে হবে না।
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Method Selector */}
                <div className="grid grid-cols-1 gap-4">
                    <label className="text-xs font-bold text-gray-500 ml-1 uppercase">পেমেন্ট মাধ্যম নির্বাচন করুন</label>
                    <select
                        name="method"
                        value={formData.method}
                        onChange={handleChange}
                        required
                        className="w-full p-4 border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none transition-all appearance-none bg-gray-50 font-medium"
                    >
                        <option value="">-- মেথড সিলেক্ট করুন --</option>
                        {paymentMethods.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                    </select>
                </div>

                {/* Amount Input */}
                <div>
                    <label className="text-xs font-bold text-gray-500 ml-1 uppercase">পাঠানো টাকার পরিমাণ</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        readOnly
                        className="w-full p-4 border-2 border-gray-100 rounded-xl bg-gray-50 font-black text-blue-700 text-xl cursor-not-allowed"
                    />
                </div>

                {/* Sender & Txn */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase">আপনার নম্বর</label>
                        <input
                            type="text"
                            name="senderNumber"
                            placeholder="017xxxxxxxx"
                            onChange={handleChange}
                            required
                            className="w-full p-4 border-2 border-gray-100 rounded-xl outline-none focus:border-blue-400 font-medium transition-all"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase">ট্রানজেকশন আইডি (TrxID)</label>
                        <input
                            type="text"
                            name="txnId"
                            placeholder="F3G4H5J6K7"
                            onChange={handleChange}
                            required
                            className="w-full p-4 border-2 border-gray-100 rounded-xl outline-none focus:border-blue-400 font-medium transition-all uppercase"
                        />
                    </div>
                </div>

                {/* Error/Success Local Message */}
                {localMessage.text && (
                    <div className={`p-4 rounded-xl text-sm font-medium ${localMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {localMessage.text}
                    </div>
                )}

                {/* Final Button */}
                <button
                    type="submit"
                    disabled={waiting || !isProfileMatch || !formData.method}
                    className={`w-full py-5 rounded-2xl font-black text-lg text-white shadow-2xl transition-all flex items-center justify-center gap-2 ${isProfileMatch && formData.method ? "bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-blue-200" : "bg-gray-300 cursor-not-allowed"
                        }`}
                >
                    {waiting ? <Spinner /> : (
                        <>আবেদন নিশ্চিত করুন <span className="opacity-50">|</span> ৳{totalPayable}</>
                    )}
                </button>

                {!isProfileMatch && (
                    <p className="text-center text-red-500 text-xs font-bold animate-pulse uppercase">
                        ⚠️ প্রোফাইল ও বিভাগের তথ্য মিলেনি!
                    </p>
                )}
            </form>
        </div>
    );
}