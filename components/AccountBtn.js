"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { globalContext } from "@/contextApi/ContextApi";
import { User } from "lucide-react"; // ইউজার আইকন

export default function AccountBtn() {
  const { studentIsLogin: loginStatus, studentInfo } = useContext(globalContext);

  return (
    <>
      {loginStatus ? (
        <Link
          href="/profile"
          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 rounded-full transition"
        >
          <User className="w-4 h-4" />
          {studentInfo?.username || "প্রোফাইল"}
        </Link>
      ) : (
        <Link
          href="/student-login"
          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 rounded-full transition"
        >
          <User className="w-4 h-4" />
          একাউন্ট
        </Link>
      )}
    </>
  );
}
