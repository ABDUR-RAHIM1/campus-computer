import DataNotFound from '@/components/DataNotFound';
import ServicesCard from '@/components/services/ServicesCard';
import { getAllServices } from '@/handlers/services'
import React from 'react'

export default async function CollageServices() {
    const { status, data } = await getAllServices();

    if (status !== 200 || !data) {
        return <DataNotFound text={data?.message} />
    }

    return (
        <div className=' px-5 md:px-12 my-10 min-h-screen'>

            <div className=' my-5 '>
                <p className="text-gray-700 mb-6 leading-relaxed">
                    নিচে তালিকাভুক্ত সেবাগুলোর মাধ্যমে আপনি ঘরে বসেই কলেজের বিভিন্ন কাজ সম্পন্ন করতে পারবেন। প্রতিটি সেবার জন্য নির্দিষ্ট কিছু তথ্য প্রদান, প্রয়োজনীয় ডকুমেন্ট আপলোড এবং ফি পরিশোধের প্রয়োজন হতে পারে। <br /><br />

                    🛎️ আমাদের প্রতিটি সেবা আপনি অনলাইনে ঘরে বসেই নিতে পারবেন — আপনাকে আর কলেজ বা অফিসে এসে লম্বা লাইনে দাঁড়াতে হবে না। <br />
                    📤 আবেদন বাটনে ক্লিক করলেই আপনার নির্দিষ্ট ফি দেখাবে এবং ফী প্রদানের মাধ্যমে আমরা আপনার পক্ষ থেকে সকল আবেদন, ফরম পূরণ, ডকুমেন্ট প্রসেসিং ও সাবমিশন সম্পূর্ণ করে দিব। <br />
                    📱 আপনি আপনার প্রোফাইল থেকেই প্রতিটি আবেদনের আপডেট, অবস্থা (Status), ও কনফার্মেশন দেখতে পারবেন — ফলে সবকিছু থাকবে সম্পূর্ণ আপনার নিয়ন্ত্রণে। <br />
                    🧾 এটি একটি নিরাপদ ও নির্ভরযোগ্য ডিজিটাল সেবা, যেখানে আপনার সময় ও ঝামেলা দুটোই কমবে।
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <ServicesCard data={data} />
            </div>
        </div>
    )
}
