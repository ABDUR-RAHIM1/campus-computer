import { PanelsTopLeft, CheckCircle, XCircle, Clock } from "lucide-react";
import React from "react";

export default function OrderOverViewCard({
    total = 0,
    active = 0,
    success = 0,
    cancel = 0
}) {
    const boxStyle = "flex flex-col items-start gap-2 rounded-md shadow-md p-4 hover:shadow-2xl  transition-all";
  

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full py-6 gap-4">
            {/* মোট অর্ডার */}
            <div className={`${boxStyle} bg-blue-100 border border-blue-300`}>
                <PanelsTopLeft className="text-blue-600" />
                <h2 className="text-lg font-semibold text-blue-800">মোট অর্ডার: {total}</h2>
            </div>

            {/* সক্রিয় অর্ডার */}
            <div className={`${boxStyle} bg-yellow-100 border border-yellow-300`}>
                <Clock className="text-yellow-600" />
                <h2 className="text-lg font-semibold text-yellow-800">সক্রিয় অর্ডার: {active}</h2>
            </div>

            {/* সফল অর্ডার */}
            <div className={`${boxStyle} bg-green-100 border border-green-300`}>
                <CheckCircle className="text-green-600" />
                <h2 className="text-lg font-semibold text-green-800">সফল অর্ডার: {success}</h2>
            </div>

            {/* বাতিল অর্ডার */}
            <div className={`${boxStyle} bg-red-100 border border-red-300`}>
                <XCircle className="text-red-600" />
                <h2 className="text-lg font-semibold text-red-800">বাতিল অর্ডার: {cancel}</h2>
            </div>
        </div>
    );
}
