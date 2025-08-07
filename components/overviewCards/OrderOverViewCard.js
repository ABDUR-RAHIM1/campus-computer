import { PanelsTopLeft, CheckCircle, XCircle } from "lucide-react";
import React from "react";

export default function OrderOverViewCard({ total = 0, success = 0, cancel = 0 }) {
    const boxStyle = "flex flex-col items-start gap-2 rounded-md shadow-md p-4";

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full  py-6 gap-4">
            <div className={`${boxStyle} bg-blue-100 border border-blue-300`}>
                <PanelsTopLeft className="text-blue-600" />
                <h2 className="text-lg font-semibold text-blue-800">মোট অর্ডার: {total}</h2>
            </div>

            <div className={`${boxStyle} bg-green-100 border border-green-300`}>
                <CheckCircle className="text-green-600" />
                <h2 className="text-lg font-semibold text-green-800">সফল অর্ডার: {success}</h2>
            </div>

            <div className={`${boxStyle} bg-red-100 border border-red-300`}>
                <XCircle className="text-red-600" />
                <h2 className="text-lg font-semibold text-red-800">বাতিল অর্ডার: {cancel}</h2>
            </div>
        </div>
    );
}
