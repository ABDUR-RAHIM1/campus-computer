import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, ShoppingCart, CreditCard, FileText } from 'lucide-react';

const dashboardData = [
  {
    title: 'মোট স্টুডেন্ট',
    value: "১২৫০",
    icon: <Users className="w-6 h-6 text-blue-600" />,
    bg: 'bg-blue-100'
  },
  {
    title: 'মোট অর্ডার',
    value: "৩৪৫",
    icon: <ShoppingCart className="w-6 h-6 text-green-600" />,
    bg: 'bg-green-100'
  },
  {
    title: 'পেমেন্ট সম্পন্ন',
    value: '৳২,৫৬,০০০',
    icon: <CreditCard className="w-6 h-6 text-yellow-600" />,
    bg: 'bg-yellow-100'
  },
  {
    title: 'মোট ডকুমেন্ট',
    value: "৮৯০",
    icon: <FileText className="w-6 h-6 text-purple-600" />,
    bg: 'bg-purple-100'
  }
];

export default function DashboardOverview() {
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {dashboardData.map((item, index) => (
        <Card key={index} className={`rounded-2xl shadow-md ${item.bg}`}>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
              <p className="text-2xl font-bold text-gray-900">{item.value}</p>
            </div>
            {item.icon}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
