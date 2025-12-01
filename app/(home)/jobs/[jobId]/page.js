import DataNotFound from '@/components/DataNotFound';
import { GetSingleJobPostById } from '@/handlers/jobPost';
import React from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import { formatDateToInput } from '@/utilities/formatDateToInput';

import { BASE_URL } from '@/constans';
import PostWithFeeTable from '../PostWithFeeTable';

export async function generateMetadata({ params }) {
    const { jobId } = await params;
    const { status, data } = await GetSingleJobPostById(jobId);

    if (status !== 200 || !data) {
        return {
            title: "Job Post Not Found",
            description: "The requested job post could not be found.",
            alternates: {
                canonical: `${BASE_URL}/jobs/${jobId}`,
            }
        };
    }

    const title = `${data.title} | Job Details`;
    const description = data.description
        ? data.description.substring(0, 160).replace(/\n/g, " ")
        : "Job details and description.";

    return {
        title,
        description,

        alternates: {
            canonical: `${BASE_URL}/jobs/${jobId}`,   // ✅ canonical tag added
        },

        openGraph: {
            title,
            description,
            url: `${BASE_URL}/jobs/${jobId}`,
            type: "website",
            images: [
                {
                    url: '/job-og.png',
                    width: 1200,
                    height: 630,
                    alt: 'Campus Computer OG Image',
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [
                {
                    url: '/job-og.png',
                    width: 1200,
                    height: 630,
                    alt: 'Campus Computer OG Image',
                },
            ],
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
        <div className='w-full min-h-screen bg-gray-50 p-3 md:p-6'>
            <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-6'>

                {/* Title */}
                <h1 className='text-3xl font-bold text-gray-800 capitalize'>
                    {data.title || "Untitled Job Post"}
                </h1>

                {/* Category + Dates */}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700'>

                    <div>
                        <span className='font-semibold'>চাকরির ধরন:</span>
                        <p>{data.category || "N/A"}</p>
                    </div>

                    <div>
                        <span className='font-semibold'> মোট পদসংখ্যা:</span>
                        <p>{data.totalVacancy || 0}</p>
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


                <div className="my-5">
                    {data.postWithFee && data.postWithFee.length > 0 ? (
                        <PostWithFeeTable
                            feeData={data.postWithFee}
                        />
                    ) : (
                        <p className="text-gray-500">Post With Fee Is Empty</p>
                    )}
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
                <div className='markdown prose max-w-full bg-gray-50 p-4 rounded-md border table-wrapper'>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkMath]}
                        rehypePlugins={[rehypeKatex, rehypeRaw]}
                        components={{
                            table: ({ node, ...props }) => (
                                <div className="table-wrapper">
                                    <table {...props} />
                                </div>
                            ),
                        }}
                    >
                        {data.description || "*No description available*"}
                    </ReactMarkdown>
                </div>

            </div>
        </div>
    );
}
