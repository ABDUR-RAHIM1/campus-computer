"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { globalContext } from "@/contextApi/ContextApi";

export default function AccountBtn() {
  const [isToken, setIsToken] = useState('')

  // const { showToast, token, loginSignal, setLoginSignal } = useContext(globalContext);
  const { token } = useContext(globalContext);

  // useEffect(() => {
  //   setIsToken(token)
  // }, [loginSignal]);

  console.log(token)

  return (
    <>
      {token ? (
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
