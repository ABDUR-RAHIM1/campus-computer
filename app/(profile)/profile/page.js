
import React from "react";
import Image from "next/image";
import DataNotFound from "@/components/DataNotFound";
import Services from "./components/Services";
import { demoProfilePicture } from "@/constans";
import Link from "next/link";
import { getMyProfile } from "@/handlers/profile";
import { getMyProfileInfo } from "@/handlers/studentAuth";
import ServicesInfo from "@/components/ServicesInfo";

export default async function StudentProfile() {

    const [authAccount, profileAccount] = await Promise.all([
        getMyProfileInfo(),
        getMyProfile()
    ]);

    const { status: authStatus, data: authData } = authAccount;
    const { status: profileStatus, data: profileData } = profileAccount;


    if (authStatus !== 200 || profileStatus !== 200) {
        return <DataNotFound text={"ডাটা পাওয়া যায়নি"} />;
    }


    const { username, phone } = authData;

    const requiredFields = [
        "registrationNumber",
        "classYear",
        "department",
        "session",
        "email",
    ];

    const isProfileComplete = requiredFields.every(
        (field) => {
            const value = profileData[field];
            return value !== undefined && value !== null && value.toString().trim() !== "";
        }
    );
    const getClassYearInBangla = (year) => {
        const yearMap = {
            1: "প্রথম বর্ষ",
            2: "দ্বিতীয় বর্ষ",
            3: "তৃতীয় বর্ষ",
            4: "চতুর্থ বর্ষ",
        };
        return yearMap[year] || "অজানা বর্ষ";
    };

    // const isProfileComplete = true

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 items-start gap-6">
                {/* Left Sidebar - Profile Summary */}
                <div className="bg-white shadow rounded-lg p-6 text-center">
                    <Image
                        src={profileData?.profilePicture || demoProfilePicture}
                        alt=" Campus Computer Student Profile Picture"
                        width={150}
                        height={150}
                        className=" w-[150px] h-[150px] rounded-md mx-auto mb-4 border border-gray-300"
                    />
                    <h2 className="text-xl font-bold text-gray-800 mb-1">
                        {username || "--"}
                    </h2>
                    <p className="text-gray-600 mb-1">📞 {phone || "--"}</p>
                    <p className="text-gray-600 mb-4">{profileData.email || "--"}</p>

                    {/* Update Profile Button */}
                    <Link href="/profile/actions" className=" text-sm inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition">
                        প্রোফাইল তৈরি করুন
                    </Link>

                    <div className="text-left mt-6">

                        <div className=" flex items-center justify-between flex-wrap my-4">
                            <h3 className="font-semibold text-gray-800 mb-2">
                                📚 গুরুত্বপূর্ণ তথ্যসমূহ
                            </h3>
                            <Link href={"/profile/profile-list"} className=" inline-block text-sm text-blue-500 underline">
                                প্রোফাইল তালিকা
                            </Link>

                        </div>

                        <ul className="space-y-1 list-disc list-inside text-gray-700 text-sm">

                            <li>রেজিস্ট্রেশন নম্বর: {profileData.registrationNumber || "__"}</li>
                            <li>বিভাগ: {profileData.department || "__"}</li>
                            <li> প্রোগ্রাম : {profileData.program || "__"}</li>
                            <li>ক্লাস: {getClassYearInBangla(profileData.classYear)}</li>
                            <li>সেশন: {profileData.session || "__"}</li>
                            <li>ক্লাস রোল: {profileData.classRoll || "__"}</li>
                            <li>বোর্ড রোল: {profileData.boardRoll || "__"}</li>
                            <li>পিন: {profileData.pin || "__"}</li>
                            <li>ইমেইল: {profileData.email || "__"}</li>
                            <li>অভিভাবকের ফোন: {profileData.guardianPhone || "__"}</li>
                            <li>ঠিকানা: {profileData.address || "__"}</li>
                            <li>জন্ম তারিখ: {profileData.birthDate || "__"}</li>
                            <li>লিঙ্গ: {profileData.gender || "__"}</li>
                            <li>রক্ত গ্রুপ: {profileData.bloodGroup || "__"}</li>
                            <li>ইনস্টিটিউটের নাম: {profileData.instituteName || "__"}</li>

                            {/* ✅ মানোন্নয়ন তথ্য */}
                            {profileData.hasImprovement && Array.isArray(profileData.improvementSubjects) && profileData.improvementSubjects.length > 0 && (
                                <li>
                                    <span className=" text-red-800 font-bold ">মানোন্নয়নের বিষয়সমূহ:</span>
                                    <ul className="list-disc list-inside ml-4">
                                        {profileData.improvementSubjects.map((s, i) => (
                                            <li key={i}>{s}</li>
                                        ))}
                                    </ul>
                                </li>
                            )}
                        </ul>
                    </div>

                    {!isProfileComplete && (
                        <p className="mt-6 text-sm text-red-600 bg-red-100 p-3 rounded">
                            ⚠️ আপনার প্রোফাইলের কিছু গুরুত্বপূর্ণ তথ্য পূরণ নেই। <br />
                            রেজিস্ট্রেশন নম্বর, ক্লাস, বিভাগ, সেশন, ফোন ও ইমেইল ঠিক না থাকলে
                            আমাদের সেবাসমূহ ব্যবহার করা সম্ভব হবে না।
                        </p>
                    )}
                </div>

                {/* Right Side - Main Content */}
                <div className="md:col-span-2 bg-white shadow rounded-lg p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">
                        👋 স্বাগতম, {profileData.username || "শিক্ষার্থী"}!
                    </h3>
                    <ServicesInfo/>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Services />
                    </div>


                </div>
            </div>


        </div>
    );
}
