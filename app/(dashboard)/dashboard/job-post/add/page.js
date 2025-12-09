"use client";

import { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PostActionAdmin } from "@/actions/admins/PostAction";
import { jobPostCreateGetAll, jobPostPutDelete } from "@/constans";
import { globalContext } from "@/contextApi/ContextApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import { EyeClosed, EyeIcon } from "lucide-react";
import InputField from "@/utilities/InputField";
import SelectField from "@/utilities/SelectField";
import { jobCetegories } from "@/LocalDatabase/jobCategories";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { GetSingleJobPostById } from "@/handlers/jobPost";

export default function JobPostForm() {
    const { showToast, editData } = useContext(globalContext);
    const [togglePreview, setTogglePreview] = useState(false)
    const [feeFormData, setFeeFormData] = useState({
        postName: "",
        payPaymentFee: 0,
        charge: 0,
        totalFee: 0,
    });

    const [formData, setFormData] = useState({
        category: "",
        title: "",
        totalVacancy: "",
        startDate: "",
        endDate: "",
        postWithFee: [],
        noticeLink: "",
        totalVacancy: "",
        description: ""
    });

    const isEditable = editData && Object.keys(editData)?.length > 0;
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");


    /** =============== set editable Data in the previous State========= */
    useEffect(() => {
        if (isEditable && editData) {

            // STEP 1 → First show all existing editable data (without description)
            setFormData(prev => ({
                ...prev,
                category: editData.category ?? "",
                title: editData.title ?? "",
                totalVacancy: editData.totalVacancy ?? "",
                startDate: editData.startDate ?? "",
                endDate: editData.endDate ?? "",
                noticeLink: editData.noticeLink ?? "",
                postWithFee: editData.postWithFee ?? [],
                description: prev.description
            }));

            // STEP 2 → Then fetch description only
            const getJobDesc = async () => {
                const { status, data } = await GetSingleJobPostById(editData._id);

                if (status === 200 && data?.description) {
                    setFormData(prev => ({
                        ...prev,
                        category: data.category ?? "",
                        title: data.title ?? "",
                        totalVacancy: data.totalVacancy ?? "",
                        startDate: data.startDate ?? "",
                        endDate: data.endDate ?? "",
                        noticeLink: data.noticeLink ?? "",
                        postWithFee: data.postWithFee ?? [],
                        description: data.description
                    }));
                }
            };

            getJobDesc();
        }
    }, [editData]);

    /** =============== set editable Data in the previous State End======*/



    // onChange handler for feeFormData
    const handleFeeChange = (e) => {
        const { name, value } = e.target;

        setFeeFormData((prev) => {
            const updated = {
                ...prev,
                [name]: value
            };

            // Auto calculate total price
            const pay = Number(updated.payPaymentFee) || 0;
            const ch = Number(updated.charge) || 0;

            updated.totalFee = pay + ch;

            return updated;
        });
    };



    //  add multiple fee in the main state
    const handleAddMultipleFee = () => {
        setFormData((prev) => ({
            ...prev,
            postWithFee: [...prev.postWithFee, feeFormData]
        }))
    }


    //  remove post with fee 
    const handleRemoveFeeItem = (feeIndex) => {

        const removedPostWithFee = formData.postWithFee.filter((_, index) => index !== feeIndex)
        setFormData((prev) => ({
            ...prev,
            postWithFee: removedPostWithFee
        }))
    }


    //  onChange handler
    const handleChange = (e) => {
        const { name, value } = e.target;

        const updatedData = {
            ...formData,
            [name]: value,
        };

        setFormData(updatedData);
    };


    /**================= submit and update hander below ====================== */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const payload = {
                method: isEditable ? "PUT" : "POST",
                endpoint: isEditable ? jobPostPutDelete + editData?._id : jobPostCreateGetAll,
                body: formData,
            };

            const { status, data } = await PostActionAdmin(payload);

            showToast(status, data);

        } catch (err) {
            setMessage(`❌ ${err.message}`);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="max-w-4xl mx-auto my-10 p-6 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">জব পোস্ট {isEditable ? "আপডেট" : "তৈরি"} করুন</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                <div className=" grid grid-cols-2 gap-2">

                    <SelectField
                        label={"Category"}
                        name={"category"}
                        value={formData.category}
                        onChange={handleChange}
                        options={jobCetegories}
                    />
                    <InputField
                        label={"Title"}
                        name={"title"}
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>
                <div className=" grid grid-cols-2 gap-2">
                    <InputField
                        type="date"
                        label={"Start Date"}
                        name={"startDate"}
                        value={formData.startDate}
                        onChange={handleChange}
                    />
                    <InputField
                        type="date"
                        label={"End Date"}
                        name={"endDate"}
                        value={formData.endDate}
                        onChange={handleChange}
                    />
                </div>

                <div className=" grid grid-cols-3 gap-2">

                    <InputField
                        type="text"
                        label={"Post Name"}
                        name="postName"
                        value={feeFormData.postName}
                        onChange={handleFeeChange}
                    />
                    <InputField
                        type="number"
                        label={"Pay Payment Price"}
                        name="payPaymentFee"
                        value={feeFormData.payPaymentFee}
                        onChange={handleFeeChange}
                    />
                    <InputField
                        type="number"
                        label={"Charge"}
                        name="charge"
                        value={feeFormData.charge}
                        onChange={handleFeeChange}
                    />

                    <div className=" w-full p-3 flex items-center justify-between rounded-md bg-blue-100 col-span-3 font-medium">
                        <p> Total Fee:  {feeFormData.totalFee} TK</p>
                        <Button type={"button"}
                            onClick={handleAddMultipleFee}
                            className="w-[70%] h-full p-2 bg-blue-700 hover:bg-blue-600 text-white">
                            Add
                        </Button>
                    </div>

                    <div className=" col-span-3 my-3">
                        <div className=" flex items-center justify-between">
                            <h2 className=" font-medium capitalize">Fee Preview</h2>
                            <Button className={" bg-blue-500"}>
                                <EyeIcon />
                            </Button>
                        </div>

                        <div className="my-5">
                            {formData.postWithFee && formData.postWithFee.length > 0 ? (
                                <div className="rounded-md border">
                                    <Table>
                                        <TableCaption>Post-wise fee details</TableCaption>

                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[200px]">পদের নাম</TableHead>
                                                <TableHead>আবেদন ফি (BDT)</TableHead>
                                                <TableHead>চার্জ (BDT)</TableHead>
                                                <TableHead className="text-right">মোট (BDT)</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody>
                                            {formData.postWithFee.map((feeItem, index) => (
                                                <TableRow key={index}>
                                                    <TableCell
                                                        onClick={() => handleRemoveFeeItem(index)}
                                                        className="font-medium text-red-500 underline transition-all cursor-pointer">{feeItem.postName}</TableCell>
                                                    <TableCell>{feeItem.payPaymentFee}</TableCell>
                                                    <TableCell>{feeItem.charge}</TableCell>
                                                    <TableCell className="text-right font-semibold">
                                                        {Number(feeItem.payPaymentFee) + Number(feeItem.charge)}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            ) : (
                                <p className="text-gray-500">Post With Fee Is Empty</p>
                            )}
                        </div>

                    </div>

                </div>



                <div className="grid grid-cols-2 gap-3">
                    <InputField
                        type="text"
                        label={"Total Vacancy"}
                        name="totalVacancy"
                        value={formData.totalVacancy}
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        label={"Notice Link (Main Website Link)"}
                        name="noticeLink"
                        value={formData.noticeLink}
                        onChange={handleChange}
                    />
                </div>

                {/* Description Editor */}
                <div className=" my-3">
                    <label className="block mb-1 font-medium">Description</label>
                    <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={6}
                        required
                    />
                </div>

                {/* Markdown Live Preview */}
                <div className="p-3 border rounded-md bg-gray-50 ">
                    <div className=" flex items-center justify-between">
                        <h3 className="font-semibold mb-2 text-sm">Preview</h3>
                        <Button type={"button"}
                            onClick={() => setTogglePreview(!togglePreview)}
                            className={"bg-blue-500 text-white"}>
                            {
                                togglePreview ? <EyeIcon /> : <EyeClosed />
                            }
                        </Button>
                    </div>

                    <div className={`${togglePreview ? "scale-y-0 h-0" : " scale-y-100"} origin-top transition-all  markdown prose`}>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkMath]}
                            rehypePlugins={[rehypeKatex, rehypeRaw]}
                        >
                            {formData.description || "*Nothing to preview*"}
                        </ReactMarkdown>
                    </div>

                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading
                        ? (isEditable ? "আপডেট হচ্ছে..." : "পোস্ট করা হচ্ছে...")
                        : (isEditable ? "আপডেট করুন" : "পোস্ট করুন")}
                </Button>

            </form>

            {message && (
                <p className="mt-3 text-center text-red-600">{message}</p>
            )}
        </div>
    );
}
