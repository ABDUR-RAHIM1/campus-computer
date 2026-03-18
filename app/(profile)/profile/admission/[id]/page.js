import DataNotFound from '@/components/DataNotFound';
import { fetchSingelAdmissionServices } from '@/handlers/Admissions';
import React from 'react'
import AdmissionServiceForm from '../AdmissionServiceForm';
import { Calendar, Clock, AlertCircle, Bookmark, Layers, ShieldCheck } from 'lucide-react';
import AdmissionFees from '../AdmissionFees';

export default async function AdmissionOrder({ params }) {
    const { id } = await params;
    const { status, data: admissionService } = await fetchSingelAdmissionServices(id);

    if (status !== 200 || !admissionService) {
        return <DataNotFound text={admissionService?.message || 'Admission Services Not found!'} />
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] py-6 md:py-12">
            <div className="max-w-4xl mx-auto px-4"> {/* ফর্মের জন্য max-w-4xl বেশি ক্লিন দেখায় */}

                {/* ১. টপ হেডার: টাইটেল ও ডেডলাইন */}
                <div className="mb-6 bg-white p-6 rounded-3xl border border-blue-100 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg">
                                <Calendar size={24} />
                            </div>
                            <div>
                                <h1 className="text-xl font-black text-gray-800 uppercase tracking-tight">
                                    {admissionService.serviceName}
                                </h1>
                                <p className="text-sm font-bold text-gray-400">
                                    শেষ সময়: {new Date(admissionService.deadline).toLocaleDateString("bn-BD", { day: 'numeric', month: 'long', year: 'numeric' })}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-2xl text-xs font-black border border-orange-100 animate-pulse">
                            <Clock size={16} /> দ্রুত আবেদন করুন
                        </div>
                    </div>
                </div>

                {/* ২. সার্ভিস টাইপ সিলেকশন ও ফি সামারি */}
                <div className="mb-8 bg-white rounded-3xl border border-blue-100 shadow-sm overflow-hidden">
                    <h2 className=' text-center text-xl font-bold my-3'>{admissionService?.institute?.username || "N/A"}</h2>
                    <div className="pt-6 border-t border-dashed border-gray-100">
                        <AdmissionFees
                            collegeFee={admissionService.collegeFee}
                            processingFee={admissionService.processingFee}
                            serviceCharge={admissionService.serviceCharge}
                        />
                    </div>
                </div>

                {/* ৩. মেইন ইনপুট ফরম */}
                <div className="bg-white rounded-3xl border border-blue-100 shadow-sm p-3 md:p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <Layers className="text-blue-600" size={20} />
                        <h2 className="font-black text-gray-700 uppercase text-sm tracking-widest">আবেদনকারীর তথ্য</h2>
                    </div>
                    <AdmissionServiceForm admissionService={admissionService} />
                </div>

                {/* ফুটার নোট */}
                <div className="mt-8 flex flex-col items-center gap-2 text-gray-400 text-xs text-center font-medium italic">
                    <div className="flex items-center gap-1">
                        <AlertCircle size={14} className="text-red-400" />
                        <span>ভুল তথ্য প্রদান করলে আবেদন বাতিল বলে গণ্য হবে।</span>
                    </div>
                    <p>Powered by AR IT Solutions & Campus Computer</p>
                </div>
            </div>
        </div>
    )
}