import { Calendar, CreditCard, ArrowRight, Wallet, Info, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdmissionCard({ admissionData }) {
    return (
        <>
            {admissionData.map((item) => (
                <div key={item._id} className="group bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
                    
                    {/* টপ ডেকোরেশন */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-bl-full -mr-10 -mt-10 group-hover:bg-blue-100 transition-colors"></div>

                    <div>
                        <div className="flex justify-between items-start mb-6 relative">
                            <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-wider border border-emerald-100 flex items-center gap-1">
                                <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                Admission Open
                            </span>
                            <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                                <Wallet size={22} />
                            </div>
                        </div>

                        <h3 className="text-xl font-black text-slate-800 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                            {item.serviceName}
                        </h3>

                        {/* ফি সামারি গ্রিড */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">কলেজ ফি</p>
                                <p className="text-sm font-black text-slate-700">{item.collegeFee || 0}৳</p>
                            </div>
                            <div className="bg-blue-50/50 p-3 rounded-2xl border border-blue-100">
                                <p className="text-[10px] font-bold text-blue-400 uppercase mb-1">সার্ভিস চার্জ</p>
                                <p className="text-sm font-black text-blue-600">{item.serviceCharge}৳</p>
                            </div>
                        </div>

                        {/* ডেডলাইন সেকশন */}
                        <div className="flex items-center gap-3 py-3 px-4 bg-red-50/50 border border-red-100 rounded-2xl mb-6">
                            <div className="bg-red-100 p-1.5 rounded-lg text-red-500">
                                <Calendar size={14} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-red-400 uppercase leading-none mb-1">Last Date</p>
                                <p className="text-sm font-black text-red-600">
                                    {new Date(item.deadline).toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* অ্যাকশন বাটন */}
                    <Link href={`/profile/admission/${item._id}`} className="block">
                        <Button className="w-full h-14 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl flex items-center justify-center gap-3 group/btn shadow-lg hover:shadow-blue-200 transition-all active:scale-95">
                            <span className="font-black text-sm uppercase tracking-widest">আবেদন করুন</span>
                            <div className="bg-white/10 p-1.5 rounded-lg group-hover/btn:translate-x-1 group-hover/btn:bg-white/20 transition-all">
                                <ArrowRight size={18} />
                            </div>
                        </Button>
                    </Link>
                </div>
            ))}
        </>
    );
}