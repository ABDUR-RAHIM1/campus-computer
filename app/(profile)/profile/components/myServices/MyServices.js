"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ApplyButton from './ApplyButton';

const demoServices = [
  {
    _id: '1',
    title: 'Honors Admission',
    description: 'Honors ভর্তি ফরম, পেমেন্ট ও কনফার্মেশন সহ',
    program: 'honors',
    session: '2020-2021',
    fee: '3560',
    requiredDocuments: ['Registration card', 'College ID', 'Phone number'],
  },
  {
    _id: '2',
    title: 'Degree Registration',
    description: 'ডিগ্রী ১ম বর্ষ ও অন্যান্য আবেদন',
    program: 'degree',
    session: '2020-2021',
    fee: '4000',
    requiredDocuments: ['Admission card', 'SSC certificate', 'Phone number'],
  },
  {
    _id: '3',
    title: 'Intermediate Update',
    description: 'নতুন রেজিস্ট্রেশন বা তথ্য আপডেট',
    program: 'intermediate',
    session: '2020-2021',
    fee: '2500',
    requiredDocuments: ['Registration card', 'Previous mark sheet'],
  },
];

const demoProfile = {
  program: 'honors',
  session: '2020-2021',
};

const colors = [
  { bg: 'bg-blue-50', text: 'text-blue-700', desc: 'text-blue-600' },
  { bg: 'bg-green-50', text: 'text-green-700', desc: 'text-green-600' },
  { bg: 'bg-yellow-50', text: 'text-yellow-700', desc: 'text-yellow-600' },
  { bg: 'bg-purple-50', text: 'text-purple-700', desc: 'text-purple-600' },
  { bg: 'bg-pink-50', text: 'text-pink-700', desc: 'text-pink-600' },
  { bg: 'bg-indigo-50', text: 'text-indigo-700', desc: 'text-indigo-600' },
];

export default function MyServices() {
  const [matchedServices, setMatchedServices] = useState([]);
  const [hasClicked, setHasClicked] = useState(false); // ✅ নতুন state

  const handleClick = () => {
    setHasClicked(true);
    const matched = demoServices.filter(
      (service) =>
        service.program === demoProfile.program &&
        service.session === demoProfile.session
    );
    setMatchedServices(matched);
  };

  return (
    <div className="my-10">
      <div className='text-center'>
        <Button
          variant={"outline"}
          onClick={handleClick}
          className="cursor-pointer border border-blue-800 text-blue-800"
        >
          আমার সার্ভিস গুলো
        </Button>
        <p className="mt-3 text-gray-600 text-sm">
          আপনার প্রোফাইলের তথ্য অনুযায়ী নিচে মেলে এমন সার্ভিসগুলো প্রদর্শিত হবে। আপনি উপযুক্ত সার্ভিস নির্বাচন করে আবেদন করতে পারবেন।
        </p>
      </div>

      {matchedServices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {matchedServices.map((service, index) => {
            const color = colors[index % colors.length];
            return (
              <div
                key={service._id}
                className={`p-4 border rounded hover:shadow-lg transition cursor-pointer ${color.bg}`}
              >
                <h4 className={`font-semibold ${color.text}`}>📄 {service.title}</h4>
                <p className={`${color.desc} text-sm mt-1`}>{service.description}</p>
                <p className="text-xs text-gray-500 mt-2">
                  🎓 {service.program.toUpperCase()} | 📅 {service.session} | 💰 ফি: {service.fee}৳
                </p>

                {service.requiredDocuments?.length > 0 && (
                  <ul className="mt-3 text-sm text-gray-700 list-disc list-inside">
                    {service.requiredDocuments.map((doc, i) => (
                      <li key={i}>📎 {doc}</li>
                    ))}
                  </ul>
                )}

                <ApplyButton />
              </div>
            );
          })}
        </div>
      ) : (
        hasClicked && (
          <p className="mt-4 text-gray-500 text-center">
            আপনার প্রোফাইল অনুযায়ী কোনো সার্ভিস পাওয়া যায়নি।
          </p>
        )
      )}
    </div>
  );
}
