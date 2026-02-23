"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

export default function AdmissionField({ fields, serviceName }) {
   
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Eye className="w-4 h-4" /> View Fields
                </Button>
            </DialogTrigger>
            <DialogContent className=" w-full md:w-[70%] max-h-screen overflow-y-auto my-10">
                <DialogHeader>
                    <DialogTitle>{serviceName} - Form Structure</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 mt-4">
                    {fields.map((field, idx) => (
                        <div key={idx} className="p-3 border rounded-lg bg-slate-50 text-sm">
                            <p><strong>Label:</strong> {field.label}</p>
                            <p><strong>Type:</strong> <span className="text-blue-600">{field.type}</span></p>
                            <p><strong>Placeholder:</strong> <span className="text-slate-500 italic">"{field.placeholder || 'N/A'}"</span></p>
                            <p><strong>Required:</strong> {field.required ? "✅ Yes" : "❌ No"}</p>
                        </div>
                    ))}
                    {fields.length === 0 && <p className="text-center text-slate-400">No custom fields added.</p>}
                </div>
            </DialogContent>
        </Dialog>
    )
}