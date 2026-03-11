"use client"
import React, { useState } from 'react';
import { dashboardNavItems } from "@/LocalDatabase/DashbboardNavItems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Cross, MenuIcon, X } from "lucide-react";
import Logo from '@/utilities/Logo';

export default function DashboardSidebar() {
  const pathname = usePathname();
  // কোন ড্রপডাউনটি খোলা থাকবে তা ট্র্যাক করার জন্য স্টেট
  const [openMenus, setOpenMenus] = useState({});
  const [menuClick, setMenuClick] = useState(false);

  const toggleMenu = (name) => {
    setOpenMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleOpenMenu = () => {
    setMenuClick(!menuClick)
  }

  return (
    <>
      <div className='w-full flex items-center justify-between fixed md:hidden top-0 right-0 px-4 bg-white border-b py-3 clear-both z-50'>

        <Logo />
        {

          menuClick ? <X size={30} onClick={handleOpenMenu} /> : <MenuIcon size={30} onClick={handleOpenMenu} />
        }
      </div>
      <aside className={`${menuClick ? "flex" : "hidden"} md:flex w-[260px] h-screen fixed md:sticky top-0 bg-white shadow-sm  flex-col border-r border-gray-100 overflow-hidden z-10`}>
        {/* লোগো সেকশন */}
        <div className="p-6 text-xl font-black text-blue-600 tracking-tighter border-b border-gray-50 uppercase">
          Campus <span className="text-gray-900">Computer</span>
        </div>

        {/* নেভিগেশন মেনু */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-hide">
          {dashboardNavItems.map((item, index) => {
            const hasChildren = item.children && item.children.length > 0;
            const isOpen = openMenus[item.name];
            const isActive = pathname === item.href;

            return (
              <div key={index} className="space-y-1">
                {hasChildren ? (
                  // 📂 ড্রপডাউন প্যারেন্ট আইটেম
                  <div>
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                      ${isOpen ? "bg-gray-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={20} className={`${isOpen ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"}`} />
                        <span className="text-sm font-bold tracking-tight">{item.name}</span>
                      </div>
                      {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>

                    {/* 📂 চাইল্ড আইটেম লিস্ট (অ্যানিমেশন ইফেক্টসহ) */}
                    {isOpen && (
                      <div className="mt-1 ml-4 pl-4 border-l-2 border-gray-100 space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
                        {item.children.map((child, idx) => (
                          <Link
                            key={idx}
                            href={child.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition-all
                            ${pathname === child.href
                                ? "bg-blue-50 text-blue-700 shadow-sm shadow-blue-100/50"
                                : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"}`}
                          >
                            <child.icon size={14} />
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // 🔗 সরাসরি লিংক (যেগুলোর চাইল্ড নেই)
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                    ${isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200 font-medium"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                  >
                    <item.icon size={20} className={`${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600"}`} />
                    <span className="text-sm font-bold tracking-tight">{item.name}</span>
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* ফুটার সেকশন (অপশনাল) */}
        <div className="p-4 border-t border-gray-50">
          <div className="bg-gray-50 rounded-2xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
              A
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase leading-none">Admin</p>
              <p className="text-xs font-bold text-gray-700">Campus Admin</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

