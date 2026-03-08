import React from "react";
import DataNotFound from "@/components/DataNotFound";
import { getMyAllProfile } from "@/handlers/profile";
import Link from "next/link";
import ProfileUpdateButton from "../../actions/ProfileUpdateButton";
import AdditionalFileUploadButton from "../../components/AdditionalFileUploadButton";
import Image from "next/image";
import { demoProfilePicture } from "@/constans";
import { User, Phone, BookOpen, GraduationCap, Calendar, Hash, ArrowRight } from "lucide-react";

export default async function ProfileList() {
    const { status, data } = await getMyAllProfile();

    if (status !== 200 || !data?.length) {
        return <DataNotFound text={data?.message || "কোনো প্রোফাইল পাওয়া যায়নি।"} />;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col items-center mb-10 text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    আপনার সমস্ত <span className="text-green-600">প্রোফাইল</span>
                </h2>
                <div className="h-1.5 w-20 bg-green-500 rounded-full mt-3"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.map((profile) => (
                    <div
                        key={profile._id}
                        className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative"
                    >
                        {/* কার্ডের উপরের ডেকোরেটিভ বর্ডার */}
                        <div className="h-2 w-full bg-gradient-to-r from-green-400 to-blue-500"></div>

                        <div className="p-6">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="relative p-1 rounded-full border-2 border-green-100 group-hover:border-green-400 transition-colors">
                                        <Image
                                            src={profile.profilePicture || demoProfilePicture}
                                            width={60}
                                            height={60}
                                            alt="Student photo"
                                            className="w-14 h-14 rounded-full object-cover shadow-inner"
                                        />
                                        <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${profile.isOtherStudent ? 'bg-orange-400' : 'bg-green-500'}`} title={profile.isOtherStudent ? "অন্যের প্রোফাইল" : "নিজের প্রোফাইল"}></span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 leading-tight">
                                            {profile?.studentName || profile?.studentId?.username}
                                        </h3>
                                        <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400 flex items-center gap-1">
                                            <User size={12} /> {profile.isOtherStudent ? "Others Profile" : "Own Profile"}
                                        </span>
                                    </div>
                                </div>
                                <ProfileUpdateButton data={profile} />
                            </div>

                            <div className="grid grid-cols-1 gap-3 mb-6">
                                <ProfileInfo icon={<GraduationCap size={16}/>} label="বিভাগ" value={profile.department} />
                                <ProfileInfo icon={<BookOpen size={16}/>} label="প্রতিষ্ঠান" value={profile?.institute?.username || "N/A"} />
                                <ProfileInfo icon={<Phone size={16}/>} label="মোবাইল" value={profile.contactNumber || profile?.studentId.phone} />
                                <div className="grid grid-cols-2 gap-2">
                                    <ProfileInfo icon={<Hash size={16}/>} label="রোল" value={profile.classRoll} />
                                    <ProfileInfo icon={<Calendar size={16}/>} label="সেশন" value={profile.session} />
                                </div>
                                <ProfileInfo icon={<Hash size={16}/>} label="রেজিস্ট্রেশন" value={profile.registrationNumber} />
                            </div>

                            <div className="flex flex-col gap-3">
                                <AdditionalFileUploadButton profileId={profile._id} />
                                <Link 
                                    href={`/profile/details/${profile._id}`} 
                                    className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gray-900 hover:bg-black text-white text-sm font-bold transition-all transform group-hover:translate-y-[-2px]"
                                >
                                    বিস্তারিত তথ্য <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// সাব-কম্পোনেন্ট কার্ডের ভেতরের তথ্যের জন্য
function ProfileInfo({ icon, label, value }) {
    return (
        <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg border border-transparent hover:border-gray-200 transition-all">
            <span className="text-green-600">{icon}</span>
            <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase font-bold leading-none mb-1">{label}</span>
                <span className="text-sm font-semibold text-gray-700 truncate">{value}</span>
            </div>
        </div>
    );
}