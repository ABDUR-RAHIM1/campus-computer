"use client"
import React, { useState } from "react";
import clsx from "clsx";

const dummyMessages = [
    { sender: "admin", text: "হ্যালো, তোমার ভর্তি ফর্ম জমা হয়েছে?", time: "10:00 AM" },
    { sender: "student", text: "জি স্যার, কিন্তু ট্রান্সক্রিপ্ট লাগবে?", time: "10:01 AM" },
    { sender: "admin", text: "হ্যাঁ, ট্রান্সক্রিপ্ট ও ২ কপি পাসপোর্ট সাইজ ছবি লাগবে।", time: "10:02 AM" },
];

export default function Message() {
    const [messages, setMessages] = useState(dummyMessages);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (input.trim() === "") return;
        const newMsg = {
            sender: "student",
            text: input,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages([...messages, newMsg]);
        setInput("");
    };

    return (
        <div className=" px-5 max-w-2xl mx-auto mt-10 border rounded-lg shadow-lg h-[600px] flex flex-col bg-white">
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 rounded-t-lg text-lg font-semibold">
                📩 ভর্তি সংক্রান্ত আলোচনা (Admin ↔ Student)
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={clsx("flex", msg.sender === "student" ? "justify-end" : "justify-start")}
                    >
                        <div
                            className={clsx(
                                "rounded-lg px-4 py-2 max-w-xs text-sm",
                                msg.sender === "student"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-900"
                            )}
                        >
                            <div>{msg.text}</div>
                            <div className="text-[10px] mt-1 text-right opacity-70">{msg.time}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input area */}
            <div className="p-4 border-t flex items-center gap-2">
                <input
                    type="text"
                    className="flex-1 border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring focus:border-blue-400"
                    placeholder="ম্যাসেজ লিখুন..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button
                    onClick={handleSend}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                >
                    পাঠান
                </button>
            </div>
        </div>
    );
}
