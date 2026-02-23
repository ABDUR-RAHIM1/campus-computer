import { Monitor, CreditCard, ShieldCheck, Zap } from 'lucide-react';

export default function ServicesInfo() {
    const features = [
        { icon: <Monitor size={16} />, text: "১০০% অনলাইন সেবা" },
        { icon: <Zap size={16} />, text: "দ্রুত প্রসেসিং" },
        { icon: <ShieldCheck size={16} />, text: "নিরাপদ ও নির্ভরযোগ্য" },
        { icon: <CreditCard size={16} />, text: "সহজ ফি পরিশোধ" }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
            {features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 bg-blue-50/50 p-2.5 rounded-xl border border-blue-100">
                    <span className="text-blue-600 bg-white p-1 rounded-md shadow-sm">{f.icon}</span>
                    <span className="text-[11px] font-bold text-blue-900 leading-tight">{f.text}</span>
                </div>
            ))}
        </div>
    );
}