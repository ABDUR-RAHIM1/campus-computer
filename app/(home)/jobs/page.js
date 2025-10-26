import DataNotFound from "@/components/DataNotFound";
import { Button } from "@/components/ui/button";
import { GetAllJobPost } from "@/handlers/jobPost";

export default async function Jobs() {
    const { status, data } = await GetAllJobPost();


    if (status !== 200 || !data || data.length === 0) {
        return <DataNotFound />;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    📰 সকল চাকরির তালিকা
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((job) => (
                        <div
                            key={job._id}
                            className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                {job.title}
                            </h2>
                            <p className="text-sm text-gray-500 mb-3">
                                🏢 {job.organization || "নিয়োগকারী প্রতিষ্ঠান"} | 📍{" "}
                                {job.location || "বাংলাদেশ"}
                            </p>
                            <p className="text-sm font-medium text-gray-700 mb-3">
                                💰 Apply Fee: {job.totalPrice} BDT
                            </p>

                            <div className=" text-right">
                                <a href={job.noticeLink} target="_blank" className={" inline-block rounded-full text-blue-500 underline text-sm text-right"}>
                                    নোটিশ দেখুন
                                </a>
                            </div>

                            <Button className={" w-full rounded-full bg-black hover:bg-gray-900  my-5 cursor-pointer"}>
                                আবেদন করতে অর্ডার করুন
                            </Button>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
