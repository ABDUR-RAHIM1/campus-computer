"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import InputField from "@/utilities/InputField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PostAction } from "@/actions/students/PostAction";
import { globalContext } from "@/contextApi/ContextApi";
import { getDepartmentsByProgram } from "@/LocalDatabase/departments";
import { getStatusColor } from "@/utilities/getStatusColor";
import { studentProfileCreate } from "@/constans";
import { studentProfileFormState } from "@/formStats/StudentProfileState";
import { Checkbox } from "@/components/ui/checkbox";
import { sessionList } from "@/LocalDatabase/seasion";
import { getAllSubAdmins } from "@/handlers/subAdmins";
import SelectField from "@/utilities/SelectField";


export default function AddProfile() {
    const { showToast, imgUrl, uploadResponse, uploader, studentInfo } = useContext(globalContext);
    const [submiting, setSubmiting] = useState(false)
    const { status, message } = uploadResponse;

    const [institutes, setInstitutes] = useState([]);
    const [departments, setDepartments] = useState([]);


    const [formData, setFormData] = useState({
        ...studentProfileFormState,
        studentName: "",
    });

    useEffect(() => {
        if (!studentProfileFormState.isOtherStudent && studentInfo?.username) {
            setFormData(prev => ({
                ...prev,
                studentName: studentInfo.username
            }));
        }
    }, [studentInfo, studentProfileFormState.isOtherStudent]);


    const handleChange = (e) => {
        const { type, name, value, files } = e.target;
        
        if (type === "file") {
            const file = files
            uploader(file)
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };


    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            profilePicture: imgUrl[0]
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


    // getAll Institue/ subAdmins
    useEffect(() => {
        const getData = async () => {
            const { status, data } = await getAllSubAdmins();
            if (status === 200) {

                const formatedData = data.map((ins, i) => {
                    return {
                        name: ins.username,
                        value: ins._id
                    }
                })

                setInstitutes(formatedData)
            }
        };

        getData()
    }, [])


    // 📌 এটাকে component এর উপরে বা ফাইলের উপরে রাখো
    const parseCommaInputToArray = (value) => {
        return value
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item !== "");
    };


    const sessionOptions = sessionList.map((s) => ({
        label: s,
        value: s,
    }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmiting(true)
        try {

            const payload = {
                method: "POST",
                endpoint: studentProfileCreate,
                body: formData
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
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">📝 প্রোফাইল তৈরি করুন</h2>
            <p className="text-sm text-gray-600 my-5 border-b">
                আপনি যে তথ্যগুলো পূরণ করবেন, তার উপর ভিত্তি করে আপনি কেবলমাত্র আপনার শ্রেণি ও বিভাগের জন্য প্রযোজ্য সেবা ও ফরমগুলো দেখতে পারবেন।
                যেমন: অনার্স বা ডিগ্রী প্রোগ্রামের ফরম ফিলআপ, পেমেন্ট এবং ফলাফল সংক্রান্ত সেবা ইত্যাদি।
                সঠিক ও সম্পূর্ণ তথ্য প্রদান করলে আপনার কাজগুলো আরো দ্রুত ও নির্ভুলভাবে সম্পন্ন করা সম্ভব হবে।
            </p>


            <div className=" my-8">
                <Label className="hover:bg-accent/50 flex items-start gap-3 border-blue-300 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                    <Checkbox
                        onCheckedChange={(checked) => setFormData((prev) => ({
                            ...prev,
                            isOtherStudent: !!checked
                        }))}
                        checked={formData.isOtherStudent}
                        id="toggle-2"
                        defaultChecked
                        className="border-blue-500 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                    />
                    <div className="grid gap-1.5 font-normal">
                        <p className="text-sm leading-none font-medium">
                            অন্য শিক্ষার্থীর জন্য প্রোফাইল তৈরি করবেন ?
                        </p>
                        <p className="text-muted-foreground text-sm">
                            যদি আপনার নিজের জন্য হয় তাহলে টিক দেওয়ার দরকার নেই।
                        </p>
                    </div>
                </Label>

            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">


                {
                    formData.isOtherStudent ?
                        < InputField label="📧অন্য শিক্ষার্থীর নাম" name="studentName" value={formData.studentName} onChange={handleChange} />
                        :
                        < InputField disabled={true} label="📧আপনার নাম" name="studentName" value={formData.studentName} onChange={handleChange} />

                }


                <SelectField
                    label="🏛️ শিক্ষা প্রতিষ্ঠান"
                    name="institute"
                    value={formData.institute}
                    onChange={handleChange}
                    required
                    options={institutes}
                />


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
                <SelectField
                    label="📚 সেশন"
                    name="session"
                    value={formData.session}
                    onChange={handleChange}
                    required
                    options={sessionOptions}
                />

                <InputField label="🎟️ ক্লাস রোল" name="classRoll" value={formData.classRoll} onChange={handleChange} />

                <InputField
                    label="🎓স্টুডেন্ট আইডি (Registration/Applicant Id)"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    placeholder={"Applicant হলে Roll-pin:-5018098-245642"}
                    required
                />

                <InputField
                    label={"ঐচ্ছিক বিষয়"}
                    name={"electiveSubject"}
                    value={formData.electiveSubject}
                    placeholder={"ঐচ্ছিক/Elective বিষয় কোড লিখুন"}
                    onChange={handleChange}
                />
                <InputField
                    type="number"
                    label={"নাম্বার"}
                    name={"contactNumber"}
                    value={formData.contactNumber}
                    placeholder={"যোগাযোগ নাম্বার"}
                    onChange={handleChange}
                />

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
                            submiting ? `তৈরি করা হচ্ছে...` :
                                `✅ প্রোফাইল তৈরি করুন`
                        }
                    </Button>
                </div>
            </form>

        </div>
    );
}
