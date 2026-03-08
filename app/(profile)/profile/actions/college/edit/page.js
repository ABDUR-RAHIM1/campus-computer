"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import InputField from "@/utilities/InputField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PostAction } from "@/actions/students/PostAction";
import { globalContext } from "@/contextApi/ContextApi";
import { getStatusColor } from "@/utilities/getStatusColor";
import { studentProfileUpdateDelete } from "@/constans";
import { Checkbox } from "@/components/ui/checkbox";
import { sessionList } from "@/LocalDatabase/seasion";


import Spinner from "@/utilities/Spinner";
import { getAllSubAdmins } from "@/handlers/subAdmins";
import { getDepartmentsByProgram } from "@/LocalDatabase/departments";
import SelectField from "@/utilities/SelectField";
import { ParseCommaInputToArray } from "@/utilities/ParseCommaInputToArray";
import Image from "next/image";

export default function EditProfile() {
    const {
        showToast,
        imgUrl,
        uploadResponse,
        uploadImage,
        editData,
        studentInfo,
    } = useContext(globalContext);
    const [institutes, setInstitutes] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const { status, message } = uploadResponse;
    const isEditable = editData && Object.keys(editData)?.length > 0;
    const [departments, setDepartments] = useState([]);

    const [formData, setFormData] = useState({
        studentName: "",
        registrationNumber: "",
        classYear: "",
        department: "",
        session: "",
        contactNumber: "",
        classRoll: "",
        institute: "",
        program: "",
        electiveSubject: "",
        hasImprovement: false,
        improvementSubjects: [],
        profilePicture: "",
        isOtherStudent: false

    });



    useEffect(() => {
        if (!formData.isOtherStudent && studentInfo?.username) {
            setFormData((prev) => ({
                ...prev,
                studentName: studentInfo.username,
            }));
        }
    }, [studentInfo, formData.isOtherStudent]);



    useEffect(() => {
        if (isEditable && editData) {
            setFormData({
                ...editData,
                institute: editData.institute?._id || "",
            });
        }
    }, [editData, isEditable]);


    const handleChange = async (e) => {
        const { type, name, value, files } = e.target;

        if (type === "file") {
            const urls = await uploadImage(files);
            if (urls && urls.length > 0) {
                setFormData((prev) => ({
                    ...prev,
                    [name]: urls[0],
                }));
            }

        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    useEffect(() => {
        if (imgUrl && imgUrl.length > 0) {
            setFormData(prev => ({
                ...prev,
                profilePicture: imgUrl[0],
            }));
        }
    }, [imgUrl]);

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
                        label: ins.username,
                        value: ins._id
                    }
                })

                setInstitutes(formatedData)
            }
        };

        getData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {

            const formattedSubjects = formData.hasImprovement && ParseCommaInputToArray(formData.improvementSubjects);

            const payload = {
                method: "PUT",
                endpoint: studentProfileUpdateDelete + formData?._id,
                body: {
                    ...formData,
                    improvementSubjects: formattedSubjects
                },
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



                <SelectField
                    label="🏛️ শিক্ষা প্রতিষ্ঠান"
                    name="institute"
                    value={formData.institute}
                    onChange={handleChange}
                    required
                    options={institutes}
                />

                {/* Program */}
                <div className="space-y-1">
                    <Label>🏛️ প্রোগ্রাম (অনার্স/ডিগ্রি/ইন্টারমেডিয়েট)</Label>

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
                <SelectField
                    label="📚 বিভাগ"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    options={departments}
                />

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
                {/* Profile Photo Upload */}
                <div className="col-span-full mb-4 flex flex-col md:flex-row items-start justify-between gap-6 p-4 border rounded-xl bg-gray-50/50">

                    {/* Left Side: Input and Labels */}
                    <div className="flex-1 w-full">
                        <Label
                            htmlFor="profilePicture"
                            className="font-bold mb-2 flex items-center gap-2 text-gray-700"
                        >
                            📸 পাসপোর্ট সাইজ ছবি <span className="text-red-500">*</span>
                        </Label>
                        <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                            এই ছবিটি কলেজে ব্যবহার করা হবে। তাই স্পষ্ট, পরিষ্কার এবং
                            পাসপোর্ট সাইজ ছবি আপলোড করুন।
                        </p>
                        <Input
                            type="file"
                            name="profilePicture"
                            id="profilePicture"
                            accept="image/*"
                            onChange={handleChange}
                            className="bg-white"
                        />
                        {message && (
                            <p className={`text-xs mt-2 font-medium ${getStatusColor(status)}`}>
                                {message}
                            </p>
                        )}
                    </div>

                    {/* Right Side: Preview Container (ছবি আপলোড হলে এখানে দেখাবে) */}
                    <div className="flex-shrink-0">
                        <div className="w-24 h-32 md:w-28 md:h-36 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-white overflow-hidden shadow-inner">
                            {formData.profilePicture ? (
                                <img
                                    src={formData.profilePicture}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-[10px] text-gray-400 text-center px-2">ছবি নেই</span>
                            )}
                        </div>
                    </div>
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
