"use client"

import { useRouter } from "next/navigation";
import { createContext, useState } from "react"
import { toast } from "sonner";

export const globalContext = createContext();

export default function ContextApiState({ children }) {
    const router = useRouter();

    const x = 10;  // এটা ঠিক আছে, যদি দরকার হয়

    const [imgUrl, setImgUrl] = useState("");
    const [uploadResponse, setUploadResponse] = useState({
        message: "",
        status: 0,
    });

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

    const value = {
        x,
        imgUrl, 
        uploadResponse, 
        showToast,
    };

    return (
        <globalContext.Provider value={value}>
            {children}
        </globalContext.Provider>
    );
}
