import DataNotFound from '@/components/DataNotFound';
import { getAllQuickLink } from '@/handlers/quickLink';
import React from 'react';

export default async function QuickLink() {
  const { status, data } = await getAllQuickLink();

  if (status !== 200 || !data || data.length === 0) {
    return <DataNotFound text={"কোন লিংক পাওয়া যায়নি"} />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Quick Links Dashboard</h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">সেবা নাম</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ক্যাটাগরি</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">অফিসিয়াল লিংক</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">স্ট্যাটাস</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">সর্বশেষ আপডেট</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((link) => (
              <tr key={link._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{link.serviceName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{link.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a
                    href={link.officialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {link.officialLink}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {link.status === "Active" && (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      সক্রিয়
                    </span>
                  )}
                  {link.status === "Inactive" && (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      নিষ্ক্রিয়
                    </span>
                  )}
                  {link.status === "Offline" && (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      অফলাইন
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">
                  {new Date(link.updatedAt).toLocaleDateString("bn-BD", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
