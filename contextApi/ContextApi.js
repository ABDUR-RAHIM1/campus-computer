"use client"

import { getMyProfileInfo } from "@/handlers/studentAuth";
import { createContext, useEffect, useState } from "react"
import { toast } from "sonner";

export const globalContext = createContext();

export default function ContextApiState({ children }) {

    const [editData, setEditData] = useState(null)
    const [studentIsLogin, setStudnetIsLogin] = useState(false);
    const [studentInfo, setStudentInfo] = useState(null)
    const [loginSignal, setLoginSignal] = useState(false);

    const [orderDataForPayment, setOrderDataForPayment] = useState(null);
    const [isProfileMatch, setIsProfileMatch] = useState(false)

    const [imgUrl, setImgUrl] = useState("");
    const [uploadResponse, setUploadResponse] = useState({
        message: "",
        status: 0,
    });


    useEffect(() => {
        const getStudentProfile = async () => {
            const { status, data } = await getMyProfileInfo();;

            if (status === 200 || status === 201) {
                setStudnetIsLogin(true);
                setStudentInfo(data)
            } else {
                setStudnetIsLogin(false)
            }
        };
        getStudentProfile(0)
    }, [])

    const showToast = (status, data, autoClose) => {
        const message = data.message || data;

        const finalAutoClose = typeof autoClose !== "undefined" ? autoClose : (status === 200 || status === 201);

        if (status === 200 || status === 201) {
            toast.success(message, {
                duration: finalAutoClose ? 3000 : Infinity,
                style: {
                    border: '1px solid #4caf50',
                    padding: '12px 16px',
                    color: '#333',
                    background: '#f0fff0',
                    borderRadius: '8px',
                },
                iconTheme: {
                    primary: '#4caf50',
                    secondary: '#fff',
                },
            });
        } else {
            toast.custom((t) => (
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    border: '1px solid #f44336',
                    background: '#fff0f0',
                    padding: "12px 16px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    minWidth: "300px",
                }}>
                    <div style={{ color: "#333", fontWeight: 500 }}>
                        {message}
                    </div>
                    <button
                        style={{
                            marginLeft: "12px",
                            background: "transparent",
                            border: "none",
                            color: "#f44336",
                            fontSize: "16px",
                            cursor: "pointer"
                        }}
                        onClick={() => toast.dismiss(t.id)}
                    >
                        ✖
                    </button>
                </div>
            ), { duration: 15000 });
        }
    };

    // 🔹 Multiple File Upload Function
    const uploader = async (files) => {
        if (!files || files.length === 0) {
            setUploadResponse({
                message: "❌ কোনো ফাইল পাওয়া যায়নি",
                status: 400,
            });
            return;
        }

        setUploadResponse({
            message: "📤 আপলোড হচ্ছে... দয়া করে অপেক্ষা করুন",
            status: 102,
        });

        const uploadedUrls = [];

        for (const file of files) {
            const form = new FormData();
            form.append("image", file);

            try {
                const response = await fetch(
                    "https://api.imgbb.com/1/upload?key=862850e874b9b92bba3bbba84383b4dd",
                    {
                        method: "POST",
                        body: form,
                    }
                );

                const data = await response.json();

                if (data.success) {
                    uploadedUrls.push(data.data.url);
                } else {
                    console.error("❌ একটি ফাইল আপলোড হয়নি:", data);
                }
            } catch (error) {
                console.error("🚫 আপলোড ত্রুটি:", error);
            }
        }

        if (uploadedUrls.length > 0) {
            setImgUrl(uploadedUrls); // যদি preview বা db তে পাঠাতে হয়
            setUploadResponse({
                message: "✅ সফলভাবে সব ফাইল আপলোড হয়েছে",
                status: 200,
            });
        } else {
            setUploadResponse({
                message: "❌ কোনো ফাইলই আপলোড হয়নি",
                status: 500,
            });
        }
    };






    const value = {
        editData, setEditData,
        studentIsLogin, studentInfo,
        isProfileMatch, setIsProfileMatch,
        orderDataForPayment, setOrderDataForPayment,
        loginSignal, setLoginSignal,
        imgUrl,
        imgUrl, uploadResponse, uploader,
        showToast,
    };

    return (
        <globalContext.Provider value={value}>
            {children}
        </globalContext.Provider>
    );
}
