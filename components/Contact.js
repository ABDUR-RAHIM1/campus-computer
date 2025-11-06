"use client"
import { globalContext } from '@/contextApi/ContextApi';
import Spinner from '@/utilities/Spinner';
import React, { useContext, useState } from 'react';

export function Contact() {

  const { showToast } = useContext(globalContext);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitMessage = (e) => {
    setIsLoading(true)
    e.preventDefault()
    setTimeout(() => {
      showToast(200, "আপনার মেসেজটি গ্রহন করা হয়েছে। ধন্যবাদ")
      setIsLoading(false)
    }, 2000);
  }


  return (
    <section id="contact" className="bg-white py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          যোগাযোগ করুন
        </h2>
        <div className="flex flex-col md:flex-row md:space-x-12">
          {/* Contact Form */}
          <form
            className="bg-gray-100 p-8 rounded-lg shadow-md flex-1 mb-10 md:mb-0"
            onSubmit={handleSubmitMessage}
          >
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block mb-2 font-semibold text-gray-700"
              >
                নাম
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="আপনার নাম লিখুন"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 font-semibold text-gray-700"
              >
                ইমেইল
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="আপনার ইমেইল লিখুন"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block mb-2 font-semibold text-gray-700"
              >
                বার্তা
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                placeholder="আপনার বার্তা লিখুন"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              {
                isLoading ? <Spinner /> : "পাঠান"
              }
            </button>
          </form>

          {/* Contact Info */}
          <div className="flex-1 bg-gray-50 p-8 rounded-lg shadow-md text-gray-700 flex flex-col justify-center">
            <p className="mb-6 text-lg">
              📞 ফোন: <br />
              <a href="tel:01321040273" className="text-blue-600 hover:underline">
                01321040273
              </a>{' '}
              /{' '}
              <a href="tel:01611530939" className="text-blue-600 hover:underline">
                01611530939
              </a>
            </p>
            <div className="mb-6 text-lg">
              📍 ঠিকানা: <br />
              <p>১। কলেজ বাজার, লালমনিরহাট</p>
              <p>  ২। স্বনির্ভর কম্পিউটার ট্রেনিং সেন্টার, আদিতমারী</p>
            </div>
            <p className="mb-6 text-lg">
              📧 ইমেইল: <br />
              <a
                href="mailto:lgccampuscomputer@gmail.com"
                target='_blank'
                className="text-blue-600 hover:underline"
              >
                lgccampuscomputer@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
