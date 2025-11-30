import DataNotFound from "@/components/DataNotFound";
import { Button } from "@/components/ui/button";
import { GetAllJobPost } from "@/handlers/jobPost";
import Link from "next/link";
import { CalendarDays, Tag } from "lucide-react";
import { formatDateToInput } from "@/utilities/formatDateToInput";

export default async function Jobs() {
    const { status, data } = await GetAllJobPost();

    if (status !== 200 || !data || data.length === 0) {
        return <DataNotFound />;
    }

    return (
        <div className="min-h-screen gradientBg p-6">
            <div className="max-w-7xl mx-auto my-10">

                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center border-b border-b-black">
                    📰 সাম্প্রতিক চাকরি নিয়োগ বিজ্ঞপ্তি
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((job) => (
                        <div
                            key={job._id}
                            className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border"
                        >
                            {/* Title */}
                            <h2 className="text-xl font-semibold capitalize text-gray-800 mb-2 line-clamp-2">
                                {job.title}
                            </h2>

                            {/* Category */}
                            <div className="flex items-center gap-2 mb-3">
                                <Tag size={16} className="text-gray-600" />
                                <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">
                                    {job.category || "Uncategorized"}
                                </span>
                            </div>

                            {/* Dates Block */}
                            <div className="space-y-1 text-sm text-gray-700 mb-4">
                                <div className="flex items-center gap-2">
                                    <CalendarDays size={16} className="text-gray-600" />
                                    <span>
                                        <strong>আবেদন শুরু:</strong>{" "}
                                        {job.startDate
                                            ? formatDateToInput(job.startDate)
                                            : "N/A"}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <CalendarDays size={16} className="text-gray-600" />
                                    <span>
                                        <strong>শেষ তারিখ:</strong>{" "}
                                        {job.endDate
                                            ? formatDateToInput(job.endDate)
                                            : "N/A"}
                                    </span>
                                </div>
                            </div>

                            {/* Payment Fee */}
                            <p className="text-sm font-medium text-gray-700 mb-3">
                                👮 মোট পদসংখা: {job.totalVacancy || 0} জন
                            </p>

                            {/* Button */}
                            <Button
                                asChild
                                className="w-full mt-4 rounded-full bg-gray-900 hover:bg-[#52c4d5] cursor-pointer"
                            >
                                <Link href={`/jobs/${job._id}`}>
                                    বিস্তারিত দেখুন
                                </Link>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
