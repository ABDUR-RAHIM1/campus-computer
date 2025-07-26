
import DataNotFound from '@/components/DataNotFound';
import { getMyProfileInfo } from '@/handlers/studentProfile';
import React from 'react';
import DocumentImage from './DocumentImage';
import Image from 'next/image';
import { demoProfilePicture } from '@/constans';

export default async function Details() {
    const { status, data } = await getMyProfileInfo();


    if (status !== 200) {
        return <DataNotFound text={data?.message || "ডাটা পাওয়া যায়নি"} />;
    }
    const {
        username,
        phone,
        registrationNumber,
        department,
        program,
        classYear,
        session,
        classRoll,
        boardRoll,
        pin,
        email,
        guardianPhone,
        address,
        birthDate,
        gender,
        bloodGroup,
        instituteName,
        profilePicture,
        documents = [],
    } = data;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white my-10 rounded shadow-md border">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">👤 শিক্ষার্থীর  প্রোফাইল ডিটেইলস</h2>

            <div className=' my-7 flex items-center justify-center'>
                <Image
                    src={profilePicture || demoProfilePicture}
                    width={400}
                    height={400}
                    alt='profile picture'
                    className=' w-[140px] h-[150px] rounded-md'
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                <p><strong>নাম:</strong> {username}</p>
                <p><strong>মোবাইল:</strong> {phone}</p>
                <p><strong>ইমেইল:</strong> {email}</p>
                <p><strong>রেজিঃ নম্বর:</strong> {registrationNumber}</p>
                <p><strong>বোর্ড রোল:</strong> {boardRoll}</p>
                <p><strong>ক্লাস রোল:</strong> {classRoll}</p>
                <p><strong>ডিপার্টমেন্ট:</strong> {department}</p>
                <p><strong>প্রোগ্রাম:</strong> {program}</p>
                <p><strong>ক্লাস বর্ষ:</strong> {classYear}</p>
                <p><strong>সেশন:</strong> {session}</p>
                <p><strong>পিন:</strong> {pin}</p>
                <p><strong>ইনস্টিটিউট:</strong> {instituteName}</p>
                <p><strong>অভিভাবকের মোবাইল:</strong> {guardianPhone}</p>
                <p><strong>ঠিকানা:</strong> {address}</p>
                <p><strong>জন্ম তারিখ:</strong> {birthDate}</p>
                <p><strong>লিঙ্গ:</strong> {gender}</p>
                <p><strong>রক্ত গ্রুপ:</strong> {bloodGroup}</p>
            </div>

            {/* 📎 ডকুমেন্ট সেকশন */}
            {documents?.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">📎 আপলোডকৃত ডকুমেন্টসমূহ:</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {documents.map((docUrl, index) => (
                            <DocumentImage key={index} images={docUrl} index={index} />
                        ))}
                    </div>
                </div>
            )}


        </div>
    );
}
