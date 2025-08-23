"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import lgc1 from "@/public/images/sliders/lgc.png"
import lgc2 from "@/public/images/sliders/lgc2.jpg"
import lgc3 from "@/public/images/sliders/lgc3.png"

const images = [
    lgc1, lgc2, lgc3
];

export default function HeroSlider() {
    return (
        <section className="w-full bg-gray-100 py-12 px-4 md:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left side: Slider */}
                <Carousel
                    opts={{ loop: true }}
                    plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
                    className="w-full max-w-xl mx-auto"
                >
                    <CarouselContent>
                        {images.map((src, index) => (
                            <CarouselItem key={index}>
                                <Card className={"p-0"}>
                                    <CardContent className="flex items-center justify-center p-2">
                                        <Image
                                            src={src}
                                            alt={`Slide ${index + 1}`}
                                            width={600}
                                            height={400}
                                            className="rounded-lg w-full h-64"
                                        />
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                {/* Right side: Information */}
                <div>
                    <h2 className=" text-2xl md:text-3xl font-bold mb-4 text-blue-800 text-center md:text-left">
                        কেন আমাদের আপ্লিকেশন ব্যবহার করবেন?
                    </h2>
                    <ul className="list-disc ml-6 space-y-2 text-gray-700 text-sm md:text-lg">
                        <li>ঘরে বসে ভর্তি, ফর্ম ফিলাপ ও পেমেন্টের সুবিধা</li>
                        <li>দ্রুত তথ্য যাচাই ও সাবমিশনের নিশ্চয়তা</li>
                        <li>নিরাপদ ও ব্যবহার-বান্ধব ডিজাইন</li>
                        <li>শিক্ষার্থী ও অভিভাবকদের জন্য সহায়ক একটি প্ল্যাটফর্ম</li>
                        <li>শুধু শিক্ষা নয়, যেকোনো পেশার মানুষের কাজ সহজ করতে সহায়তা করে</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
