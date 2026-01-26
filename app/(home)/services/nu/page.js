"use client";

import React from "react";
import { nuServices } from "@/LocalDatabase/nuServices";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, ArrowRightCircle } from "lucide-react";

export default function NationalUniversityServices() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="container mx-auto px-4 py-12">
        {/* ---------- Page Header ---------- */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mb-12 relative overflow-hidden group">
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              জাতীয় বিশ্ববিদ্যালয় <span className="text-blue-600">(NU)</span> অনলাইন সেবা
            </h1>
            <p className="text-slate-500 mt-3 max-w-2xl font-medium leading-relaxed">
              ভর্তি, ফরম পূরণ, ফলাফল ও অন্যান্য সকল অনলাইন সেবা এখন আপনার হাতের মুঠোয়। 
              নিচের ক্যাটাগরি থেকে আপনার প্রয়োজনীয় সেবাটি বেছে নিন।
            </p>
          </div>
          {/* Background Decorative Element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
        </div>

        {/* ---------- Category Sections ---------- */}
        <div className="space-y-16">
          {nuServices.map((section, index) => (
            <div key={index} className="space-y-6">
              {/* Category Title with Line */}
              <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 text-2xl">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                  {section.category}
                </h2>
                <div className="flex-grow h-[2px] bg-gradient-to-r from-slate-200 to-transparent"></div>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items.map((service, i) => (
                  <Card
                    key={i}
                    className="group relative bg-white hover:bg-blue-600 transition-all duration-300 border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 rounded-2xl overflow-hidden"
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-white transition-colors duration-300">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-slate-500 group-hover:text-blue-100 transition-colors duration-300 min-h-[40px]">
                        {service.desc}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <a
                        href={service.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 group-hover:bg-white/20 text-blue-700 group-hover:text-white rounded-xl font-bold text-sm transition-all"
                      >
                        সেবা নিন
                        <ExternalLink size={16} />
                      </a>
                    </CardContent>

                    {/* Decorative Arrow Icon for Hover */}
                    <div className="absolute bottom-4 right-4 text-white opacity-0 group-hover:opacity-20 transition-opacity">
                      <ArrowRightCircle size={60} />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}