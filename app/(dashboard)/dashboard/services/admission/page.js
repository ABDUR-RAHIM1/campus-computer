import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import AdmissionAdd from './AdmissionAdd'
import { fetchAllAdmissionServices } from '@/handlers/Admissions'
import DataNotFound from '@/components/DataNotFound';
import AdmissionField from './AdmissionField';
import DeleteButton from '../../components/DeleteButton';
import UpdateButton from '../../components/UpdateButton';
import { admissionServiceAction } from '@/constans';

export default async function Admission() {
    const { status, data } = await fetchAllAdmissionServices();


    return (
        <div className='p-5 min-h-screen'>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Admission Services</h1>
                <AdmissionAdd />
            </div>

            {(status !== 200 || !data || data.length === 0) ?
                <DataNotFound text={"No Admission Services Available"} />
                :
                <div className='admission_information_showed my-10 border rounded-lg'>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50">
                                <TableHead>Service Name</TableHead>
                                <TableHead>Deadline</TableHead>
                                <TableHead>Charge (Tk)</TableHead>
                                <TableHead>Fields</TableHead>
                                <TableHead>View Fields</TableHead>
                                <TableHead className=" text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((service) => (
                                <TableRow key={service._id}>
                                    <TableCell className="font-semibold">{service.serviceName}</TableCell>
                                    <TableCell>
                                        {new Date(service.deadline).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </TableCell>
                                    <TableCell className="font-medium text-blue-600">
                                        {service.serviceCharge} ৳
                                    </TableCell>
                                    <TableCell>
                                        <span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold border">
                                            {service.formFields?.length || 0} Fields
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <AdmissionField
                                            fields={service.formFields}
                                            serviceName={service.serviceName}
                                        />
                                    </TableCell>
                                    <TableCell className={" space-x-1 text-right"}>
                                        <UpdateButton />
                                        <DeleteButton deleteApi={admissionServiceAction + service._id} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            }
        </div>
    )
}