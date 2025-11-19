
import DataNotFound from '@/components/DataNotFound';
import { getMyProfileInfo } from '@/handlers/studentAuth';
import React from 'react';
import Image from 'next/image';
import { demoProfilePicture } from '@/constans';
import DocumentImage from '@/components/DocumentImage';
import { getStudentProfileById } from '@/handlers/profile';

export default async function Details({ params }) {
    const { profileId } = await params
    const { status, data } = await getStudentProfileById(profileId);


    if (status !== 200) {
        return <DataNotFound text={data?.message || "ডাটা পাওয়া যায়নি"} />;
    }
    const {
        isOtherStudent,
        studentName,
        studentId,
        registrationNumber,
        department,
        program,
        classYear,
        session,
        classRoll,
        contactNumber,
        institute,
        electiveSubject,
        profilePicture,
        hasImprovement,
        improvementSubjects,
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
                <p><strong>প্রোফাইল মালিক:</strong> {isOtherStudent ? "অন্যের" : "আমি নিজে"}</p>
                <p><strong>নাম:</strong> {studentName || studentId?.username}</p>
                <p><strong>যোগাযোগ নাম্বার:</strong> {contactNumber || studentId?.phone}</p>
                <p><strong>স্টুডেন্ট আইডি:</strong> {registrationNumber}</p>
                <p><strong>ক্লাস রোল:</strong> {classRoll}</p>
                <p><strong>ডিপার্টমেন্ট:</strong> {department}</p>
                <p><strong>প্রোগ্রাম:</strong> {program}</p>
                <p><strong>ক্লাস বর্ষ:</strong> {classYear}</p>
                <p><strong>সেশন:</strong> {session}</p>
                <p><strong>ইনস্টিটিউট:</strong> {institute?.username || "_"}</p>
                <p><strong> ঐচ্ছিক বিষয়:</strong> {electiveSubject || "_"}</p>
                {
                    hasImprovement &&
                    <div>
                        <strong> ইম্প্রুভমেন্ট</strong>
                        <ul className=' ml-3 list-disc'>
                            {
                                improvementSubjects && improvementSubjects.map((item, index) => (
                                    <li key={index}>
                                        {item}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                }
            </div>

            <hr className=' mt-5' />
            {/* 📎 ডকুমেন্ট সেকশন */}
            {documents?.length > 0 ? (
                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">📎 আপলোডকৃত ডকুমেন্টসমূহ:</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {documents.map((docUrl, index) => (
                            <DocumentImage key={index} images={docUrl} index={index} />
                        ))}
                    </div>
                </div>
            ) :
                <p className=' my-5 text-red-500 font-bold text-xl'>
                    কোন ডকুমেন্ট নেই!
                </p>
            }


        </div>
    );
}
