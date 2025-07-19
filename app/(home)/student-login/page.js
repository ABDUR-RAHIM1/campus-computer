"use client";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/utilities/InputField";
import { PostAction } from "@/actions/students/PostAction";
import { studentLogin, studentRegister } from "@/constans";
import { globalContext } from "@/contextApi/ContextApi";
import { studentAuthFormState } from "@/formStats/StudentAuthState";

export default function StudentLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const { showToast, loginSignal, setLoginSignal } = useContext(globalContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState(studentAuthFormState);



  const handleChange = (e) => {
    console.log(e.target.value)
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const payload = {
        method: "POST",
        endpoint: isLogin ? studentLogin : studentRegister,
        body: formData
      }

      const { status, data } = await PostAction(payload);

      showToast(status, data)

      if (data && data.token) {
        setLoginSignal(!loginSignal)
        router.push("/profile")
      }


    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }

  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
        {/* Left Info */}
        <div className="md:w-1/2 bg-blue-600 text-white p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">Campus Computer</h2>
          <p className="mb-4 text-lg leading-relaxed">
            এই ওয়েবসাইটে আপনি সহজে রেজিস্টার এবং লগইন করে বিভিন্ন সেবা গ্রহণ করতে পারবেন।
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>সহজ রেজিস্ট্রেশন</li>
            <li>প্রোফাইল আপডেট</li>
            <li>সার্ভিস ট্র্যাকিং</li>
            <li>অর্ডার ম্যানেজমেন্ট</li>
          </ul>
          <p className="mt-6 italic">নতুন হলে রেজিস্টার করুন, নাহলে লগইন করুন।</p>
        </div>

        {/* Right Form */}
        <form onSubmit={handleSubmit} className="md:w-1/2 p-10" style={{ minWidth: "320px" }}>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            {isLogin ? "স্টুডেন্ট লগইন" : "নতুন স্টুডেন্ট রেজিস্টার"}
          </h2>

          {!isLogin && (
            <InputField
              label="নাম"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="আপনার নাম লিখুন"
            />
          )}


          <InputField
            label="ফোন"
            type="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="আপনার ফোন নাম্বার লিখুন"
          />

          <InputField
            label="পাসওয়ার্ড"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="পাসওয়ার্ড দিন"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
          >
            {loading ? "অপেক্ষা করুন..." : isLogin ? "লগইন করুন" : "রেজিস্টার করুন"}
          </button>

          <p className="mt-4 text-center text-gray-600">
            {isLogin ? "নতুন ব্যবহারকারী?" : "আগেই রেজিস্টার করেছেন?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              type="button"
              className="text-blue-600 hover:underline"
            >
              {isLogin ? "রেজিস্টার করুন" : "লগইন করুন"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
