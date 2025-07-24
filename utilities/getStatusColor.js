

export const getStatusColor = (status) => {
    if (!status) return "text-gray-500"; // default color

    if (status >= 100 && status < 200) return "text-blue-500"; // Info
    if (status >= 200 && status < 300) return "text-green-600"; // Success
    if (status >= 300 && status < 400) return "text-yellow-500"; // Redirect (optional)
    if (status >= 400 && status < 500) return "text-red-500"; // Client Error
    if (status >= 500) return "text-red-700"; // Server Error

    return "text-gray-500"; // fallback
};
