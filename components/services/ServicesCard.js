
import React from 'react';
import ApplyButton from './ApplyButton';

export default async function ServicesCard({ data }) {

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
                            🎓 {service.program.toUpperCase()} | 📅 {service.session}
                        </p>

                        {/* Show fee list by department */}
                        {service.departmentFees?.length > 0 && (
                            <div className="mt-2 text-sm text-gray-800">
                                <p className="font-medium mb-1">💰 বিভাগ অনুযায়ী ফি:</p>
                                <ul className="list-disc list-inside space-y-1">
                                    {service.departmentFees.map((item, i) => (
                                        <li key={i}>
                                            🏛️ {item.department} — <span className="font-semibold">{item.collegeFee} ৳</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Required Documents */}
                        {service.requiredDocuments?.length > 0 && (
                            <div className=' mt-3'>
                                  <p className="font-medium">💰 ডকুমেন্ট লাগবে :</p> 
                                <ul className="mt-3 text-sm text-gray-700 list-disc list-inside">
                                    {service.requiredDocuments.map((doc, i) => (
                                        <li key={i}>📎 {doc}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <ApplyButton serviceData={service} />
                    </div>
                );
            })}
        </div>

    );
}
