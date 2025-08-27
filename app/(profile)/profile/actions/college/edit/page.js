"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import InputField from "@/utilities/InputField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PostAction } from "@/actions/students/PostAction";
import { globalContext } from "@/contextApi/ContextApi";
import { getStatusColor } from "@/utilities/getStatusColor";
import { studentProfileCreate, studentProfileUpdateDelete } from "@/constans";
import { studentProfileFormState } from "@/formStats/StudentProfileState";
import { Checkbox } from "@/components/ui/checkbox";
import { sessionList } from "@/LocalDatabase/seasion";


import { formatDateToInput } from "@/utilities/formatDateToInput";
import Spinner from "@/utilities/Spinner";

export default function EditProfile() {
    const {
        showToast,
        imgUrl,
        uploadResponse,
        uploader,
        editData,
        studentInfo,
    } = useContext(globalContext);

    const [submitting, setSubmitting] = useState(false);
    const { status, message } = uploadResponse;
    const isEditable = editData && Object.keys(editData)?.length > 0;

    const [formData, setFormData] = useState({
        ...studentProfileFormState,
        studentName: "",
    });

    useEffect(() => {
        if (!studentProfileFormState.isOtherStudent && studentInfo?.username) {
            setFormData((prev) => ({
                ...prev,
                studentName: studentInfo.username,
            }));
        }
    }, [studentInfo, studentProfileFormState.isOtherStudent]);

    useEffect(() => {
        if (isEditable && editData) {
            setFormData((prev) => ({
                ...prev,
                ...editData,
                birthDate: formatDateToInput(editData.birthDate), // এখানে ফরম্যাট করে বসাও
            }));
        }
    }, [editData]);

    const handleChange = (e) => {
        const { type, name, value, files } = e.target;

        if (type === "file") {
            uploader(files);
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
                ...(name === "improvementSubjects" && {
                    improvementSubjects: value
                        .split(",")
                        .map((subject) => subject.trim())
                    // .filter((subject) => subject !== ""),
                }),
            }));
        }
    };


    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            profilePicture: imgUrl[0],
        }));
    }, [imgUrl]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {

            const payload = {
                method: "PUT",
                endpoint: studentProfileUpdateDelete + formData?._id,
                body: formData,
            };
            const { status, data } = await PostAction(payload);
            showToast(status, data);
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow my-20 border">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                📝 প্রোফাইল আপডেট করুন
            </h2>

            <div className="my-8">
                <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50">
                    <Checkbox
                        onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                                ...prev,
                                isOtherStudent: !!checked,
                            }))
                        }
                        checked={formData.isOtherStudent}
                        id="toggle-2"
                    />
                    <div className="grid gap-1.5 font-normal">
                        <p className="text-sm leading-none font-medium">
                            অন্য শিক্ষার্থীর জন্য প্রোফাইল বানাবেন ?
                        </p>
                        <p className="text-muted-foreground text-sm">
                            যদি আপনার নিজের জন্য হয় তাহলে টিক দেওয়ার দরকার নেই।
                        </p>
                    </div>
                </Label>
            </div>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
                <InputField
                    label={
                        formData.isOtherStudent
                            ? "📧অন্য শিক্ষার্থীর নাম"
                            : "📧আপনার নাম"
                    }
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    disabled={!formData.isOtherStudent}
                />

                <InputField
                    label="📧 ইমেইল"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <InputField
                    label="🏛️ ইনস্টিটিউটের নাম"
                    name="instituteName"
                    value={formData.instituteName}
                    required
                    onChange={handleChange}
                />

                {/* Program */}
                <div className="space-y-1">
                    <Label>🏛️ প্রোগ্রাম</Label>

                    <select
                        value={formData.program}
                        onChange={handleChange}
                        name="program"
                        id="program"
                        className=" w-full py-[5px] px-3 rounded-sm border outline-0 focus:shadow-md"
                    >
                        <option value="honors">অনার্স</option>
                        <option value="degree">ডিগ্রি</option>
                        <option value="intermediate">ইন্টারমেডিয়েট</option>
                    </select>
                </div>

                {/* Class Year */}
                <div className="space-y-1">
                    <Label>🏛️ বর্ষ</Label>
                    <select
                        value={formData.classYear}
                        onChange={handleChange}
                        name="gender"
                        id="gender"
                        className=" w-full py-[5px] px-3 rounded-sm border outline-0 focus:shadow-md"
                    >
                        <option value="প্রথম বর্ষ">প্রথম বর্ষ</option>
                        <option value="দ্বিতীয় বর্ষ">দ্বিতীয় বর্ষ</option>
                        <option value="তৃতীয় বর্ষ">তৃতীয় বর্ষ</option>
                        <option value="চতুর্থ বর্ষ">চতুর্থ বর্ষ</option>
                    </select>
                </div>

                {/* Session */}
                <div className="space-y-1">
                    <Label>📚 সেশন</Label>

                    <select
                        value={formData.session}
                        onChange={handleChange}
                        name="session"
                        id="session"
                        className=" w-full py-[5px] px-3 rounded-sm border outline-0 focus:shadow-md"
                    >
                        {sessionList.map((session) => (
                            <option key={session} value={session}>
                                {session}
                            </option>
                        ))}
                    </select>
                </div>

                <InputField
                    label="🎟️ ক্লাস রোল"
                    name="classRoll"
                    value={formData.classRoll}
                    onChange={handleChange}
                />
                <InputField
                    label="🎓 রেজিস্ট্রেশন নম্বর"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="🆔 বোর্ড রোল"
                    name="boardRoll"
                    value={formData.boardRoll}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="🔐 পিন"
                    name="pin"
                    value={formData.pin}
                    onChange={handleChange}
                />
                <InputField
                    label="📱 অভিভাবকের মোবাইল"
                    name="guardianPhone"
                    value={formData.guardianPhone}
                    onChange={handleChange}
                />
                <InputField
                    label="🏠 ঠিকানা"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />
                <InputField
                    label="🎂 জন্ম তারিখ"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleChange}
                />

                {/* Gender */}
                <div className="space-y-1">
                    <Label>⚧️ লিঙ্গ</Label>
                    <select
                        value={formData.gender}
                        onChange={handleChange}
                        name="gender"
                        id="gender"
                        className=" w-full py-[5px] px-3 rounded-sm border outline-0 focus:shadow-md"
                    >
                        <option value="পুরুষ">পুরুষ</option>
                        <option value="মহিলা">মহিলা</option>
                        <option value="অন্যান্য">অন্যান্য</option>
                    </select>
                </div>

                <InputField
                    label="🩸 রক্ত গ্রুপ"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    placeholder="A+ / O+ etc."
                />

                {/* মানোন্নয়ন */}
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

                    {formData.hasImprovement && (
                        <div className="my-4">
                            <label
                                htmlFor="improvementSubjects"
                                className="font-medium text-gray-700"
                            >
                                ✍️ যেসব বিষয়ের কোডে পুনঃপরীক্ষা দিতে চাচ্ছেন (কমা দিয়ে লিখুন):
                            </label>
                            <input
                                type="text"
                                name="improvementSubjects"
                                id="improvementSubjects"
                                placeholder="যেমন: 101, 202, 303"
                                value={formData.improvementSubjects}
                                onChange={handleChange}
                                className="w-full mt-1 border border-gray-300 rounded p-2"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                প্রতিটি সাবজেক্ট কোড কমা (,) দিয়ে আলাদা করুন।
                            </p>
                        </div>
                    )}
                </div>

                {/* Profile Photo Upload */}
                <div className="col-span-full mb-4">
                    <Label
                        htmlFor="profilePicture"
                        className="font-medium mb-1 block"
                    >
                        📸 পাসপোর্ট সাইজ ছবি <span className="text-red-500">*</span>
                    </Label>
                    <p className="text-sm text-gray-500 mb-2">
                        এই ছবিটি কলেজে ব্যবহার করা হবে। তাই স্পষ্ট, পরিষ্কার এবং
                        পাসপোর্ট সাইজ ছবি আপলোড করুন।
                    </p>
                    <Input
                        type="file"
                        name="profilePicture"
                        id="profilePicture"
                        accept="image/*"
                        onChange={handleChange}
                    />
                    <p className={getStatusColor(status)}>{message}</p>
                </div>

                <div className="col-span-full mt-4">
                    <Button disabled={status === 102 || submitting} type="submit" className="w-full">
                        {submitting ? <Spinner /> : `✅ প্রোফাইল আপডেট করুন`}
                    </Button>
                </div>
            </form>
        </div>
    );
}
