import React from 'react';
import { 
  Card, CardHeader, CardTitle, CardContent 
} from '@/components/ui/card';
import { 
  Plus, Search, MoreVertical, 
  CheckCircle2, Clock, XCircle, 
  ArrowRight, Download
} from 'lucide-react';
// import DashboardOverview from './DashboardOverview'; // আপনার আগের কার্ডগুলো এখানে থাকবে

export default function FullAdminDashboard() {
  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-10 space-y-10">
      
      {/* 1. Top Stats Cards (আগের তৈরি করা Overview) */}
      {/* <DashboardOverview /> */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 2. Recent Orders Table (বড় অংশ) */}
        <Card className="lg:col-span-2 rounded-[2.5rem] border-none shadow-xl shadow-blue-100/50 overflow-hidden bg-white">
          <CardHeader className="flex flex-row items-center justify-between p-8 border-b border-gray-50">
            <div>
              <CardTitle className="text-2xl font-black tracking-tighter text-gray-900">সাম্প্রতিক অর্ডারসমূহ</CardTitle>
              <p className="text-gray-500 text-sm font-medium">সর্বশেষ ৫টি ট্রানজেকশন</p>
            </div>
            <button className="p-3 bg-gray-50 hover:bg-blue-50 text-blue-600 rounded-2xl transition-all">
              <Search size={20} />
            </button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-gray-400 text-[10px] uppercase font-black tracking-widest">
                  <tr>
                    <th className="px-8 py-4">স্টুডেন্ট</th>
                    <th className="px-4 py-4">সার্ভিস</th>
                    <th className="px-4 py-4">স্ট্যাটাস</th>
                    <th className="px-8 py-4 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <tr key={i} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">S</div>
                          <div>
                            <p className="font-bold text-gray-900 text-sm">আরিফুল ইসলাম</p>
                            <p className="text-xs text-gray-400">০১৭xxxxxxx</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-5 text-sm font-bold text-gray-600">অনার্স ভর্তি আবেদন</td>
                      <td className="px-4 py-5">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase">
                          <CheckCircle2 size={12} /> সম্পন্ন
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button className="p-2 hover:bg-white rounded-lg transition-all text-gray-400 hover:text-blue-600">
                          <ArrowRight size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 text-center border-t border-gray-50">
              <button className="text-blue-600 font-black text-xs uppercase tracking-widest hover:underline">সকল অর্ডার দেখুন</button>
            </div>
          </CardContent>
        </Card>

        {/* 3. Quick Actions & Status (ছোট অংশ) */}
        <div className="space-y-8">
          {/* Quick Action Card */}
          <Card className="rounded-[2.5rem] bg-gray-900 p-8 text-white border-none shadow-2xl">
            <h3 className="text-xl font-black mb-6 tracking-tighter italic">Quick Operations</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-3xl hover:bg-blue-600 transition-all border border-white/5 group">
                <Plus className="mb-2 group-hover:rotate-90 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-widest">নতুন সার্ভিস</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-3xl hover:bg-purple-600 transition-all border border-white/5">
                <Download className="mb-2" />
                <span className="text-[10px] font-bold uppercase tracking-widest">রিপোর্ট নামান</span>
              </button>
            </div>
          </Card>

          {/* Pending Reviews / Small Chart Placeholder */}
          <Card className="rounded-[2.5rem] border-none shadow-xl p-8 bg-white overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-lg font-black text-gray-900 mb-4 tracking-tighter">সিস্টেম হেলথ</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-bold">সার্ভার স্ট্যাটাস</span>
                  <span className="text-emerald-500 font-black uppercase text-[10px]">Active</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="w-[95%] h-full bg-blue-600"></div>
                </div>
                <div className="flex justify-between items-center text-sm pt-2">
                  <span className="text-gray-500 font-bold">পেন্ডিং অর্ডার</span>
                  <span className="text-orange-500 font-black uppercase text-[10px]">১২টি বাকি</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl -z-0"></div>
          </Card>
        </div>

      </div>
    </div>
  );
}