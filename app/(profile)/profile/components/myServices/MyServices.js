"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ApplyButton from './ApplyButton';
import { getMyServices } from '@/handlers/services';



const colors = [
  { bg: 'bg-blue-50', text: 'text-blue-700', desc: 'text-blue-600' },
  { bg: 'bg-green-50', text: 'text-green-700', desc: 'text-green-600' },
  { bg: 'bg-yellow-50', text: 'text-yellow-700', desc: 'text-yellow-600' },
  { bg: 'bg-purple-50', text: 'text-purple-700', desc: 'text-purple-600' },
  { bg: 'bg-pink-50', text: 'text-pink-700', desc: 'text-pink-600' },
  { bg: 'bg-indigo-50', text: 'text-indigo-700', desc: 'text-indigo-600' },
];

export default function MyServices() {
  const [isLoading, setIsLoading] = useState(false);
  const [matchedServices, setMatchedServices] = useState([]);
  const [hasClicked, setHasClicked] = useState(false); // ✅ নতুন state

  const handleClick = async () => {
    setHasClicked(true);
    setIsLoading(true);

    try {
      const { status, data } = await getMyServices();
      if (status === 200) {
        setMatchedServices(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
          আপনার প্রোফাইলের তথ্য অনুযায়ী  মেলে নিচে এমন সার্ভিসগুলো প্রদর্শিত হবে। আপনি উপযুক্ত সার্ভিস নির্বাচন করে আবেদন করতে পারবেন।
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

                <ApplyButton serviceId={service._id} />
              </div>
            );
          })}
        </div>
      ) : (
        isLoading ?
          <p className="mt-4 text-red-500 text-center">
            আপনার প্রোফাইলের সাথে মিলানো হচ্ছে, একটু অপেক্ষা করুন।
          </p>
          : hasClicked && (
            <p className="mt-4 text-gray-500 text-center">
              আপনার প্রোফাইল অনুযায়ী কোনো সার্ভিস পাওয়া যায়নি।
            </p>
          )
      )}
    </div>
  );
}
