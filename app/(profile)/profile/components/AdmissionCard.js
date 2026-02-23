import { Calendar, CreditCard, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdmissionCard({ admissionData }) {
    return (
        <>
            {admissionData.map((item) => (
                <div key={item._id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                                Admission Open
                            </span>
                            <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                                <Calendar size={20} />
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight">
                            {item.serviceName}
                        </h3>

                        <div className="space-y-2 mb-6">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Calendar size={14} className="text-red-400" />
                                <span>শেষ তারিখ: <strong>{new Date(item.deadline).toLocaleDateString('bn-BD')}</strong></span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <CreditCard size={14} className="text-emerald-500" />
                                <span>চার্জ: <strong>{item.serviceCharge} ৳</strong></span>
                            </div>
                        </div>
                    </div>

                    {/* এই লিংকটি ইউজারকে সরাসরি আলাদা ফর্ম পেজে নিয়ে যাবে */}
                    <Link href={`/profile/admission/${item._id}`}>
                        <Button className="w-full bg-slate-900 hover:bg-blue-600 text-white rounded-xl flex items-center gap-2 group">
                            আবেদন করুন
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            ))}
        </>
    );
}