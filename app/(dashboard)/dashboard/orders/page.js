import { GetAllOrders } from '@/handlers/order'
import React from 'react'
import OrderTable from './OrderTable';

export default async function OrderPage() {
    const { status, data } = await GetAllOrders();

    if (status !== 200) {
        return <DataNotFound text={" কোন অর্ডার নেই!"} />
    }

    return <OrderTable orders={data} />
}
