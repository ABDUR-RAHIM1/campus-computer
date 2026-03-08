"use client"
import { PostAction } from "@/actions/students/PostAction";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { globalContext } from "@/contextApi/ContextApi";
import { useContext, useEffect, useState } from "react";
import { getStatusColor } from "./getStatusColor";
import { studentProfileUpdateDelete } from "@/constans";
import Spinner from "./Spinner";

export function FileUploaderModal({ showModal, setShowModal, profileId }) {
    const { uploadResponse, uploader, imgUrl, showToast } = useContext(globalContext);
    const [isLoading, setIsLoading] = useState(false)
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        documents: []
    })

    const handleFileChange = (e) => {
        const { files } = e.target;
        const selectedFiles = Array.from(files);

        setFiles(selectedFiles);
        uploader(selectedFiles); // Multiple file upload
    };

    useEffect(() => {
        if (imgUrl?.length > 0) {
            setFormData((prev) => ({
                ...prev,
                documents: imgUrl,
            }));
        }
    }, [imgUrl]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.documents.length === 0) {
            alert("কমপক্ষে একটি ডকুমেন্ট সফলভাবে আপলোড করুন");
            return;
        }

        setIsLoading(true)
        try {
            const payload = {
                method: "PUT",
                endpoint: studentProfileUpdateDelete + profileId,
                body: formData,
            };

            const { status, data } = await PostAction(payload);

            showToast(status, data);

            if (status === 200) {
                setShowModal(false);
                setFiles([]);
                setFormData({ documents: [] });
            }

        } catch (error) {
            console.error("Update error:", error);
            showToast(500, { message: "ডকুমেন্ট সংরক্ষণে সমস্যা হয়েছে।" });
        } finally {
            setIsLoading(false)
        }
    };


    return (
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent
                className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>📎 প্রয়োজনীয় ডকুমেন্ট আপলোড</DialogTitle>
                    <DialogDescription>
                        আপনি একাধিক ডকুমেন্ট (ছবি বা PDF) একসাথে আপলোড করতে পারেন। যেমন:
                        রেজিস্ট্রেশন কার্ড, এডমিট কার্ড, মার্কশিট ইত্যাদি।
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <Label htmlFor="documents" className="font-medium text-gray-700">
                            📁 ডকুমেন্ট ফাইল নির্বাচন করুন
                        </Label>
                        <Input
                            id="documents"
                            type="file"
                            multiple
                            accept="image/*,.pdf"
                            onChange={handleFileChange}
                        />
                        <p className={`${getStatusColor(uploadResponse.status)} text-sm`}>
                            {
                                uploadResponse.message
                            }
                        </p>
                        {files.length > 0 && (
                            <ul className="text-sm text-gray-600 mt-2 list-disc ml-4">
                                {files.map((file, idx) => (
                                    <li key={idx}>{file.name}</li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <DialogFooter className="sm:justify-start">
                        <Button disabled={uploadResponse.status === 102} type="submit" className="text-sm bg-blue-600 text-white">
                            {
                                isLoading ? <Spinner/> : "📤 সংরক্ষণ করুন"
                            } 
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
