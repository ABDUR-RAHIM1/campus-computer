// ProfileDetails.jsx

"use client"; // ক্লায়েন্ট-সাইড ইন্টারেক্টিভিটি নিশ্চিত করতে

import React, { useState } from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button"; // ধরে নেওয়া হচ্ছে এটি ক্লায়েন্ট কম্পোনেন্ট

// ===============================================
// 1. Reusable Component for Input-style Fields (Internal)
// ===============================================

const ProfileDetailItem = ({ label, value }) => {
    if (!value && value !== 0 && value !== 'নাই') return null; 

    const displayValue = value === "নাই" ? value : (value || "প্রদান করা হয়নি");
    const textToCopy = value === "নাই" ? "" : (value || "");

    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        if (!textToCopy) return;

        try {
            await navigator.clipboard.writeText(textToCopy.toString());
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); 
        } catch (err) {
            console.error('Failed to copy text: ', err);
            alert(`কপি করা সম্ভব হয়নি। এই টেক্সটটি নিজে কপি করুন: ${textToCopy}`);
        }
    };

    const isCopyable = !!textToCopy;

    return (
        <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <div 
                className={`relative p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 transition-shadow ${
                    isCopyable ? 'cursor-pointer hover:shadow-md' : ''
                }`}
                onClick={isCopyable ? handleCopy : undefined}
                title={isCopyable ? `কপি করতে ক্লিক করুন: ${textToCopy}` : `কোন তথ্য নেই`}
            >
                <p className="break-words">{displayValue}</p>
                
                {isCopied && (
                    <span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full shadow-lg whitespace-nowrap z-10 animate-pulse">
                        কপিড!
                    </span>
                )}
            </div>
        </div>
    );
};

// ===============================================
// 2. Reusable Component for Table Cells (Internal)
// ===============================================

const ClickableTableCell = ({ value }) => {
    const textToCopy = value || "";
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async (e) => {
        e.stopPropagation(); 
        if (!textToCopy) return;

        try {
            await navigator.clipboard.writeText(textToCopy.toString());
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); 
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };
    
    const isCopyable = !!textToCopy;

    return (
        <td 
            className={`px-4 py-2 border relative text-center transition-colors ${isCopyable ? 'cursor-pointer hover:bg-yellow-50' : 'text-gray-400'}`}
            onClick={isCopyable ? handleCopy : undefined}
        >
            {value || "-"}
            {isCopied && (
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full shadow-lg whitespace-nowrap z-20 animate-pulse">
                    কপিড!
                </span>
            )}
        </td>
    );
};


// ===============================================
// 3. Main Profile Details Component
// ===============================================
 
