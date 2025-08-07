 

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const programs = [
  {
    name: "Honors",
    totalCollegeFee: 55000,
    totalChargeFee: 8000,
    totalBenefit: 12000,
    color: "bg-blue-100",
  },
  {
    name: "Degree",
    totalCollegeFee: 42000,
    totalChargeFee: 6000,
    totalBenefit: 9000,
    color: "bg-green-100",
  },
  {
    name: "Intermediate",
    totalCollegeFee: 30000,
    totalChargeFee: 4000,
    totalBenefit: 6000,
    color: "bg-yellow-100",
  },
];

export default function ServiceOverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-৫">
      {programs.map((program, index) => (
        <Card key={index} className={`${program.color} shadow-lg rounded-2xl`}>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-700">
              {program.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-800">
            <p>
              <span className="font-semibold">Total College Fee:</span>{" "}
              ৳{program.totalCollegeFee}
            </p>
            <p>
              <span className="font-semibold">Total Charge Fee:</span>{" "}
              ৳{program.totalChargeFee}
            </p>
            <p>
              <span className="font-semibold">Total Benefit:</span>{" "}
              ৳{program.totalBenefit}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
