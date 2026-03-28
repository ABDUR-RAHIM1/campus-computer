import React from 'react'
import { getAllPaymentInfo } from '@/handlers/paymentInfo';
import DataNotFound from '@/components/DataNotFound';
import PaymentTable from '@/components/payments/PaymentTable';

export default async function PaymentInformation() {

    const { status, data } = await getAllPaymentInfo();


    if (status !== 200) {
        return <DataNotFound />
    }

    // return <PaymentTable paymentData={data} />
    return <PaymentTable isAdmin={true} paymentData={data} />
}
