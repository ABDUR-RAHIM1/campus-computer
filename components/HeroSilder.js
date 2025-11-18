"use client";

import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import lgc1 from "@/public/images/sliders/lgc.png";
import lgc2 from "@/public/images/sliders/lgc2.jpg";
import lgc3 from "@/public/images/sliders/lgc3.png";
import { Sparkles, CheckCircle2, Rocket, ShieldCheck, Heart } from "lucide-react";

const images = [lgc1, lgc2, lgc3];

const messages = [
  {
    icon: <Sparkles className="w-6 h-6 text-pink-500" />,
    text: "ঘরে বসে ভর্তি, ফর্ম ফিলাপ ও পেমেন্টের সুবিধা ✨",
    color: "text-pink-600",
  },
  {
    icon: <CheckCircle2 className="w-6 h-6 text-green-500" />,
    text: "দ্রুত তথ্য যাচাই ও সাবমিশনের নিশ্চয়তা ✅",
    color: "text-green-700",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
    text: "নিরাপদ ও ব্যবহার-বান্ধব ডিজাইন 🔐",
    color: "text-blue-700",
  },
  {
    icon: <Rocket className="w-6 h-6 text-purple-500" />,
    text: "অটোমেশন সিস্টেমে কাজ হয় দ্রুত ও নির্ভুল 🚀",
    color: "text-purple-700",
  },
  {
    icon: <Heart className="w-6 h-6 text-red-500" />,
    text: "শিক্ষার্থী ও অভিভাবকদের জন্য সহায়ক একটি প্ল্যাটফর্ম ❤️",
    color: "text-red-700",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-blue-50 py-12 px-4 md:px-12 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left side: Carousel */}
        <Carousel
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
          className="w-full max-w-xl mx-auto"
        >
          <CarouselContent>
            {images.map((src, i) => (
              <CarouselItem key={i}>
                <Card className="p-0 border-0 shadow-md">
                  <CardContent className="flex items-center justify-center p-2">
                    <Image
                      src={src}
                      alt={`Slide ${i + 1}`}
                      width={600}
                      height={400}
                      className="rounded-lg w-full h-64 "
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Right side: Heading + Tagline + Rotating Text */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800">
            কলেজ সার্ভিস সেন্টার
          </h2>
          <p className="underline mt-2 text-gray-700 mb-6">
            ভর্তি, ফর্ম, পেমেন্ট সব কিছু এক জায়গায়
          </p>

          <div className="relative h-16 overflow-hidden">
            <div
              key={index}
              className={`absolute inset-0 flex items-center justify-center md:justify-start gap-3 text-lg font-medium ${messages[index].color} animate-fadeIn`}
            >
              {messages[index].icon}
              <span>{messages[index].text}</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm md:text-base mt-3 max-w-md mx-auto md:mx-0">
            ক্যাম্পাস কম্পিউটার আপনাকে দিচ্ছে কলেজ ও ভর্তি সম্পর্কিত সব কাজ এক প্ল্যাটফর্মে সম্পন্ন করার সুবিধা।
          </p>
        </div>
      </div>

      {/* Tailwind custom animation */}
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease-in-out;
        }
      `}</style>
    </section>
  );
}
