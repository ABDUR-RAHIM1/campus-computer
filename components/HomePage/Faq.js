import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MessageCircle } from "lucide-react";

const faqs = [
    {
        question: "আবেদন করার জন্য আমাকে কি সশরীরে আসতে হবে?",
        answer: "না, আপনাকে কোথাও আসতে হবে না। আপনি আমাদের ওয়েবসাইটে অ্যাকাউন্ট খুলে প্রয়োজনীয় তথ্য ও ডকুমেন্ট আপলোড করে দিলেই আমাদের এক্সপার্ট টিম আপনার হয়ে আবেদন সম্পন্ন করে দিবে।"
    },
    {
        question: "আমার পেমেন্ট কি নিরাপদ? টাকা পাঠানোর পর কাজ না হলে কী হবে?",
        answer: "আমরা প্রতিটি পেমেন্টের জন্য ডিজিটাল রিসিট প্রদান করি। যদি কোনো বিশেষ কারণে আপনার আবেদনটি সম্পন্ন করা সম্ভব না হয়, তবে আমাদের রিফান্ড পলিসি অনুযায়ী আপনার টাকা ফেরত দেওয়া হবে।"
    },
    {
        question: "আবেদন সম্পন্ন হয়েছে কি না তা কীভাবে বুঝবো?",
        answer: "আপনার ড্যাশবোর্ডে লগইন করলে 'My Applications' সেকশনে প্রতিটি আবেদনের রিয়েল-টাইম স্ট্যাটাস দেখতে পাবেন। এছাড়া কাজ শেষ হলে আপনার মোবাইলে কনফার্মেশন মেসেজ চলে যাবে।"
    },
    {
        question: "ভুল তথ্য দিয়ে ফেললে কি সংশোধন করা যাবে?",
        answer: "আবেদনটি সাবমিট করার আগে আমাদের টিম তথ্যগুলো যাচাই করে। তবে আপনি যদি ভুল তথ্য দিয়ে থাকেন এবং আমাদের টিম কাজ শুরু না করে থাকে, তবে দ্রুত হেল্পলাইনে যোগাযোগ করে তা সংশোধন করতে পারবেন।"
    },
    {
        question: "জরুরি প্রয়োজনে আমি কীভাবে যোগাযোগ করতে পারি?",
        answer: "যেকোনো প্রয়োজনে আমাদের ওয়েবসাইটেই WhatsApp বাটন আছে অথবা আপনি সরাসরি 01611-530939 নম্বরে কল করতে পারেন। আমাদের সাপোর্ট টিম আপনাকে সাহায্য করার জন্য প্রস্তুত।"
    }
];

export default function FAQSection() {
    return (
        <section className="py-24 bg-[#f9fafb]">
            <div className="container mx-auto px-4 max-w-4xl">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full mb-4">
                        <HelpCircle size={20} />
                        <span className="text-sm font-bold uppercase tracking-wider">FAQ</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
                        মনে কি কোনো <span className="text-blue-600">প্রশ্ন</span> আছে?
                    </h2>
                    <p className="text-gray-500 font-medium">
                        স্টুডেন্টদের মনে সচরাচর আসা কিছু প্রশ্নের উত্তর এখানে দেওয়া হলো।
                    </p>
                </div>

                {/* Accordion Logic */}
                <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-xl shadow-blue-100/50 border border-gray-100">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="border-b border-gray-100 last:border-0"
                            >
                                <AccordionTrigger className="text-left text-lg font-bold text-gray-800 hover:text-blue-600 hover:no-underline py-6">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 text-base leading-relaxed pb-6 font-medium">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                {/* Contact CTA */}
                <div className="mt-12 text-center">
                    <p className="text-gray-500 mb-4 font-bold">আপনার প্রশ্নের উত্তর এখানে পাননি?</p>
                    {/* <button className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-600 transition-all shadow-lg">
                        <MessageCircle size={20} />
                        সরাসরি মেসেজ দিন
                    </button> */}
                    <a href="https://wa.me/8801611530939" target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-600 transition-all shadow-lg"
                    >
                        <MessageCircle size={20} />
                        সরাসরি মেসেজ দিন
                    </a>
                </div>

            </div>
        </section>
    );
}