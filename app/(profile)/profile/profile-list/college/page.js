import React from "react";
import DataNotFound from "@/components/DataNotFound";
import { getMyAllProfile } from "@/handlers/profile";
import Link from "next/link";
import ProfileUpdateButton from "../../actions/ProfileUpdateButton";
import AdditionalFileUploadButton from "../../components/AdditionalFileUploadButton";
import Image from "next/image";
import { demoProfilePicture } from "@/constans";

export default async function ProfileList() {
    const { status, data } = await getMyAllProfile();

    if (status !== 200 || !data?.length) {
        return <DataNotFound text={data?.message || "কোনো প্রোফাইল পাওয়া যায়নি।"} />;
    }
 

    return (
        <div className="my-20">
            <h2 className=" font-semibold text-2xl text-center my-5"> আপনার সমস্ত প্রোফাইল </h2>
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
                                        src={profile.profilePicture || demoProfilePicture}
                                        width={50}
                                        height={50}
                                        alt="campus computer student photo"
                                        className=" w-12 h-12 rounded-full"
                                    />
                                    <h2 className="text-lg font-semibold text-gray-800">

                                        নাম: {profile?.studentName || profile?.studentId?.username}
                                    </h2>
                                </div>


                                <ProfileUpdateButton data={profile} />

                            </div>
                            <p className="text-sm text-gray-500">
                                ⚧️ কার জন্য: {profile.isOtherStudent ? "অন্যের" : "নিজের"}
                            </p>
                        </div>

                        <div className="space-y-1 text-sm text-gray-700">
                            <p>🎓 শ্রেণি: {profile.department}</p>
                            <p>🏫 প্রতিষ্ঠান: {profile?.institute?.username || "N/A"}</p>
                            <p>📞 মোবাইল: {profile.contactNumber || profile?.studentId.phone}</p>
                            <p>🔖 রোল নম্বর: {profile.classRoll}</p>
                            <p>📝 রেজিস্ট্রেশন নম্বর: {profile.registrationNumber}</p>
                            <p>📅 শিক্ষাবর্ষ: {profile.session}</p>
                        </div>

                        <AdditionalFileUploadButton profileId={profile._id} />

                        <Link href={`/profile/details/${profile._id}`} className=" w-full my-4 text-center inline-block text-sm py-2 px-3 rounded-md bg-blue-500 text-white font-semibold">
                            বিস্তারিত
                        </Link>

                    </div>
                ))}
            </div>
        </div>

    );
}
