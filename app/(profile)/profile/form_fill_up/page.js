"use client"
import React, { useState } from "react";
import { ExternalLink, Info, ListChecks, AlertCircle, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

export default function NuFormFillUp() {
  const [copied, setCopied] = useState(false);
  const params = useSearchParams();

  const reg = params.get("reg")
  const handleCopy = () => {
    if (!reg) return;

    // Copy to clipboard
    navigator.clipboard.writeText(reg)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error("Copy failed", err);
      });
  };



  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-2xl font-semibold text-gray-800">
          NU ফরম পূরণ সহায়িকা
        </h1>
        <p className="text-gray-600 mt-2 text-sm">
          ন্যাশনাল ইউনিভার্সিটির অফিসিয়াল ওয়েবসাইটে ফরম পূরণ করার আগে প্রয়োজনীয় গাইডলাইন
        </p>
      </div>

      <div className=" my-5 text-center">
        <Button asChild
          className={" bg-blue-600 text-white"}
        >
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://drive.google.com/file/d/1G1iY_gUH_63x6RxWCLMWZa2-88EEQRXb/view?usp=sharing">
            গাইডলাইন দেখুন
          </a>
        </Button>
      </div>

      {/* Info Box */}
      <div className="flex gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <Info className="text-blue-600 mt-1" size={20} />
        <p className="text-sm text-blue-800">
          এই সিস্টেমটি National University-এর অফিসিয়াল সিস্টেম নয়।
          আমরা শুধুমাত্র শিক্ষার্থীদের সহায়তার জন্য গাইডলাইন প্রদান করি।
        </p>
      </div>

      {/* Step Guide */}
      <div className="bg-white border rounded-lg p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <ListChecks className="text-green-600" />
          <h2 className="font-medium text-gray-800">
            ফরম পূরণ করার ধাপসমূহ
          </h2>
        </div>

        <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
          <li className="flex items-center gap-2">
            <span>
              আপনার স্টুডেন্ট আইডি {" "}
              <strong
                className="underline cursor-pointer text-blue-600"
                onClick={handleCopy}
              >
                {reg ? reg : " সংগ্রহ করুন"}
              </strong>
            </span>
            {reg && (
              <span
                className={`ml-2 text-sm cursor-pointer ${copied ? "text-green-600" : "text-gray-500 hover:text-gray-800"
                  } flex items-center gap-2`}
                onClick={handleCopy}
              >
                <p>{copied ? "কপি হয়েছে ✅" : "কপি করুন"}</p> <Copy size={14} />
              </span>
            )}
          </li>
          <li>সঠিক <strong>Session</strong> নির্বাচন করুন</li>
          <li>কলেজের তথ্য যাচাই করুন</li>
          <li>ব্যক্তিগত তথ্য ভালোভাবে মিলিয়ে নিন</li>
          <li>ফরম সাবমিট করার আগে সব তথ্য আবার চেক করুন</li>
        </ul>
      </div>

      {/* Warning */}
      <div className="flex gap-3 bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
        <AlertCircle className="text-yellow-600 mt-1" size={20} />
        <p className="text-sm text-yellow-800">
          এই পেজে দেওয়া নির্দেশনা অনুসরণ করে খুব সহজেই NU ফরম পূরণ করতে পারবেন।
          পরবর্তী ধাপে আপনাকে ফরম পূরণের স্ক্রিনে নিয়ে যাওয়া হবে।

        </p>
      </div>

      {/* Action Button */}
      <div className="text-center">
        <a
          href="http://ems.nu.ac.bd/student-login"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition"
        >
          NU ফরম পূরণ করতে ক্লিক করুন
          <ExternalLink size={16} />
        </a>

        <p className="text-xs text-gray-500 mt-3">
          নতুন ট্যাবে রেজিস্ট্রেশন নাম্বার দিয়ে লগইন করে আপনার সাবজেক্ট গুল চেক করে সাবমিট করুন।
        </p>
      </div>
    </div>
  );
}
