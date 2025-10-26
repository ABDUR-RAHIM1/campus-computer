"use client";
import { PostAction } from "@/actions/students/PostAction";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { jobProfilePostGet } from "@/constans";
import { globalContext } from "@/contextApi/ContextApi";
import { getStatusColor } from "@/utilities/getStatusColor";
import InputField from "@/utilities/InputField";
import SelectField from "@/utilities/SelectField";
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
        extra: "",
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

        // সব value চেক করা হচ্ছে
        for (let key in education) {
            if (!education[key]) {
                showToast(400, "অনুগ্রহ করে সব তথ্য পূরণ করুন");
                return;
            }
        }
        setFormData((prev) => ({
            ...prev,
            educations: [...prev.educations, education]
        }));
        showToast(200, "সফলভাবে যোগ করা হয়েছে");
        setEducation({
            eduType: "",
            categorie: "",
            instituteName: "",
            passingYear: "",
            board: "",
            roll: "",
            reg: "",
            gpa: "",
        })
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

    const otherPersonOptions = [
        { name: "অন্যের জন্য", value: "yes" },
        { name: "নিজের জন্য", value: "no" },
    ]
    const religoionOptions = [
        { name: "ইসলাম", value: "ইসলাম" },
        { name: "হিন্দু", value: "হিন্দু" },
        { name: "খ্রিস্টান", value: "খ্রিস্টান" },
        { name: "অন্যান্য", value: "অন্যান্য" },
    ]

    const genderOptions = [
        { name: "পুরুষ", value: "পুরুষ" },
        { name: "মহিলা", value: "মহিলা" },
        { name: "অন্যান্য", value: "অন্যান্য" },
    ];

    const educationBoardOptions = [
        { name: "ঢাকা শিক্ষা বোর্ড", value: "ঢাকা" },
        { name: "চট্টগ্রাম শিক্ষা বোর্ড", value: "চট্টগ্রাম" },
        { name: "রাজশাহী শিক্ষা বোর্ড", value: "রাজশাহী" },
        { name: "কুমিল্লা শিক্ষা বোর্ড", value: "কুমিল্লা" },
        { name: "যশোর শিক্ষা বোর্ড", value: "যশোর" },
        { name: "সিলেট শিক্ষা বোর্ড", value: "সিলেট" },
        { name: "বরিশাল শিক্ষা বোর্ড", value: "বরিশাল" },
        { name: "দিনাজপুর শিক্ষা বোর্ড", value: "দিনাজপুর" },
        { name: "ময়মনসিংহ শিক্ষা বোর্ড", value: "ময়মনসিংহ" },
        { name: "মাদ্রাসা শিক্ষা বোর্ড", value: "মাদ্রাসা" },
        { name: "কারিগরি শিক্ষা বোর্ড", value: "কারিগরি" },
    ];

    const isEducation = formData.educations?.length > 0;
    const isPhoto = Boolean(formData.photo);
    const isSignature = Boolean(formData.signature);

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

                <SelectField
                    name={"otherPerson"}
                    label={"কার জন্য"}
                    onChange={handlePersonChange}
                    options={otherPersonOptions}
                    value={formData.isOtherPerson ? "yes" : "no"}
                    required
                />
                <InputField
                    label="আবেদনকারীর নাম (ইংরেজি)"
                    name="nameEn"
                    value={formData.nameEn}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="আবেদনকারীর নাম (বাংলায়)"
                    name="nameBn"
                    value={formData.nameBn}
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
                    value={formData.dob}
                    onChange={handleChange}
                    required
                />

                <SelectField
                    name={"religion"}
                    label={"☪ ধর্ম"}
                    onChange={handleChange}
                    options={religoionOptions}
                    value={formData.religion}
                    required
                />
                <SelectField
                    name={"gender"}
                    label={"⚧ লিঙ্গ"}
                    onChange={handleChange}
                    options={genderOptions}
                    value={formData.gender}
                    required
                />

                <InputField
                    label="📜 জন্ম নিবন্ধন নাম্বার"
                    name="birthNumber"
                    value={formData.birthNumber}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="🆔 এন.আই.ডি নাম্বার"
                    name="nidNumber"
                    value={formData.nidNumber}
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
                    value={formData.otherMobileNumber}
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
                    placeholder={"কোন কোঠা থাকলে এখানে লিখুন"}
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
                            required={!isEducation}
                        />
                        <InputField
                            label="📧 বিভাগ"
                            placeholder={"বিভাগ"}
                            name="categorie"
                            value={education.categorie}
                            onChange={handleEducationChange}
                            required={!isEducation}
                        />
                        <InputField
                            label="📧 প্রতিষ্ঠানের নাম"
                            placeholder={"প্রতিষ্ঠানের নাম"}
                            name="instituteName"
                            value={education.instituteName}
                            onChange={handleEducationChange}
                            required={!isEducation}
                        />
                        <InputField
                            label="📧 পাশের বছর"
                            placeholder={"পাশের বছর"}
                            name="passingYear"
                            value={education.passingYear}
                            onChange={handleEducationChange}
                            required={!isEducation}
                        />

                        <SelectField
                            name={"board"}
                            label={"📧 বোর্ড"}
                            onChange={handleEducationChange}
                            options={educationBoardOptions}
                            value={formData.board}
                            required={!isEducation}
                        />
                        <InputField
                            label="📧 রোল নাম্বার"
                            placeholder={"রোল নাম্বার"}
                            name="roll"
                            value={education.roll}
                            onChange={handleEducationChange}
                            required={!isEducation}
                        />
                        <InputField
                            label="📧 রেজিস্ট্রেসন নাম্বার"
                            placeholder={"রেজিস্ট্রেসন নাম্বার"}
                            name="reg"
                            value={education.reg}
                            onChange={handleEducationChange}
                            required={!isEducation}
                        />
                        <InputField
                            label="📧 জিপিএ"
                            placeholder={"Gpa, Cgpa, Division"}
                            name="gpa"
                            value={education.gpa}
                            onChange={handleEducationChange}
                            required={!isEducation}
                        />

                        <div className="sm:col-span-2">
                            <Button
                                type={"button"}
                                onClick={handleAddNewEducation}
                                variant={"outline"} className={" rounded-full px-6 hover:bg-gray-200 hover:text-blue-500 cursor-pointer bg-blue-500 text-white  transition-all"}>
                                যুক্ত করুন
                            </Button>
                        </div>
                    </div>

                    {/* academic Informtion Table */}
                    {
                        isEducation &&
                        <div className="my-5">
                            <table className="w-full border border-gray-00 text-sm text-left rounded-lg overflow-hidden shadow-sm">
                                <thead className="bg-gray-100 text-gray-700 uppercase text-[12px]">
                                    <tr>
                                        <th className="px-4 py-2">Exam Name</th>
                                        <th className="px-4 py-2">Division/Subject</th>
                                        <th className="px-4 py-2">Institute Name</th>
                                        <th className="px-4 py-2">Passing Year</th>
                                        <th className="px-4 py-2">Board/University</th>
                                        <th className="px-4 py-2">Roll</th>
                                        <th className="px-4 py-2">Reg</th>
                                        <th className="px-4 py-2">GPA/CGPA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formData.educations?.map((e, i) => (
                                        <tr
                                            key={i}
                                            className={`border-b hover:bg-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"
                                                }`}
                                        >
                                            <td className="px-4 py-2 font-medium text-gray-800">{e.eduType}</td>
                                            <td className="px-4 py-2">{e.categorie}</td>
                                            <td className="px-4 py-2">{e.instituteName}</td>
                                            <td className="px-4 py-2">{e.passingYear}</td>
                                            <td className="px-4 py-2">{e.board}</td>
                                            <td className="px-4 py-2">{e.roll}</td>
                                            <td className="px-4 py-2">{e.reg}</td>
                                            <td className="px-4 py-2">{e.gpa}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    }

                </div>
                <div className="sm:col-span-2 space-y-1.5">

                    <div className="my-2">
                        <Label className={"mb-2"}>অতিরিক্ত তথ্য</Label>
                        <Textarea
                            value={formData.extra}
                            onChange={handleChange}
                            placeholder={"অতিরিক্ত তথ্য এখানে লিখুন: Height , Chest etc"}
                        />
                    </div>
                    <br />

                    <div className="mt-2">
                        <InputField
                            name={"cvLink"}
                            label="সিভি লিংক"
                            value={formData.cvLink}
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
