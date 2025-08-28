"use client"
import { Label } from '@/components/ui/label'
import React from 'react'

export default function SelectField({ name, label, placeholder = "বাছাই করুন", onChange, options, value, required = false }) {
    return (
        <div className={`-mt-1`}>
            <Label className={"mb-2"}>{label} {required && <span className="text-red-500">*</span>}</Label>
            <select
                required={required}
                name={name} id={name}
                onChange={onChange}
                value={value}
                className='w-full px-2 py-1.5 rounded-md border'
            >
                <option value="">{placeholder}</option>
                {
                    options.map((opt, index) => (
                        <option key={index} value={opt.value}>{opt.name}</option>
                    ))
                }
            </select>
        </div>
    )
}
