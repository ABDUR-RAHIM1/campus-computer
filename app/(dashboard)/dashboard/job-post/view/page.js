import React from "react";
import DataNotFound from "@/components/DataNotFound";
import { GetAllJobPost } from "@/handlers/jobPost";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatDateToInput } from "@/utilities/formatDateToInput";
import UpdateButton from "../../components/UpdateButton";
import DeleteButton from "../../components/DeleteButton";

export default async function JobPostView() {
    const { status, data } = await GetAllJobPost();

    if (status !== 200 || !data || data.length === 0) {
        return <DataNotFound />;
    }

    return (
        <div className="p-4 my-10">
            <h2 className=" text-2xl font-bold my-4 underline"> Job Post</h2>
            <Table>
                <TableCaption>All Job Posts</TableCaption>

                {/* HEADER */}
                <TableHeader>
                    <TableRow>
                        <TableHead>Serial</TableHead>
                        <TableHead>Info</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Total Vacancy</TableHead>
                        <TableHead>Notice</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>

                {/* BODY */}
                <TableBody>
                    {data.map((job, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className={" space-y-1.5"}>
                                <p className="text-[12px]"> ({job.category})</p>
                                <p>{job.title}</p>
                            </TableCell>
                            <TableCell>{formatDateToInput(job.startDate)}</TableCell>
                            <TableCell>{formatDateToInput(job.endDate)}</TableCell>
                            <TableCell>{job.totalVacancy}</TableCell>

                            <TableCell>
                                {job.noticeLink ? (
                                    <a
                                        href={job.noticeLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        View Notice
                                    </a>
                                ) : (
                                    "N/A"
                                )}
                            </TableCell>
                            <TableCell className={" flex flex-col gap-2"}>
                                <UpdateButton
                                    data={job}
                                    route={"/dashboard/job-post/add"}
                                />
                                <DeleteButton />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
