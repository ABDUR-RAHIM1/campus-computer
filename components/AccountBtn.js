"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function AccountBtn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);



  return (
    <>
      {isLoggedIn ? (
        <Link
          href="/profile"
          className="text-gray-700 hover:text-blue-600 font-medium"
        >
          প্রোফাইল
        </Link>
      ) : (
        <Link
          href="/student-login"
          className="text-gray-700 hover:text-blue-600 font-medium"
        >
          একাউন্ট
        </Link>
      )}
    </>
  );
}
