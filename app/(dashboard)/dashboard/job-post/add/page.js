"use client";

import { useContext, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PostActionAdmin } from "@/actions/admins/PostAction";
import { jobPostCreateGetAll } from "@/constans";
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

export default function JobPostForm() {
    const { showToast } = useContext(globalContext);
    const [togglePreview, setTogglePreview] = useState(false)
    const [formData, setFormData] = useState({
        category: "",
        title: "",
        startDate: "",
        endDate: "",
        description: "",
        payPaymentFee: 0,
        charge: 0,
        totalPrice: 0,
        noticeLink: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        const updatedData = {
            ...formData,
            [name]: value,
        };

        // Auto price calculation
        if (name === "payPaymentFee" || name === "charge") {
            const pay =
                name === "payPaymentFee"
                    ? Number(value)
                    : Number(formData.payPaymentFee);

            const ch =
                name === "charge"
                    ? Number(value)
                    : Number(formData.charge);

            updatedData.totalPrice = pay + ch;
        }

        setFormData(updatedData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const payload = {
                method: "POST",
                endpoint: jobPostCreateGetAll,
                body: formData,
            };

            const { status, data } = await PostActionAdmin(payload);

            showToast(status, data);

            if (status === 200) {
                setFormData({
                    title: "",
                    description: "",
                    payPaymentFee: 0,
                    charge: 0,
                    totalPrice: 0,
                    noticeLink: "",
                });
            }
        } catch (err) {
            setMessage(`❌ ${err.message}`);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="max-w-4xl mx-auto my-10 p-6 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">জব পোস্ট তৈরি করুন</h2>

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
                        type="number"
                        label={"Pay Payment Price"}
                        name="payPaymentFee"
                        value={formData.payPaymentFee}
                        onChange={handleChange}
                    />
                    <InputField
                        type="number"
                        label={"Charge"}
                        name="charge"
                        value={formData.charge}
                        onChange={handleChange}
                    />

                    <InputField
                        type="number"
                        label={"Total Price"}
                        name="totalPrice"
                        value={formData.totalPrice}
                        onChange={handleChange}
                    />

                </div>



                <InputField
                    type="text"
                    label={"Notice Link (Main Website Link)"}
                    name="noticeLink"
                    value={formData.noticeLink}
                    onChange={handleChange}
                />

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

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "পোস্ট করা হচ্ছে..." : "পোস্ট করুন"}
                </Button>
            </form>

            {message && (
                <p className="mt-3 text-center text-red-600">{message}</p>
            )}
        </div>
    );
}
