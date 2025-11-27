import DataNotFound from '@/components/DataNotFound';
import { GetSingleJobPostById } from '@/handlers/jobPost';
import React from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import { formatDateToInput } from '@/utilities/formatDateToInput';

export async function generateMetadata({ params }) {
    const { jobId } = await params;
    const { status, data } = await GetSingleJobPostById(jobId);

    if (status !== 200 || !data) {
        return {
            title: "Job Post Not Found",
            description: "The requested job post could not be found.",
        };
    }

    return {
        title: `${data.title} | Job Details`,
        description: data.description
            ? data.description.substring(0, 160).replace(/\n/g, " ")
            : "Job details and description.",
        openGraph: {
            title: `${data.title} | Job Details`,
            description: data.description
                ? data.description.substring(0, 160).replace(/\n/g, " ")
                : "Job details and description.",
            url: `https://your-domain.com/job/${jobId}`,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${data.title} | Job Details`,
            description: data.description
                ? data.description.substring(0, 160).replace(/\n/g, " ")
                : "Job details and description.",
        },
    };
}

export default async function JobDetails({ params }) {

    const { jobId } = await params;
    const { status, data } = await GetSingleJobPostById(jobId);

    if (status !== 200 || !data) {
        return <DataNotFound text={"Job post not found"} />
    }

    return (
        <div className='w-full min-h-screen bg-gray-50 p-6'>
            <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-6'>

                {/* Title */}
                <h1 className='text-3xl font-bold text-gray-800 capitalize'>
                    {data.title || "Untitled Job Post"}
                </h1>

                {/* Category + Dates */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700'>

                    <div>
                        <span className='font-semibold'>চাকরির ধরন:</span>
                        <p>{data.category || "N/A"}</p>
                    </div>

                    <div>
                        <span className='font-semibold'>আবেদন শুরু হবে:</span>
                        <p>{data.startDate ? formatDateToInput(data.startDate) : "N/A"}</p>
                    </div>

                    <div>
                        <span className='font-semibold'>আবেদন শেষ হবে:</span>
                        <p>{data.endDate ? formatDateToInput(data.endDate) : "N/A"}</p>
                    </div>

                </div>

                {/* Payment Info */}
                <div className='flex flex-wrap items-center gap-4 justify-start text-gray-700 border-t pt-4'>
                    <div className='flex-1 min-w-[150px]'>
                        <span className='font-semibold'>মুল ফী:</span> {data.payPaymentFee} BDT
                    </div>
                    <div className=' border p-3 min-w-[70%]'>
                        <h2 className=' font-bold underline mb-3 text-red-500'>যদি আমাদের মাধ্যমে আবেদন করেন।</h2>
                        <div className='flex-1 min-w-[150px]'>
                            <span className='font-semibold'>চার্জ:</span> {data.charge} BDT
                        </div>
                        <div className='flex-1 min-w-[150px]'>
                            <span className='font-semibold'>মোট:</span> {data.totalPrice} BDT
                        </div>
                    </div>
                </div>

                {/* Notice Link */}
                {data.noticeLink && (
                    <div className='border-t pt-4 space-x-1'>
                        <span className='font-semibold'> মুল নোটিশ: </span>
                        <a
                            href={data.noticeLink}
                            target='_blank'
                            rel='noopener noreferrer'
                            className=' ml-2 py-2 px-3 bg-blue-500 text-white rounded-md  underline break-all'
                        >
                            এখানে ক্লিক করুন
                        </a>
                    </div>
                )}

                {/* Markdown Description */}
                <div className='markdown prose max-w-full bg-gray-50 p-4 rounded-md border'>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkMath]}
                        rehypePlugins={[rehypeKatex, rehypeRaw]}
                    >
                        {data.description || "*No description available*"}
                    </ReactMarkdown>
                </div>

            </div>
        </div>
    );
}
