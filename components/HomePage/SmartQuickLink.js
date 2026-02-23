import React from 'react';
import {
    Search,
    Bell,
    LayoutGrid,
    HelpCircle,
    ExternalLink,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const quickLinks = [
    {
        id: 1,
        title: "ফলাফল চেক",
        subtitle: "সব বোর্ডের রেজাল্ট",
        icon: <Search className="text-blue-600" />,
        link: "http://www.educationboardresults.gov.bd/",
        bgColor: "bg-blue-50",
        isExternal: true
    },
    {
        id: 2,
        title: "ভর্তি নোটিশ",
        subtitle: "নতুন সব সার্কুলার",
        icon: <Bell className="text-orange-600" />,
        link: "/jobs",
        bgColor: "bg-orange-50",
        isExternal: false
    },
    {
        id: 3,
        title: "সব সার্ভিস",
        subtitle: "আবেদনের তালিকা",
        icon: <LayoutGrid className="text-indigo-600" />,
        link: "/services/college",
        bgColor: "bg-indigo-50",
        isExternal: false
    },
    {
        id: 4,
        title: "সহায়তা নিন",
        subtitle: "কীভাবে আবেদন করবেন?",
        icon: <HelpCircle className="text-emerald-600" />,
        link: "/howToWork",
        bgColor: "bg-emerald-50",
        isExternal: false
    }
];

export default function SmartQuickLinks() {
    return (
        <section className="relative z-30 -mt-12 mb-10 container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {quickLinks.map((item) => (
                    <Link
                        key={item.id}
                        href={item.link}
                        target={item.isExternal ? "_blank" : "_self"}
                        className="group bg-white p-5 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-blue-200/40 hover:-translate-y-1 transition-all duration-300 flex items-center gap-4"
                    >
                        {/* Icon Container */}
                        <div className={`h-14 w-14 shrink-0 flex items-center justify-center rounded-2xl ${item.bgColor} group-hover:scale-110 transition-transform duration-500`}>
                            {React.cloneElement(item.icon, { size: 26 })}
                        </div>

                        {/* Content */}
                        <div className="overflow-hidden">
                            <h4 className="text-[15px] font-black text-gray-800 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                                {item.title}
                                {item.isExternal && <ExternalLink size={12} className="text-gray-400" />}
                            </h4>
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight mt-0.5 truncate">
                                {item.subtitle}
                            </p>
                        </div>

                        {/* Hover Arrow */}
                        <div className="ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            <ArrowRight size={18} className="text-blue-600" />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}