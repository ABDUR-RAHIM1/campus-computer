import React from 'react'
 
import Image from "next/image";
import { Button } from "@/components/ui/button";
//  job profile details reusable  
export default function ProfileDetails({ data }) { 

    return (
        <div className="my-10 max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
            {/* Top Section */}
            <div className="flex items-center space-x-6 mb-6">
                <Image
                    width={100}
                    height={100}
                    src={data.photo}
                    alt={data.nameBn}
                    className="w-32 h-32 rounded-full border"
                />
                <div>
                    <h1 className="text-2xl font-bold">{data.nameBn}</h1>
                    <h2 className="text-gray-600">{data.nameEn}</h2>
                    <p className="text-gray-500 mt-1">{data.email}</p>
                    <p className="text-gray-500">{data.mobileNumber}</p>
                </div>
            </div>

            {/* Personal Info */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">ব্যক্তিগত তথ্য</h3>
                <div className="grid grid-cols-2 gap-4">
                    <p><span className="font-medium">জন্ম তারিখ:</span> {data.dob}</p>
                    <p><span className="font-medium">ধর্ম:</span> {data.religion}</p>
                    <p><span className="font-medium">লিঙ্গ:</span> {data.gender}</p>
                    <p><span className="font-medium">বৈবাহিক অবস্থা:</span> {data.matarialStatus}</p>
                    <p><span className="font-medium">কোটা:</span> {data.quota}</p>
                </div>
            </div>

            {/* Parents Info */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">পিতামাতার তথ্য</h3>
                <div className="grid grid-cols-2 gap-4">
                    <p><span className="font-medium">বাবার নাম (Bn):</span> {data.fatherNameBn}</p>
                    <p><span className="font-medium">বাবার নাম (En):</span> {data.fatherNameEn}</p>
                    <p><span className="font-medium">মায়ের নাম (Bn):</span> {data.motherNameBn}</p>
                    <p><span className="font-medium">মায়ের নাম (En):</span> {data.motherNameEn}</p>
                </div>
            </div>

            {/* Contact Info */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">যোগাযোগের তথ্য</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p><span className="font-medium">মোবাইল:</span> {data.mobileNumber}</p>
                    <p><span className="font-medium">অন্য মোবাইল:</span> {data.otherMobileNumber}</p>
                    <p><span className="font-medium">ইমেইল:</span> {data.email}</p>
                    <p><span className="font-medium">বর্তমান ঠিকানা:</span> {data.presentAddress}</p>
                    <p><span className="font-medium">স্থায়ী ঠিকানা:</span> {data.permanentAddress}</p>
                </div>
            </div>

            {/* Identity Info */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">পরিচয় সম্পর্কিত তথ্য</h3>
                <div className="grid grid-cols-2 gap-4">
                    <p><span className="font-medium">জন্মনিবন্ধন নং:</span> {data.birthNumber}</p>
                    <p><span className="font-medium">NID:</span> {data.nidNumber}</p>
                    <p><span className="font-medium">পাসপোর্ট:</span> {data.passportId || "নাই"}</p>
                    <div className=" flex items-center gap-2 ">
                        <span className="font-medium">স্বাক্ষর:</span>{" "}
                        <Image width={50} height={50} src={data.signature} alt="Signature" className="w-32 h-16 object-contain" />
                    </div>
                </div>
            </div>

            {/* Education Info */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">শিক্ষাগত যোগ্যতা</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border">ডিগ্রি</th>
                                <th className="px-4 py-2 border">ক্যাটাগরি</th>
                                <th className="px-4 py-2 border">ইনস্টিটিউট</th>
                                <th className="px-4 py-2 border">বোর্ড</th>
                                <th className="px-4 py-2 border">পাশের বছর</th>
                                <th className="px-4 py-2 border">রোল</th>
                                <th className="px-4 py-2 border">রেজিস্ট্রেশন</th>
                                <th className="px-4 py-2 border">GPA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.educations.map((edu) => (
                                <tr key={edu._id} className="text-center">
                                    <td className="px-4 py-2 border">{edu.eduType}</td>
                                    <td className="px-4 py-2 border">{edu.categorie}</td>
                                    <td className="px-4 py-2 border">{edu.instituteName}</td>
                                    <td className="px-4 py-2 border">{edu.board}</td>
                                    <td className="px-4 py-2 border">{edu.passingYear}</td>
                                    <td className="px-4 py-2 border">{edu.roll}</td>
                                    <td className="px-4 py-2 border">{edu.reg}</td>
                                    <td className="px-4 py-2 border">{edu.gpa}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Extra Info */}
            {data.extra && data.extra.trim() !== "" && (
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">অতিরিক্ত তথ্য</h3>
                    <div className="border p-4 rounded bg-gray-50">
                        <p className="whitespace-pre-wrap">{data.extra}</p>
                    </div>
                </div>
            )}



            {/* Documents */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">ডকুমেন্টস</h3>
                <div className="flex flex-wrap gap-4">
                    {data.documents.map((doc, index) => (
                        <img
                            key={index}
                            src={doc}
                            alt={`Document ${index + 1}`}
                            className="w-32 h-32 border rounded"
                        />
                    ))}
                </div>
            </div>

            {/* CV Link */}
            {data.cvLink && (
                <div className="text-center my-8">
                    <Button asChild
                        className={"px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-full"}
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
