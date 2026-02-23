"use client";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/utilities/InputField";
import { PostAction } from "@/actions/students/PostAction";
import { studentLogin, studentRegister } from "@/constans";
import { globalContext } from "@/contextApi/ContextApi";
import { studentAuthFormState } from "@/formStats/StudentAuthState";
import Spinner from "@/utilities/Spinner"; 
import { ShieldCheck, UserPlus, LogIn, CheckCircle2, GraduationCap } from "lucide-react";

export default function StudentLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [navigateLoading, setNavigateLoading] = useState(false);
  const { showToast, loginSignal, setLoginSignal } = useContext(globalContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState(studentAuthFormState);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        method: "POST",
        endpoint: isLogin ? studentLogin : studentRegister,
        body: formData,
      };

      const { status, data } = await PostAction(payload);
      showToast(status, data);

      if (data && data.token) {
        setNavigateLoading(true);
        setLoginSignal(!loginSignal);
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (navigateLoading) {
    return (
      <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="text-center p-10 rounded-[3rem] bg-blue-50/50 flex flex-col items-center">
          <div className="relative mb-6">
             <div className="absolute inset-0 bg-blue-200 blur-2xl rounded-full animate-pulse"></div>
             <Spinner className="w-12 h-12 text-blue-600 relative z-10" />
          </div>
          <h2 className="text-2xl font-black text-gray-800 tracking-tighter">প্রোফাইল তৈরি হচ্ছে...</h2>
          <p className="text-gray-500 font-medium mt-2">একটু অপেক্ষা করুন, আমরা আপনাকে ড্যাশবোর্ডে নিয়ে যাচ্ছি।</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-[100px] -z-0 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full blur-[100px] -z-0 opacity-50"></div>

      <div className="w-full max-w-5xl bg-white/70 backdrop-blur-xl border border-white shadow-2xl shadow-blue-100 rounded-[3rem] flex flex-col md:flex-row overflow-hidden relative z-10">

        {/* Left Section (Branding & Info) */}
        <div className="w-full md:w-5/12 bg-blue-600 p-10 md:p-14 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Decorative Circle */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8">
              <GraduationCap size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight tracking-tighter">
              আপনার ডিজিটাল <br /> <span className="text-blue-200">ক্যাম্পাস যাত্রা</span> <br /> এখান থেকেই শুরু
            </h2>

            <div className="space-y-5">
              {[
                "সহজ ও দ্রুত আবেদন প্রক্রিয়া",
                "রিয়েল-টাইম সার্ভিস ট্র্যাকিং",
                "নিরাপদ পেমেন্ট গেটওয়ে",
                "২৪/৭ ডেডিকেটেড সাপোর্ট"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 font-bold text-blue-50">
                  <CheckCircle2 size={18} className="text-blue-300" />
                  <span className="text-sm md:text-base opacity-90">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 relative z-10">
            <div className="p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
              <p className="text-xs font-medium leading-relaxed opacity-80">
                “ক্যাম্পাস কম্পিউটার স্টুডেন্টদের জন্য একটি বিশ্বস্ত ডিজিটাল প্ল্যাটফর্ম। আপনার তথ্য আমাদের কাছে সম্পূর্ণ নিরাপদ।”
              </p>
            </div>
          </div>
        </div>

        {/* Right Section (The Form) */}
        <div className="w-full md:w-7/12 p-10 md:p-14 bg-white flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                {isLogin ? <LogIn size={14}/> : <UserPlus size={14}/>}
                {isLogin ? "Welcome Back" : "Join the Community"}
              </div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tighter">
                {isLogin ? "স্টুডেন্ট লগইন" : "রেজিস্ট্রেশন করুন"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-1">
                   <InputField
                    label="পুরো নাম"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="উদা: আরিফুল ইসলাম"
                    required={true}
                    className="rounded-2xl border-gray-100 focus:border-blue-500 py-6"
                  />
                </div>
              )}

              <InputField
                label="ফোন নাম্বার"
                type="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="017XXXXXXXX"
                required={true}
                className="rounded-2xl border-gray-100 focus:border-blue-500 py-6"
              />

              <InputField
                label="পাসওয়ার্ড"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required={true}
                className="rounded-2xl border-gray-100 focus:border-blue-500 py-6"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-[1.2rem] font-black text-lg transition-all shadow-xl shadow-blue-200 hover:shadow-blue-300 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {loading ? <Spinner /> : isLogin ? "লগইন করুন" : "অ্যাকাউন্ট খুলুন"}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-gray-50 text-center">
              <p className="text-gray-500 font-bold text-sm">
                {isLogin ? "নতুন ব্যবহারকারী?" : "আগেই রেজিস্টার করেছেন?"}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  type="button"
                  className="ml-2 text-blue-600 hover:text-blue-700 font-black transition-colors"
                >
                  {isLogin ? "নতুন অ্যাকাউন্ট খুলুন" : "লগইন করুন"}
                </button>
              </p>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-gray-400">
               <ShieldCheck size={14} />
               <span className="text-[10px] uppercase font-bold tracking-widest">End-to-End Encrypted Secure Login</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}