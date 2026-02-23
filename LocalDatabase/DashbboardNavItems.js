import {
    LayoutDashboard,
    ShoppingCart,
    CreditCard,
    Users,
    UserCircle,
    Wrench,
    GraduationCap,
    ShieldCheck,
    Briefcase,
    PlusCircle,
    Eye,
    Link as LinkIcon,
    ClipboardList,
    Settings,
} from "lucide-react";

export const dashboardNavItems = [
    { name: "ড্যাশবোর্ড", href: "/dashboard", icon: LayoutDashboard },
    { name: "অর্ডারসমূহ", href: "/dashboard/orders", icon: ShoppingCart },
    { name: "পেমেন্ট ইতিহাস", href: "/dashboard/payments", icon: CreditCard },

    // স্টুডেন্ট ও প্রোফাইল সেকশন
    {
        name: "শিক্ষার্থী ও জব",
        icon: Users,
        children: [
            { name: "স্টুডেন্ট তালিকা", href: "/dashboard/student-list", icon: Users },
            { name: "জব প্রোফাইল", href: "/dashboard/jobs-profile", icon: UserCircle },
        ]
    },

    // সার্ভিস ও এডমিশন
    {
        name: "সেবাসমূহ",
        icon: Wrench,
        children: [
            { name: "সকল সার্ভিস", href: "/dashboard/services", icon: Wrench },
            { name: "এডমিশন", href: "/dashboard/services/admission", icon: GraduationCap },
        ]
    },

    // জব ম্যানেজমেন্ট
    {
        name: "জব পোস্ট",
        icon: Briefcase,
        children: [
            { name: "নতুন পোস্ট", href: "/dashboard/job-post/add", icon: PlusCircle },
            { name: "পোস্ট দেখুন", href: "/dashboard/job-post/view", icon: Eye },
        ]
    },

    { name: "সাব-এডমিন", href: "/dashboard/sub-admins", icon: ShieldCheck },
    { name: "লিংক গুলো", href: "/dashboard/quickLink", icon: LinkIcon },
    { name: "নোটিশ বোর্ড", href: "/dashboard/notices", icon: ClipboardList },
    { name: "সেটিংস", href: "/dashboard/settings", icon: Settings },
];