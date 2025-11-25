"use client"
import React, { useContext } from 'react';
import { Button } from '../ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { globalContext } from '@/contextApi/ContextApi';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function ServicesCard({ servicesData }) {
    const router = useRouter();
    const pathName = usePathname();
    const { setServiceData } = useContext(globalContext)
    const colors = [
        { bg: 'bg-blue-50', text: 'text-blue-700', desc: 'text-blue-600' },
        { bg: 'bg-green-50', text: 'text-green-700', desc: 'text-green-600' },
        { bg: 'bg-yellow-50', text: 'text-yellow-700', desc: 'text-yellow-600' },
        { bg: 'bg-purple-50', text: 'text-purple-700', desc: 'text-purple-600' },
        { bg: 'bg-pink-50', text: 'text-pink-700', desc: 'text-pink-600' },
        { bg: 'bg-indigo-50', text: 'text-indigo-700', desc: 'text-indigo-600' },
    ];


    const handleNavigateToOrder = (data) => {
        if (pathName.startsWith("/profile")) {
            setServiceData(data)
            router.push("/profile/create-order");
        } else { 
            router.push("/profile");
        }
    }

    return (
        <>
            {servicesData.map((service, index) => {
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

                        <div className=' my-3 flex items-center justify-between flex-wrap'>
                            <p className="text-xs text-gray-500 mt-2">
                                🎓 {service.program.toUpperCase()} | 📅 {service.session}
                            </p>

                            <div className={`py-1 px-2 ${service.type === "নিয়মিত" ? "bg-green-100 text-green-500" : " bg-red-100 text-red-500"} rounded-md  text-[12px]`}>
                                {
                                    service.type
                                }
                            </div>
                        </div>

                        <div>
                            <h2 className='my-2 font-medium text-center border p-2'>বিভাগ অনুযায়ী ফি</h2>
                            <Table>
                                <TableCaption></TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">বিভাগ</TableHead>
                                        <TableHead>ফী</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {service?.departmentFees?.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.department}</TableCell>
                                            <TableCell>{item.collegeFee}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                        </div>

                        {/* Required Documents */}
                        {service.requiredDocuments?.length > 0 && (
                            <div className=' mt-3'>
                                <p className="font-medium"> ডকুমেন্ট লাগবে :</p>
                                <ul className="mt-3 text-sm text-gray-700 list-disc list-inside">
                                    {service.requiredDocuments.map((doc, i) => (
                                        <li key={i}>📎 {doc}</li>
                                    ))}
                                </ul>
                            </div>
                        )}


                        <Button
                            onClick={() => handleNavigateToOrder(service)}
                            className=' w-full inline-block cursor-pointer my-4 bg-blue-500 text-white'>
                            আবেদন করুন
                        </Button>

                    </div>
                );
            })}
        </>


    );
}
