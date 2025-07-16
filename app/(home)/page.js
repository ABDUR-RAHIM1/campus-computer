"use client"

import Image from 'next/image';
import { campusServices } from '@/LocalDatabase/campusComputer/campusItServices';
import Navbar from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { FaqSection } from '@/components/Faq';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';


const CampusComputerPage = () => {
    return (
        <div>
            <Navbar />

            <main>
                {/* Hero Section */}
                <Hero />

                {/* CampusIt Services Section */}
                <section id="services-list" className='py-16 bg-gradient-to-br from-gray-100 to-gray-200'>
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6 leading-tight">
                            আমাদের CampusIt এ সেবাসমূহ
                        </h2>
                        <p className="text-xl text-center text-gray-700 mb-12 max-w-4xl mx-auto">
                            CampusIt কম্পিউটার সেন্টার থেকে আপনি পাবেন বহুমুখী ডিজিটাল সেবা। প্রতিটি সেবাই নির্ভুলতা ও দ্রুততার সাথে প্রদান করা হয়।
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                            {campusServices.map((service) => (
                                <div
                                    key={service.id}
                                    className={`relative ${service.bgColor} rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl w-full max-w-sm`}
                                >
                                    <div className="p-5 flex flex-col items-center text-center">
                                        {service.icon && (
                                            <div className="w-full my-2">
                                                <Image
                                                    src={service.icon}
                                                    alt={service.title}
                                                    width={200}
                                                    height={200}
                                                    className="w-full h-[220px] rounded-md"
                                                />
                                            </div>
                                        )}
                                        <h3 className={`text-2xl font-bold ${service.textColor} mb-3`}>
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>
                                    <div className={`absolute bottom-0 left-0 w-full h-2 ${service.textColor.replace('text', 'bg')}`}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Automation System Info Section */}
                <section className="py-16 bg-white border-t border-gray-300">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
                            🎯 আমাদের অটোমেশন সিস্টেমের সুবিধাসমূহ
                        </h2>
                        <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
                            দূরবর্তী ছাত্রছাত্রীরা যাতে ঘরে বসে ভর্তি বা ফরম ফিলাপ করতে পারে — সে লক্ষ্যেই CampusIt তৈরি করেছে একটি সহজ ও অটোমেটেড অনলাইন সেবা।
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-gray-800">
                            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
                                <h4 className="text-xl font-semibold mb-2">📤 ঘরে বসে তথ্য জমা</h4>
                                <p>ছাত্ররা মোবাইল দিয়ে ছবি ও তথ্য আমাদের সাইটে জমা দিতে পারবে, আসতে হবে না দোকানে।</p>
                            </div>
                            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
                                <h4 className="text-xl font-semibold mb-2">⏳ সময় ও খরচ সাশ্রয়</h4>
                                <p>একাধিকবার কলেজ বা দোকানে আসার দরকার নেই — আমরা নিজেই সব জমা দিয়ে থাকি।</p>
                            </div>
                            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
                                <h4 className="text-xl font-semibold mb-2">📱 মোবাইল দিয়ে পেমেন্ট</h4>
                                <p>বিকাশ / রকেট এর মাধ্যমে পেমেন্ট করে কাজ সম্পন্ন করা যাবে। স্লিপ আমরাই জমা দিব।</p>
                            </div>
                            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
                                <h4 className="text-xl font-semibold mb-2">📁 ফাইল আপলোড সুবিধা</h4>
                                <p>ছবি, সার্টিফিকেট, NID সহ প্রয়োজনীয় ফাইল সহজেই আপলোড করা যাবে।</p>
                            </div>
                            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
                                <h4 className="text-xl font-semibold mb-2">🧾 কাজের কনফার্মেশন রিপোর্ট</h4>
                                <p>কাজ শেষ হলে আপনি দেখতে পাবেন কাজ কবে হয়েছে, কি জমা পড়েছে।</p>
                            </div>
                            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
                                <h4 className="text-xl font-semibold mb-2">💬 ২৪/৭ যোগাযোগ</h4>
                                <p>আপনার প্রশ্ন থাকলে WhatsApp বা মোবাইলে সহজেই যোগাযোগ করা যাবে।</p>
                            </div>
                        </div>
                    </div>
                </section>

                <FaqSection />
                {/* Contact Section */}
                <Contact />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default CampusComputerPage;
