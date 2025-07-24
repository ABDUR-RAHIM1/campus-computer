"use client";

import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import InputField from "@/utilities/InputField";
import { studentAuthFormState } from "@/formStats/StudentAuthState";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getMyProfileInfo } from "@/handlers/studentProfile";
import { PostAction } from "@/actions/students/PostAction";
import { studentProfileUpdateDelete } from "@/constans";
import { globalContext } from "@/contextApi/ContextApi";
import SelectField from "@/utilities/SelectFiled";
import { getDepartmentsByProgram } from "@/LocalDatabase/departments";
import { getStatusColor } from "@/utilities/getStatusColor";



export default function EditProfile() {
    const { showToast, imgUrl, uploadResponse, uploader } = useContext(globalContext);
    const [loading, setLoading] = useState(false)
    const [submiting, setSubmiting] = useState(false)
    const [formData, setFormData] = useState(studentAuthFormState)
    const [departments, setDepartments] = useState([]);

    const { status, message } = uploadResponse;


    //  get login student profile info's
    useLayoutEffect(() => {
        const getProfile = async () => {
            try {
                setLoading(true);
                const { status, data } = await getMyProfileInfo();
                if (status === 200) {
                    setFormData((prev) => ({
                        ...prev,
                        ...data,
                    }));
                }
            } catch (error) {
                console.error("Profile fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        getProfile(); // এখানে await লাগবে না কারণ useEffect async করা যাবে না
    }, []);



    const handleChange = (e) => {
        const { type, name, value, files } = e.target;

        if (type === "file") {
            const file = files[0]
            uploader(file)
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }

    };

    // setImage Url In the form State
    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            profilePicture: imgUrl
        }))
    }, [imgUrl])




    // deparment filter using Program
    // ekhane formData.program er name ar departments.json er program nam same thakte hobe , tobei ata kaj korbe.
    useEffect(() => {
        if (formData.program) {
            const filterdDeparment = getDepartmentsByProgram(formData.program);
            setDepartments(filterdDeparment);
        }
    }, [formData.program])





    // 📌 এটাকে component এর উপরে বা ফাইলের উপরে রাখো
    const parseCommaInputToArray = (value) => {
        return value
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item !== "");
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmiting(true)
        try {
            const { password, ...updateData } = formData;


            const payload = {
                method: "PUT",
                endpoint: studentProfileUpdateDelete + formData._id,
                body: updateData
            }
            const { status, data } = await PostAction(payload)

            showToast(status, data)

        } catch (error) {
            console.log(error)
        } finally {
            setSubmiting(false)
        }

    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow my-20 border">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">📝 প্রোফাইল আপডেট করুন</h2>
            <p className="text-sm text-gray-600 my-5 border-b">
                আপনি যে তথ্যগুলো পূরণ করবেন, তার উপর ভিত্তি করে আপনি কেবলমাত্র আপনার শ্রেণি ও বিভাগের জন্য প্রযোজ্য সেবা ও ফরমগুলো দেখতে পারবেন।
                যেমন: অনার্স বা ডিগ্রী প্রোগ্রামের ফরম ফিলআপ, পেমেন্ট এবং ফলাফল সংক্রান্ত সেবা ইত্যাদি।
                সঠিক ও সম্পূর্ণ তথ্য প্রদান করলে আপনার কাজগুলো আরো দ্রুত ও নির্ভুলভাবে সম্পন্ন করা সম্ভব হবে।
            </p>


            {loading ? (
                <div className="text-center text-blue-600 font-semibold my-6">লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...</div>
            ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="👤 নাম" name="username" value={formData.username} onChange={handleChange} required />
                    <InputField label="📞 মোবাইল" name="phone" value={formData.phone} onChange={handleChange} required />
                    <InputField label="📧 ইমেইল" name="email" value={formData.email} onChange={handleChange} />

                    <InputField label="🏛️ ইনস্টিটিউটের নাম" name="instituteName" value={formData.instituteName} required onChange={handleChange} />

                    {/* <InputField label="🏛️ প্রোগ্রাম (অনার্স/ডিগ্রি/ইন্টারমেডিয়েট)" name="program" value={formData.program} required onChange={handleChange} /> */}

                    <SelectField
                        label="🏛️ প্রোগ্রাম (অনার্স/ডিগ্রি/ইন্টারমেডিয়েট)"
                        name="program"
                        value={formData.program}
                        onChange={handleChange}
                        required
                        options={[
                            { label: "অনার্স", value: "honors" },
                            { label: "ডিগ্রি", value: "degree" },
                            { label: "ইন্টারমেডিয়েট", value: "intermediate" },
                        ]}
                    />

                    <SelectField
                        label="📚 বিভাগ"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                        options={departments}
                    />

                    <SelectField
                        label="🏛️ বর্ষ"
                        name="classYear"
                        value={formData.classYear}
                        onChange={handleChange}
                        required
                        options={[
                            { label: " প্রথম বর্ষ ", value: "1" },
                            { label: " দ্বিতীয় বর্ষ", value: "2" },
                            { label: " তৃতীয় বর্ষ", value: "3" },
                            { label: " চতুর্থ বর্ষ", value: "4" },
                        ]}
                    />
                    <InputField label="📅 সেশন" name="session" value={formData.session} onChange={handleChange} />
                    <InputField label="🎟️ ক্লাস রোল" name="classRoll" value={formData.classRoll} onChange={handleChange} />

                    <InputField label="🎓 রেজিস্ট্রেশন নম্বর" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} required />
                    <InputField label="🆔 বোর্ড রোল" name="boardRoll" value={formData.boardRoll} onChange={handleChange} required />
                    <InputField label="🔐 পিন" name="pin" value={formData.pin} onChange={handleChange} />

                    {/* <InputField label="👨‍👩‍👧 অভিভাবকের নাম" name="guardianName" value={formData.guardianName} onChange={handleChange} /> */}
                    <InputField label="📱 অভিভাবকের মোবাইল" name="guardianPhone" value={formData.guardianPhone} onChange={handleChange} />
                    <InputField label="🏠 ঠিকানা" name="address" value={formData.address} onChange={handleChange} />
                    <InputField label="🎂 জন্ম তারিখ" name="birthDate" value={formData.birthDate} type="date" onChange={handleChange} />



                    <SelectField
                        label="⚧️ লিঙ্গ"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        options={[
                            { label: "পুরুষ", value: "পুরুষ" },
                            { label: "মহিলা", value: "মহিলা" },
                            { label: "অন্যান্য", value: "অন্যান্য" },
                        ]}
                    />
                    <InputField label="🩸 রক্ত গ্রুপ" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} placeholder="A+ / O+ etc." />



                    {/* 🔘 মানোন্নয়ন সেকশন */}
                    <div className="sm:col-span-2">
                        <label className="inline-flex items-center mb-2">
                            <input
                                type="checkbox"
                                name="hasImprovement"
                                checked={formData.hasImprovement || false}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        hasImprovement: e.target.checked,
                                    })
                                }
                                className="mr-2"
                            />
                            <span className="text-gray-800 font-medium">
                                📝 আপনি কি মানোন্নয়ন পরীক্ষায় অংশ নিতে চান?
                            </span>
                        </label>

                        {/* যদি checkbox এ টিক দেয়া হয়, তাহলে এই অংশ দেখাবে */}
                        {formData.hasImprovement && (
                            <div className="my-4">
                                <label htmlFor="improvementSubjects" className="font-medium text-gray-700">
                                    ✍️ যেসব বিষয়ের কোডে পুনঃপরীক্ষা দিতে চাচ্ছেন (কমা দিয়ে লিখুন):
                                </label>
                                <input
                                    type="text"
                                    name="improvementSubjects"
                                    id="improvementSubjects"
                                    placeholder="যেমন: 101, 202, 303"
                                    value={Array.isArray(formData.improvementSubjects) ? formData.improvementSubjects.join(", ") : ""}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            improvementSubjects: parseCommaInputToArray(e.target.value),
                                        })
                                    }
                                    className="w-full mt-1 border border-gray-300 rounded p-2"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    প্রতিটি সাবজেক্ট কোড কমা (,) দিয়ে আলাদা করুন।
                                </p>
                            </div>
                        )}
                    </div>






                    {/* ✅ Passport Size Photo Upload */}
                    <div className="col-span-full mb-4">
                        <Label htmlFor="profilePicture" className="font-medium mb-1 block">
                            📸 পাসপোর্ট সাইজ ছবি <span className="text-red-500">*</span>
                        </Label>
                        <p className="text-sm text-gray-500 mb-2">
                            এই ছবিটি কলেজে ব্যবহার করা হবে। তাই স্পষ্ট, পরিষ্কার এবং পাসপোর্ট সাইজ ছবি আপলোড করুন। আমরা এটি এডিট করে প্রিন্টযোগ্য ফরম্যাটে তৈরি করব।
                        </p>
                        <Input
                            type="file"
                            name="profilePicture"
                            id="profilePicture"
                            accept="image/*"
                            // required
                            onChange={handleChange}
                        />
                        <p className={getStatusColor(status)}>
                            {
                                message
                            }
                        </p>
                    </div>
                    <div className="col-span-full mt-4">
                        <Button disabled={status === 102} type="submit" className="w-full">
                            {
                                submiting ? "আপডেট করা হচ্ছে..." :
                                    "✅ প্রোফাইল আপডেট করুন"
                            }
                        </Button>
                    </div>
                </form>
            )
            }


        </div>
    );
}
