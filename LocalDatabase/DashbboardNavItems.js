import {
    LayoutDashboard,
    ShoppingCart,
    CreditCard,
    Users,
    Wrench,
    Link as LinkIcon,
    ClipboardList,
    Settings,
} from "lucide-react";

export const dashboardNavItems = [
    { name: "ড্যাশবোর্ড", href: "/dashboard", icon: LayoutDashboard },
    { name: "অর্ডারসমূহ", href: "/dashboard/orders", icon: ShoppingCart },
    { name: "পেমেন্ট ইতিহাস", href: "/dashboard/payments", icon: CreditCard },
    { name: "স্টুডেন্ট তালিকা", href: "/dashboard/student-list", icon: Users },
    { name: "জব প্রোফাইল তালিকা", href: "/dashboard/jobs-profile", icon: Users },
    { name: "সার্ভিস", href: "/dashboard/services", icon: Wrench },
    { name: "সাব-এডমিন", href: "/dashboard/sub-admins", icon: Wrench },
    { name: "জব পোষ্ট", href: "/dashboard/job-post/add", icon: Wrench },
    { name: "লিংক গুলো", href: "/dashboard/quickLink", icon: LinkIcon },
    { name: "নোটিশ বোর্ড", href: "/dashboard/notices", icon: ClipboardList },
    { name: "সেটিংস", href: "/dashboard/settings", icon: Settings },
];
