"use client";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/utilities/InputField";
import { PostAction } from "@/actions/students/PostAction";
import { studentLogin, studentRegister } from "@/constans";
import { globalContext } from "@/contextApi/ContextApi";
import { studentAuthFormState } from "@/formStats/StudentAuthState";
import Spinner from "@/utilities/Spinner";
import LoadingSpinner from "@/utilities/Loading";

export default function StudentLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [navigateLoading, setNavigateLoading] = useState(false)
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
        setNavigateLoading(true)
        setLoginSignal(!loginSignal);
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      // setNavigateLoading(false)
    }
  };

  if (navigateLoading) {
    return <div className=" w-full min-h-screen flex flex-col items-center justify-center">
      <div className=" text-center w-auto p-3 rounded-md">
        <Spinner />
        <p>
          Profile is comming....
        </p>
      </div>
    </div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-500 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl flex flex-col md:flex-row overflow-hidden">

        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-blue-600 text-white p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 underline">
            ক্যাম্পাস কম্পিউটার
          </h2>

          <p className="text-base md:text-lg mb-3 leading-relaxed">
            এই ওয়েবসাইটে আপনি সহজে রেজিস্টার এবং লগইন করে বিভিন্ন সেবা গ্রহণ করতে পারবেন।
          </p>

          <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
            <li>সহজ রেজিস্ট্রেশন</li>
            <li>প্রোফাইল আপডেট</li>
            <li>সার্ভিস ট্র্যাকিং</li>
            <li>অর্ডার ম্যানেজমেন্ট</li>
          </ul>

          <p className="mt-6 text-sm italic">
            নতুন হলে রেজিস্টার করুন, নাহলে লগইন করুন।
          </p>
        </div>

        {/* Right Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center"
        >
          <div className="max-w-md mx-auto w-full">

            <h2 className="text-xl md:text-2xl font-bold mb-6 text-center text-gray-800">
              {isLogin ? "স্টুডেন্ট লগইন" : "নতুন স্টুডেন্ট রেজিস্টার"}
            </h2>

            {!isLogin && (
              <InputField
                label="নাম"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="আপনার নাম লিখুন"
                required={true}
              />
            )}

            <InputField
              label="ফোন"
              type="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="আপনার ফোন নাম্বার লিখুন"
              required={true}
            />

            <InputField
              label="পাসওয়ার্ড"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="পাসওয়ার্ড দিন"
              required={true}
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold mt-2 transition"
            >
              {loading
                ? <Spinner />
                : isLogin
                  ? "লগইন করুন"
                  : "রেজিস্টার করুন"}
            </button>

            <p className="mt-4 text-center text-gray-600 text-sm">
              {isLogin ? "নতুন ব্যবহারকারী?" : "আগেই রেজিস্টার করেছেন?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                type="button"
                className="text-blue-600 hover:underline"
              >
                {isLogin ? "রেজিস্টার করুন" : "লগইন করুন"}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
