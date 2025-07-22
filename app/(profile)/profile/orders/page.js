import DataNotFound from '@/components/DataNotFound';
import { GetMyOrders } from '@/handlers/order'
import React from 'react'
import OrderTable from './OrderTable';


//   specefic students Order
export default async function OrderList() {
    const { status, data } = await GetMyOrders();

    console.log(data)

    if (status !== 200) {
        return <DataNotFound text={"আপনার কোন অর্ডার নেই!"} />
    }

    return <OrderTable orders={data} />
}
