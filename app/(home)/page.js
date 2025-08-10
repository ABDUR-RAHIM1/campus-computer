// "use client"

import Image from 'next/image';
import { campusServices } from '@/LocalDatabase/campusComputer/campusItServices';
import { Hero } from '@/components/Hero';
import { FaqSection } from '@/components/Faq';
import { Contact } from '@/components/Contact';
import AutomationOverview from '@/components/Overview';
import HeroSlider from '@/components/HeroSilder';

const CampusComputerPage = async () => {

    return (
        <div>

            <main>
                {/* Hero Section */}
                {/* <Hero /> */}
                <HeroSlider />

                {/* Automation System Info Section */}
                <section className="py-16 bg-white border-t border-gray-300">
                    <div className="container mx-auto px-4">
                        <h2 className=" text-2xl md:text-3xl font-bold text-center text-blue-900 mb-6">
                            আমাদের অটোমেশন সিস্টেমের সুবিধাসমূহ
                        </h2>
                        <p className="text-center text-blue-600 mb-10 max-w-3xl mx-auto">
                            দূরবর্তী ছাত্রছাত্রীরা যাতে ঘরে বসে ভর্তি বা ফরম ফিলাপ করতে পারে — সে লক্ষ্যেই  <strong>ক্যাম্পাস কম্পিউটার</strong>  তৈরি করেছে একটি সহজ ও অটোমেটেড অনলাইন সেবা।
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-gray-800">
                            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
                                <h4 className="text-xl font-semibold mb-2">📤 ঘরে বসে তথ্য জমা</h4>
                                <p> শিক্ষার্থীরা মোবাইল দিয়ে ছবি ও তথ্য আমাদের আপ্লিকেশনের মাধ্যমে জমা দিতে পারবে, আসতে হবে না কম্পিউটার দোকানে।</p>
                            </div>
                            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
                                <h4 className="text-xl font-semibold mb-2">⏳ সময় ও খরচ সাশ্রয়</h4>
                                <p>একাধিকবার কলেজ বা কম্পিউটার দোকানে আসার দরকার নেই —  ক্যাম্পাস কম্পিউটার আপনার হয়ে সব কিছু জমা করে আপনার কাঙ্ঘিত আবেদনটি সম্পন্ন করবে।</p>
                            </div>
                            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
                                <h4 className="text-xl font-semibold mb-2">📱 মোবাইল দিয়ে পেমেন্ট</h4>
                                <p>
                                    আপনার সার্ভিসটি তে আবেদন বাটনে ক্লিক করে সেখানে দেখানো নির্দিষ্ট পরিমানে ফী - বিকাশের মাধ্যমে পেমেন্ট করার সাথে সাথে আপনার কাজটি শুরু হয়ে যাবে।
                                </p>
                            </div>
                            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
                                <h4 className="text-xl font-semibold mb-2">📁 ফাইল আপলোড সুবিধা</h4>
                                <p>ছবি, সার্টিফিকেট, NID সহ আবেদন প্রক্রিয়ায়া যে ডকুমেন্ট প্রয়োজনীয় ফাইল সহজেই আপলোড করা যাবে। সব কিছুই থাকবে সুরক্ষিত , যা শুধু আপনিই নিয়ন্ত্রণ করতে পারবেন।</p>
                            </div>
                            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
                                <h4 className="text-xl font-semibold mb-2">🧾 কাজের কনফার্মেশন রিপোর্ট</h4>
                                <p>কাজ হচ্ছে কিনা , শেষ হয়েছে কিনা সব কিছুই আপনি দেখতে পাবেন আপনার প্রোফাইল থেকে ।</p>
                            </div>
                            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
                                <h4 className="text-xl font-semibold mb-2">🧾 অর্ডার বাতিল ও পেমেন্ট ফেরত </h4>
                                <p> ভুল করে অন্য কোন সার্ভিসের জন্য পেমেন্ট করলে অর্ডারটি বাতিল করতে পারবেন , সাথে সাথে আপনার অ্যাকাউন্ট এ পেমেন্ট ফেরত পাঠানো হবে (১২ ঘন্তার মধ্যেই) ।</p>
                            </div>
                            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
                                <h4 className="text-xl font-semibold mb-2">💬 ২৪/৭ যোগাযোগ</h4>
                                <p>আপনার প্রশ্ন থাকলে WhatsApp বা মোবাইলে সহজেই যোগাযোগ করা যাবে।</p>
                            </div>
                        </div>
                    </div>
                </section>

                <AutomationOverview />

                {/* CampusIt Services Section */}
                <section id="services-list" className='py-16 bg-gradient-to-br from-blue-100 to-blue-200'>
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl md:text-4xl font-extrabold text-center text-blue-900 mb-6 leading-tight">
                            আমাদের অন্যান্য সেবাসমূহ
                        </h2>
                        <p className=" text-center text-blue-700 mb-12 max-w-4xl mx-auto">
                            ক্যাম্পাস কম্পিউটার থেকে আপনি পাবেন বহুমুখী ডিজিটাল সেবা। প্রতিটি সেবাই নির্ভুলতা ও দ্রুততার সাথে প্রদান করা হয়।
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


                <FaqSection />
                {/* Contact Section */}
                <Contact />
            </main>

        </div>
    );
};

export default CampusComputerPage;
