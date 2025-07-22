 
import React from "react";
import { Loader } from "lucide-react";

export default function LoadingSpinner({ text = "লোড হচ্ছে..." }) {
    return (
        <div className="flex flex-col items-center justify-center py-10 text-gray-600">
            <Loader className="animate-spin h-8 w-8 text-blue-600 mb-2" />
            <p className="text-sm">{text}</p>
        </div>
    );
}
