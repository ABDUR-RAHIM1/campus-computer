"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";


export default function ImagePreviewModal({ open, setOpen, imageUrl }) {
    return (
        <Dialog
            open={open} onOpenChange={(val) => {
                setOpen(val)
            }}
        >
            <DialogContent
                className="sm:w-full  max-h-[70vh] overflow-y-scroll"
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader className={" mb-10 sticky"}>
                    <DialogTitle >📎 ডকুমেন্ট প্রিভিউ </DialogTitle>

                </DialogHeader>

                <Image
                    src={imageUrl}
                    width={500}
                    height={500}
                    alt="Camnpus Computer preview deocmuent"
                    className=" w-full h-auto"
                />

            </DialogContent>
        </Dialog>
    )
}
