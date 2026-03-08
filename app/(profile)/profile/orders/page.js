import DataNotFound from '@/components/DataNotFound';
import OrderTable from '@/components/orderTable/OrderTable';
import { GetMyOrders } from '@/handlers/order'
import React from 'react'


//   specefic students Order
export default async function OrderList() {
    const { status, data } = await GetMyOrders();


    if (status !== 200) {
        return <DataNotFound text={"আপনার কোন অর্ডার নেই!"} />
    }

    return <OrderTable orders={data}
        isAdmin={false}
    />
}
