"use client";
import { PostAction } from "@/actions/students/PostAction";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { jobProfilePostGet } from "@/constans";
import { globalContext } from "@/contextApi/ContextApi";
import { getStatusColor } from "@/utilities/getStatusColor";
import InputField from "@/utilities/InputField";
import Spinner from "@/utilities/Spinner";
import React, { useContext, useEffect, useState } from "react";

const JobApplicationForm = () => {
    const { showToast, imgUrl, uploadResponse, uploader } = useContext(globalContext);
    const { status, message } = uploadResponse;

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        isOtherPerson: false,
        nameEn: "",
        nameBn: "",
        fatherNameEn: "",
        fatherNameBn: "",
        motherNameEn: "",
        motherNameBn: "",
        dob: "",
        religion: "",
        gender: "",
        nidNumer: "",
        birthNumber: "",
        passportId: "",
        matarialStatus: "",
        mobileNumber: "",
        otherMobileNumber: "",
        email: "",
        presentAddress: "",
        permanentAddress: "",
        quota: "",
        cvLink: "",
        photo: "",
        signature: "",
        educations: [],
        documents: [],
    });


    const [education, setEducation] = useState({
        eduType: "",
        categorie: "",
        instituteName: "",
        passingYear: "",
        board: "",
        roll: "",
        reg: "",
        gpa: "",
    })
    const [fileName, setFileName] = useState("")

    //  isOthersPerson Change
    const handlePersonChange = (e) => {
        const value = e.target.value;

        setFormData((prev) => ({
            ...prev,
            isOtherPerson: value === "yes" ? true : false
        }))

    }

    useEffect(() => {
        if (imgUrl && fileName) {
            setFormData((prev) => {
                // যদি fileName "documents" হয়, তাহলে array তে push করো
                if (fileName === "documents") {
                    return {
                        ...prev,
                        documents: [...prev.documents, ...imgUrl] // আগের সব যোগ করে নতুন লিঙ্ক add
                    };
                } else {
                    // না হলে normal field আপডেট করো (photo বা signature)
                    return {
                        ...prev,
                        [fileName]: imgUrl[0]
                    };
                }
            });
        }
    }, [imgUrl, fileName]);



    //  add multiple Education in formState
    const handleAddNewEducation = () => {
        setFormData((prev) => ({
            ...prev,
            educations: [...prev.educations, education]
        }));
    };


    const handleChange = (e) => {
        const { type, name, value, files } = e.target;

        if (type === "file") {
            const file = files
            uploader(file);
            setFileName(name)
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };


    //  educations Change
    const handleEducationChange = (e) => {
        const { name, value } = e.target;
        setEducation({ ...education, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const payload = {
                method: "POST",
                endpoint: jobProfilePostGet,
                body: formData
            }
            const { status, data } = await PostAction(payload);
            showToast(status, data);


        } catch (error) {
            console.log("failed to create job Profile", error)
        } finally {
            setLoading(false)
        }
    }


    return (
        <form
            onSubmit={handleSubmit}
            className="my-10 max-w-5xl mx-auto p-6 bg-white shadow rounded-lg">
            <div className=" text-center my-6">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    📝 জব অ্যাপ্লিকেশন ফর্ম
                </h2>
                <p className=" text-red-500 text-sm font-semibold text-center animation-duration-initial ">
                    * দেওয়া প্রতিটি ফিল্ড পুরন করতে হবে।
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="-mt-1">
                    <Label htmlFor={"otherPerson"} className={"mb-1"}>কার জন্য <span className=" ml text-red-500">*</span> </Label>
                    <select
                        onChange={handlePersonChange}
                        name="otherPerson" id="otherPerson" className="p-2 w-full rounded-md border">
                        <option value="no">বাছাই করুন</option>
                        <option value="no">নিজের জন্য</option>
                        <option value="yes">অন্যের জন্য</option>
                    </select>
                </div>
                <InputField
                    label="আবেদনকারীর নাম (ইংরেজি)"
                    name="nameEn"
                    value={formData.applicantNameEn}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="আবেদনকারীর নাম (বাংলায়)"
                    name="nameBn"
                    value={formData.applicantNameBn}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="পিতার নাম (ইংরেজি)"
                    name="fatherNameBn"
                    value={formData.fatherNameBn}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="পিতার নাম (বাংলায়)"
                    name="fatherNameEn"
                    value={formData.fatherNameEn}
                    onChange={handleChange}
                    required
                />

                <InputField
                    label="মাতার নাম (ইংরেজি)"
                    name="motherNameEn"
                    value={formData.motherNameEn}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="মাতার নাম (বাংলায়)"
                    name="motherNameBn"
                    value={formData.motherNameBn}
                    onChange={handleChange}
                    required
                />

                <InputField
                    label="🎂 জন্ম তারিখ"
                    type="date"
                    name="dob"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                />

                <InputField
                    label="☪ ধর্ম"
                    name="religion"
                    value={formData.religion}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="⚧ লিঙ্গ"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="📜 জন্ম নিবন্ধন নাম্বার"
                    name="birthNumber"
                    value={formData.birthRegNo}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="🆔 এন.আই.ডি নাম্বার"
                    name="nidNumber"
                    value={formData.nationalId}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="🛂 পাসপোর্ট নামাব্র"
                    name="passportId"
                    value={formData.passportId}
                    onChange={handleChange}
                />
                <InputField
                    label="💍 বৈবাহিক অবস্থা"
                    name="matarialStatus"
                    value={formData.matarialStatus}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="📞 মোবাইল নাম্বার"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="📞 অতিরিক্ত নাম্বার "
                    name="otherMobileNumber"
                    value={formData.confirmMobileNumber}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="📧 ইমেইল"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="📧 বর্তমান ঠিকানা"
                    name="presentAddress"
                    value={formData.presentAddress}
                    onChange={handleChange}
                    placeholder={"গ্রাম, পোস্ট, উপজেলা, জেলা, পোস্ট কোড"}
                    required
                />
                <InputField
                    label="📧 স্থায়ী ঠিকানা"
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={handleChange}
                    placeholder={"গ্রাম, পোস্ট, উপজেলা, জেলা, পোস্ট কোড"}
                    required
                />
                <InputField
                    label="📧 কোন কোঠা আছে? "
                    name="quota"
                    value={formData.quota}
                    onChange={handleChange}
                    required
                />


                <div className="sm:col-span-2 border rounded-sm p-2">
                    <h2 className=" font-medium my-3 text-center">শিক্ষা তথ্য</h2>
                    <div className="grid grid-cols-2 gap-2">
                        <InputField
                            label="📧পরিক্ষার ধরন"
                            placeholder={"পরিক্ষার ধরন"}
                            name="eduType"
                            value={education.eduType}
                            onChange={handleEducationChange}
                            required
                        />
                        <InputField
                            label="📧 বিভাগ"
                            placeholder={"বিভাগ"}
                            name="categorie"
                            value={education.categorie}
                            onChange={handleEducationChange}
                            required
                        />
                        <InputField
                            label="📧 প্রতিষ্ঠানের নাম"
                            placeholder={"প্রতিষ্ঠানের নাম"}
                            name="instituteName"
                            value={education.instituteName}
                            onChange={handleEducationChange}
                            required
                        />
                        <InputField
                            label="📧 পাশের বছর"
                            placeholder={"পাশের বছর"}
                            name="passingYear"
                            value={education.passingYear}
                            onChange={handleEducationChange}
                            required
                        />
                        <InputField
                            label="📧 বোর্ড"
                            placeholder={"বোর্ড"}
                            name="board"
                            value={education.board}
                            onChange={handleEducationChange}
                            required
                        />
                        <InputField
                            label="📧 রোল নাম্বার"
                            placeholder={"রোল নাম্বার"}
                            name="roll"
                            value={education.roll}
                            onChange={handleEducationChange}
                            required
                        />
                        <InputField
                            label="📧 রেজিস্ট্রেসন নাম্বার"
                            placeholder={"রেজিস্ট্রেসন নাম্বার"}
                            name="reg"
                            value={education.reg}
                            onChange={handleEducationChange}
                            required
                        />
                        <InputField
                            label="📧 জিপিএ"
                            placeholder={"Gpa, Cgpa, Division"}
                            name="gpa"
                            value={education.gpa}
                            onChange={handleEducationChange}
                            required
                        />
                        <div className="sm:col-span-2">
                            <Button
                                type={"button"}
                                onClick={handleAddNewEducation}
                                variant={"outline"} className={" rounded-full px-6 bg-gray-200 cursor-pointer hover:bg-blue-500 hover:text-white  transition-all"}>
                                যুক্ত করুন
                            </Button>
                        </div>
                    </div>

                </div>
                <div className="sm:col-span-2 space-y-1.5">

                    <div className="my-2">
                        <Label className={"mb-2"}>অতিরিক্ত তথ্য</Label>
                        <Textarea
                            placeholder={"অতিরিক্ত তথ্য এখানে লিখুন: Height , Chest etc"}
                        />
                    </div>
                    <br />

                    <div className="mt-2">
                        <InputField
                            name={"cvLink"}
                            label="সিভি লিংক"
                            placeholder={"গুগল ড্রাইভ লিংক"}
                            onChange={handleChange}
                        />
                    </div>

                </div>


                <div className="sm:col-span-2 grid grid-cols-2 gap-2">
                    <div className="">
                        <InputField
                            type={"file"}
                            label="📧 ফটো"
                            name="photo"
                            onChange={handleChange}
                            required
                        />
                        <p className={`${getStatusColor(status)} text-[12px]`}>
                            {
                                formData.photo && message
                            }
                        </p>
                    </div>

                    <div>
                        <InputField
                            type={"file"}
                            label="📧 সিগনেচার"
                            name="signature"
                            onChange={handleChange}
                            required
                        />
                        <p className={`${getStatusColor(status)} text-[12px]`}>
                            {
                                formData.signature && message
                            }
                        </p>
                    </div>

                </div>
                <div className="sm:col-span-2">
                    <InputField
                        type={"file"}
                        multiple
                        label="📧 ডকুমেন্টস"
                        name="documents"
                        onChange={handleChange}
                    />
                    <p className={`${getStatusColor(status)} text-[12px]`}>
                        {
                            formData.documents.length > 0 && message
                        }
                    </p>
                </div>
                <div className="sm:col-span-2">
                    <button
                        type="submit"
                        className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
                    >
                        {
                            loading ? <Spinner /> : " ✅ প্রোফাইল তৈরি করুন"
                        }
                    </button>
                </div>
            </div>
        </form>
    );
};

export default JobApplicationForm;
