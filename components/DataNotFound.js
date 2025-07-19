import React from 'react';

export default function DataNotFound({ text }) {
    return (
        <div className="flex items-center justify-center min-h-[150px] bg-gray-100 rounded-md border border-gray-300 px-6 py-4 mx-4 my-6 text-center">
            <p className="text-gray-500 text-lg font-medium">
                {text || "কোনো ডেটা পাওয়া যায়নি।"}
            </p>
        </div>
    );
}
