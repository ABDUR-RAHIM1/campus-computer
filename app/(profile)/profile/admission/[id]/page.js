import DataNotFound from '@/components/DataNotFound';
import { fetchSingelAdmissionServices } from '@/handlers/Admissions';
import React from 'react'
import AdmissionServiceForm from '../AdmissionServiceForm';
import { Calendar, Clock, AlertCircle } from 'lucide-react'; // আইকন যোগ করলাম

export default async function AdmissionOrder({ params }) {
    const { id } = await params;
    const { status, data: admissionService } = await fetchSingelAdmissionServices(id);

    if (status !== 200 || !admissionService) {
        return <DataNotFound text={admissionService?.message || 'Admission Services Not found!'} />
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] py-6 md:py-12">
            <div className="max-w-7xl mx-auto px-4">

                {/* টপ বার: ডেডলাইন স্টিকি বা হাইলাইট */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-blue-100 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                            <Calendar size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">Application Deadline</p>
                            <p className="text-sm font-bold text-gray-700">{new Date(admissionService.deadline).toDateString("bn-BD") || "Not Specified"}</p>
                        </div>
                    </div>

                    {/* যদি হাতে সময় কম থাকে তবে একটি ওয়ার্নিং ব্যাজ */}
                    <div className="flex items-center gap-2 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full text-xs font-bold border border-orange-100">
                        <Clock size={14} className="animate-pulse" />
                        আবেদন দ্রুত সম্পন্ন করুন
                    </div>
                </div>

                {/* মেইন ডাইনামিক ফরম কম্পোনেন্ট (যা এখন স্প্লিট লেআউট হবে) */}
                <AdmissionServiceForm admissionService={admissionService} />

                {/* ফুটার নোট */}
                <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 text-sm">
                    <AlertCircle size={14} />
                    <span>কোনো ভুল তথ্য প্রদান করলে আবেদন বাতিল বলে গণ্য হবে।</span>
                </div>
            </div>
        </div>
    )
}