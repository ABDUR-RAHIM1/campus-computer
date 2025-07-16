"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentLogin() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '', // For register
    });
    const router = useRouter();

    // Form input change handler
    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Fake login/register handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
        // Login success (assume)
        alert('Login successful!');
        
        // Set demo token to localStorage
        localStorage.setItem("token", "demo-token");

        router.push('/profile');
    } else {
        // Register success (assume)
        alert('Registration successful! Please login now.');
        setIsLogin(true);
        setFormData({ email: '', password: '', name: '' });
    }
};

    return (
        <div className=" min-h-screen ">

            <form onSubmit={handleSubmit} className='max-w-md mx-auto mt-20 p-6 border rounded shadow-lg bg-white'>

                <h2 className="text-2xl font-bold mb-6 text-center">
                    {isLogin ? 'স্টুডেন্ট লগইন' : 'নতুন স্টুডেন্ট রেজিস্টার'}
                </h2>

                {!isLogin && (
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">নাম</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required={!isLogin ? true : false}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="আপনার নাম লিখুন"
                        />
                    </div>
                )}

                <div className="mb-4">
                    <label className="block mb-1 font-semibold">ইমেইল</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                        placeholder="আপনার ইমেইল লিখুন"
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-1 font-semibold">পাসওয়ার্ড</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                        placeholder="পাসওয়ার্ড দিন"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
                >
                    {isLogin ? 'লগইন করুন' : 'রেজিস্টার করুন'}
                </button>
            </form>

            <p className="mt-4 text-center text-gray-600">
                {isLogin ? 'নতুন ব্যবহারকারী?' : 'আগেই রেজিস্টার করেছেন?'}{' '}
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-600 hover:underline"
                >
                    {isLogin ? 'রেজিস্টার করুন' : 'লগইন করুন'}
                </button>
            </p>
        </div>
    );
}
