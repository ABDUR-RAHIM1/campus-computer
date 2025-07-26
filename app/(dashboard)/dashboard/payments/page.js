import React from 'react'
import PaymentTable from './PaymentTable';

export default function PaymentStatus() {


    const dummyPayments = [
        {
            id: 1,
            name: "Rahim Uddin",
            email: "rahim@gmail.com",
            amount: 1200,
            status: "Paid",
            date: "2024-07-15",
        },
        {
            id: 2,
            name: "Karim Mia",
            email: "karim@gmail.com",
            amount: 1500,
            status: "Pending",
            date: "2024-07-17",
        },
        {
            id: 3,
            name: "Ayesha Akter",
            email: "ayesha@gmail.com",
            amount: 1300,
            status: "Failed",
            date: "2024-07-18",
        },
    ];


    return <PaymentTable paymentData={dummyPayments} />
}
