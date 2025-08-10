
import React from "react";
import { Loader } from "lucide-react";

export default function Spinner() {
    return (
        <div className="flex justify-center items-center">
            <Loader className="h-6 w-6 animate-spin" />
        </div>
    );
}
