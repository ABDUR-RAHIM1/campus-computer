import Marquee from "react-fast-marquee";

export default function HomeMarquee() {
    return (
        <div className="px-3">
            <Marquee
                // gradient={true}
                speed={50}
                pauseOnHover={true}
                className="bg-gray-50 text-gray-600 font-medium py-1"
            >
                বাসায় বসে অনলাইনে কলেজে ভর্তি ফর্ম ও পেমেন্ট সুবিধা • দ্রুত তথ্য যাচাই • নিরাপদ ডিজাইন • শিক্ষার্থী ও অভিভাবক সহায়ক • শিক্ষা ছাড়াও যেকোনো পেশার জন্য
            </Marquee>
        </div>
    );
}
