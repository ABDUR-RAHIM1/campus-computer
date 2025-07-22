"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectField({
  label,
  name,
  options = [],
  value,
  onChange,
  error,
  required = false,
  placeholder = "সিলেক্ট করুন",
}) {
  return (
    <div className="w-full mb-4"> {/* ✅ Full width for grid layout */}
      <Label htmlFor={name} className="font-medium mb-1 block">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      <Select
        value={value}
        onValueChange={(val) => onChange({ target: { name, value: val } })}
      >
        <SelectTrigger className={`w-full ${error ? "border-red-500" : ""}`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
