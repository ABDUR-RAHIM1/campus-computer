import React from 'react'
import { getMyPaymentInfo } from '@/handlers/paymentInfo';
import DataNotFound from '@/components/DataNotFound'; 
import PaymentTable from '@/components/payments/PaymentTable';

//  for user / student
export default async function PaymentStatus() {

    const { status, data } = await getMyPaymentInfo();


    if (status !== 200) {
        return <DataNotFound />
    }

    return <PaymentTable isAmin={false} paymentData={data} />
}