export default function ProfileDetails({ data }) { 

    // Helper function to render ProfileDetailItem
    const renderDetailItem = (label, value) => {
        return <ProfileDetailItem label={label} value={value} />;
    };

    return (
        <div className="my-10 max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg border-t-4 border-blue-600">
            
            {/* Top Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6 pb-6 border-b">
                <Image
                    width={100}
                    height={100}
                    src={data.photo}
                    alt={data.nameBn}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg "
                />
                <div className="flex-grow">
                    <h1 className="text-3xl font-extrabold text-gray-800">{data.nameBn}</h1>
                    <h2 className="text-xl font-semibold text-gray-600 mb-2">{data.nameEn}</h2>
                    
                    {/* Contact Info in Header */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                        {renderDetailItem("ইমেইল", data.email)}
                        {renderDetailItem("মোবাইল নাম্বার", data.mobileNumber)}
                    </div>
                </div>
            </div>

            ---
            
            {/* Personal Info */}
            <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-blue-700 border-b pb-2">📅 ব্যক্তিগত তথ্য</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {renderDetailItem("জন্ম তারিখ", data.dob)}
                    {renderDetailItem("ধর্ম", data.religion)}
                    {renderDetailItem("লিঙ্গ", data.gender)}
                    {renderDetailItem("বৈবাহিক অবস্থা", data.matarialStatus)}
                    {renderDetailItem("কোটা", data.quota)}
                </div>
            </div>
            
            ---
            
            {/* Parents Info */}
            <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-blue-700 border-b pb-2">👨‍👩‍👧 পিতামাতার তথ্য</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderDetailItem("বাবার নাম (Bn)", data.fatherNameBn)}
                    {renderDetailItem("বাবার নাম (En)", data.fatherNameEn)}
                    {renderDetailItem("মায়ের নাম (Bn)", data.motherNameBn)}
                    {renderDetailItem("মায়ের নাম (En)", data.motherNameEn)}
                </div>
            </div>

            ---
            
            {/* Contact Info (Detailed) */}
            <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-blue-700 border-b pb-2">📞 যোগাযোগের তথ্য</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderDetailItem("অন্য মোবাইল", data.otherMobileNumber)}
                    {renderDetailItem("বর্তমান ঠিকানা", data.presentAddress)}
                    {renderDetailItem("স্থায়ী ঠিকানা", data.permanentAddress)}
                </div>
            </div>

            ---
            
            {/* Identity Info */}
            <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-blue-700 border-b pb-2">🆔 পরিচয় সম্পর্কিত তথ্য</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {renderDetailItem("জন্মনিবন্ধন নং", data.birthNumber)}
                    {renderDetailItem("NID", data.nidNumber)}
                    {renderDetailItem("পাসপোর্ট", data.passportId || "নাই")}
                </div>
                
                {/* Signature - Not copyable, remains as is */}
                <div className="mt-6 flex items-center gap-4 p-4 border rounded-lg bg-gray-50">
                    <span className="font-medium text-lg text-gray-700">স্বাক্ষর:</span>{" "}
                    <Image width={300} height={80} src={data.signature} alt="Signature" className="w-[300px]  h-[80px] object-contain border p-1 bg-white hover:w-[400px] hover:h-[400px] transition-all" />
                </div>
            </div>

            ---
            
            {/* Education Info */}
            <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-blue-700 border-b pb-2">📚 শিক্ষাগত যোগ্যতা</h3>
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full border-collapse">
                        <thead className="bg-blue-100 text-blue-800">
                            <tr>
                                <th className="px-4 py-3 border text-left">ডিগ্রি</th>
                                <th className="px-4 py-3 border text-left">ক্যাটাগরি</th>
                                <th className="px-4 py-3 border text-left">ইনস্টিটিউট</th>
                                <th className="px-4 py-3 border text-left">বোর্ড</th>
                                <th className="px-4 py-3 border text-center">পাশের বছর</th>
                                <th className="px-4 py-3 border text-center">রোল</th>
                                <th className="px-4 py-3 border text-center">রেজিস্ট্রেশন</th>
                                <th className="px-4 py-3 border text-center">GPA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.educations.map((edu) => (
                                <tr key={edu._id} className="bg-white hover:bg-gray-50 text-gray-700 text-sm">
                                    <td className="px-4 py-2 border">{edu.eduType}</td>
                                    <td className="px-4 py-2 border">{edu.categorie}</td>
                                    <td className="px-4 py-2 border">{edu.instituteName}</td>
                                    <td className="px-4 py-2 border">{edu.board}</td>
                                    <ClickableTableCell value={edu.passingYear} />
                                    <ClickableTableCell value={edu.roll} />
                                    <ClickableTableCell value={edu.reg} />
                                    <ClickableTableCell value={edu.gpa} />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            ---
            
            {/* Extra Info */}
            {data.extra && data.extra.trim() !== "" && (
                <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-4 text-blue-700 border-b pb-2">📝 অতিরিক্ত তথ্য</h3>
                    <div className="border border-gray-300 p-4 rounded-lg bg-gray-50 shadow-inner">
                        {renderDetailItem("বিবরণ", data.extra)}
                    </div>
                </div>
            )}

            ---
            
            {/* Documents */}
            <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-blue-700 border-b pb-2">📎 ডকুমেন্টস</h3>
                <div className="flex flex-wrap gap-4">
                    {data.documents.map((doc, index) => (
                        <div key={index} className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                            <img
                                src={doc}
                                alt={`Document ${index + 1}`}
                                className="w-32 h-32 object-cover border border-gray-200"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-white text-sm font-semibold">দেখুন</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            ---
            
            {/* CV Link */}
            {data.cvLink && (
                <div className="text-center my-10">
                    <Button asChild
                        className={"px-8 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all"}
                    >
                        <a
                            href={data.cvLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            CV দেখুন / ডাউনলোড করুন
                        </a>
                    </Button>
                </div>
            )}
        </div>
    )
}