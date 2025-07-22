import DataNotFound from '@/components/DataNotFound';
import { getAllServices } from '@/handlers/services';
import React from 'react';
import ApplyButton from './myServices/ApplyButton';

export default async function Services() {
    const { status, data } = await getAllServices();

    if (status !== 200 || !data?.length) {
        return <DataNotFound text="Services not available for you" />;
    }

    const colors = [
        { bg: 'bg-blue-50', text: 'text-blue-700', desc: 'text-blue-600' },
        { bg: 'bg-green-50', text: 'text-green-700', desc: 'text-green-600' },
        { bg: 'bg-yellow-50', text: 'text-yellow-700', desc: 'text-yellow-600' },
        { bg: 'bg-purple-50', text: 'text-purple-700', desc: 'text-purple-600' },
        { bg: 'bg-pink-50', text: 'text-pink-700', desc: 'text-pink-600' },
        { bg: 'bg-indigo-50', text: 'text-indigo-700', desc: 'text-indigo-600' },
    ];


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {data.map((service, index) => {
                const color = colors[index % colors.length];

                return (
                    <div
                        key={service._id}
                        className={`block ${color.bg} p-4 border rounded hover:shadow-lg transition`}
                    >
                        <h4 className={`font-semibold ${color.text}`}>📄 {service.title}</h4>
                        <p className={`${color.desc} text-sm mt-1`}>
                            {service.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                            🎓 {service.program.toUpperCase()} | 📅 {service.session} | 💰 ফি: {service.fee}৳
                        </p>

                        {/* Required Documents */}
                        {service.requiredDocuments?.length > 0 && (
                            <ul className="mt-3 text-sm text-gray-700 list-disc list-inside">
                                {service.requiredDocuments.map((doc, i) => (
                                    <li key={i}>📎 {doc}</li>
                                ))}
                            </ul>
                        )}
                        <ApplyButton serviceId={service._id} />
                    </div>
                );
            })}
        </div>
    );
}
