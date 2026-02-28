import Link from "next/link";
import Marquee from "react-fast-marquee";

export default function HomeMarquee() {
    return (
        <div className="bg-blue-600 py-2">
            <div className="container mx-auto px-4 flex items-center justify-center gap-3 text-white text-sm font-bold">
                <span className="bg-white text-blue-600 px-2 py-0.5 rounded text-[10px] uppercase">New</span>
                <p>অনার্স ২য় বর্ষের ফরম ফিলাপ শুরু হয়েছে! আজই আবেদন করো।</p>
                <Link href="/services/college" className="underline decoration-white/50 hover:text-blue-200 transition-all">বিস্তারিত</Link>
            </div>
        </div>
    );
}
