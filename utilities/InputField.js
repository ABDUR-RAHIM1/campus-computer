"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function InputField({ label, name, type = "text", placeholder, value, onChange, error, required = false }) {
    return (
        <div className="w-full mb-4">
            <Label htmlFor={name} className="font-medium mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <Input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className={error ? " border-red-500" : ""}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}
