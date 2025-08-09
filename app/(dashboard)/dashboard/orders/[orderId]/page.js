import DataNotFound from '@/components/DataNotFound'
import OrderDetails from '@/components/orderDeatils/OrderDetails'
import { GetOrderDetails } from '@/handlers/order'
import React from 'react'

//  for admin
export default async function OrderDetailsPage({ params }) {
    const { orderId } = await params
    const { status, data } = await GetOrderDetails(orderId)

    if (!data) return <DataNotFound text={data?.message} />

    return <OrderDetails data={data} />
}