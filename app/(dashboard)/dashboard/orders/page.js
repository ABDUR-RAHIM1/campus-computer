import OrderTable from '@/components/orderTable/OrderTable';
import { GetAllOrders } from '@/handlers/order'
import React from 'react'

export default async function OrderPage() {
    const { status, data } = await GetAllOrders();

    if (status !== 200) {
        return <DataNotFound text={" কোন অর্ডার নেই!"} />
    }

    return <OrderTable orders={data} isAdmin={true} />
}
