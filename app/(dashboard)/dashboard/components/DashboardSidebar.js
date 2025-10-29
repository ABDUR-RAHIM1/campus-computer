"use client"
import { dashboardNavItems } from "@/LocalDatabase/DashbboardNavItems";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[250px] h-screen sticky top-0 bg-white shadow-lg flex flex-col border-r border-gray-200 overflow-y-auto">
      <div className="p-4 text-xl font-bold text-blue-600 border-b">
        Campus Computer
      </div>

      <nav className=" p-3 space-y-2">
        {dashboardNavItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200
              ${
                pathname === item.href
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            <item.icon size={18} />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
