import DataNotFound from '@/components/DataNotFound'
import OrderDetails from '@/components/orderDeatils/OrderDetails'
import { GetOrderDetailsByStudent } from '@/handlers/order'
import React from 'react'


// for student
export default async function OrderDetailsPage({ params }) {
    const { orderId } = await params
    const { status, data } = await GetOrderDetailsByStudent(orderId)

    if (!data) return <DataNotFound text={data?.message} />



    return <OrderDetails data={data} />
}