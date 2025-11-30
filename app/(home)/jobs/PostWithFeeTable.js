'use client'
import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import SelectField from '@/utilities/SelectField'

const selectOptions = [
    {
        label: "আমাদের মাধ্যমে",
        value: "true"
    },
    {
        label: "ডিফল্ট",
        value: "false"
    },
]

export default function PostWithFeeTable({ feeData }) {

    const [applyWithUs, setApplyWithUs] = useState(true);

    const handleChange = (e) => {

        const { value } = e.target

        const finalValue = value === "true"
        setApplyWithUs(finalValue);

    };


    return (
        <div className="rounded-md border overflow-x-auto">
            <div className=' my-4 p-5 bg-blue-50 flex items-center justify-center md:justify-between flex-wrap gap-3 md:gap-0'>
                <h2 className=' font-medium text-2xl md:text-lg'>ফী সমূহ</h2>
                <div className=' flex flex-col gap-2 items-center justify-center  '>
                    <h2 className=' font-medium underline'>আমাদের মাধ্যমে আবেদন সম্পন্ন করতে যোগাযোগ করুন</h2>
                    <p>
                        01611530939 (Whatsapp)
                    </p>

                </div>
                <div className='mt-3 md:mt-0'>
                    <SelectField
                        name={"feeSelector"}
                        label={"ফী দেখার জন্য আবেদন ধরণ নির্বাচন করুন"}
                        placeholder={"আবেদন করে নিবেন?"}
                        onChange={handleChange}
                        options={selectOptions}
                        value={applyWithUs}
                    />
                </div>
            </div>
            <Table>
                <TableCaption>পদ অনুযায়ী ফী</TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">পদের নাম</TableHead>
                        <TableHead>আবেদন ফি (BDT)</TableHead>
                        <TableHead>
                            {
                                applyWithUs ? "চার্জ(BDT)" : "ডিফল্ট"
                            }
                        </TableHead>
                        <TableHead className="text-right">মোট (BDT)</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {feeData.map((feeItem, index) => (
                        <TableRow key={index}>
                            <TableCell
                                className="font-medium">{feeItem.postName}</TableCell>
                            <TableCell>{feeItem.payPaymentFee}</TableCell>
                            <TableCell>{applyWithUs ? feeItem.charge : 0}</TableCell>
                            <TableCell className="text-right font-semibold">
                                {
                                    applyWithUs ? Number(feeItem.totalFee) : Number(feeItem.payPaymentFee)
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
