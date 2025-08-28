import React from "react";
import DataNotFound from "@/components/DataNotFound";
import { getMyJobProfile } from "@/handlers/profile";
import Link from "next/link";
import Image from "next/image";
import { demoProfilePicture } from "@/constans";
import JobProfileUpdateButton from "../../actions/JobProfileUpdateButton";

export default async function ProfileList() {
    const { status, data } = await getMyJobProfile();


    if (status !== 200 || !data?.length) {
        return <DataNotFound text={data?.message || "কোনো প্রোফাইল পাওয়া যায়নি।"} />;
    }



    return (
        <div className="my-20">
            <h2 className=" font-semibold text-2xl text-center my-5"> আপনার সমস্ত জব  প্রোফাইল </h2>
            <div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {data.map((profile) => (
                    <div
                        key={profile._id}
                        className="bg-white shadow-md rounded-xl p-5 border border-gray-200"
                    >
                        <div className="mb-2">
                            <div className=" flex items-center justify-between">
                                <div className="flex items-center gap-2 mb-2">
                                    <Image
                                        src={profile.photo || demoProfilePicture}
                                        width={50}
                                        height={50}
                                        alt="campus computer student photo"
                                        className=" w-12 h-12 rounded-full"
                                    />
                                    <h2 className="text-lg font-semibold text-gray-800">

                                        নাম: {profile?.nameBn || "N/A"}
                                    </h2>
                                </div>


                                {/* <ProfileUpdateButton data={profile} /> */}
                                <JobProfileUpdateButton data={profile} />

                            </div>
                            <p className="text-sm text-gray-500">
                                ⚧️ কার জন্য: {profile.isOtherPerson ? "অন্যের" : "নিজের"}
                            </p>
                        </div>


                        <div className="space-y-1 text-gray-700 text-sm">
                            <p>👨‍👩‍👦 পিতার নাম: {profile.fatherNameBn || profile.fatherNameEn}</p>
                            <p>👩‍👩‍👦 মাতার নাম: {profile.motherNameBn || profile.motherNameEn}</p>
                            <p>🆔 ছাত্র/ছাত্রী ID: {profile.studentId}</p>
                            {profile.phone && <p>📞 মোবাইল: {profile.phone}</p>}
                            {profile.address && <p>📍 ঠিকানা: {profile.address}</p>}
                            {profile.birthDate && <p>🎂 জন্ম তারিখ: {profile.birthDate}</p>}
                        </div>

                        {/* <AdditionalFileUploadButton profileId={profile._id} /> */}

                        <Link href={`/profile/details/job/${profile._id}`} className=" w-full my-4 text-center inline-block text-sm py-2 px-3 rounded-md bg-blue-500 text-white font-semibold">
                            বিস্তারিত
                        </Link>

                    </div>
                ))}
            </div>
        </div>

    );
}
