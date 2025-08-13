/** @format */
// import { Metadata } from "next";
import { getAllOrders } from "@/lib/actions/order.action";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/ui/shared/pagination";
import { rquireAdmin } from "@/lib/auth-guard";
import { Button } from "@/components/ui/button";
import { Eye, Trash } from "lucide-react";

const OrdersPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  await rquireAdmin();

  const { page } = await props.searchParams;
  const orders = await getAllOrders({ page: Number(page) || 1 });

  return (
    <div className='space-y-2'>
      <h2 className='h2-bold'>All Orders</h2>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>TOTAL</TableHead>
              <TableHead>PAID</TableHead>
              <TableHead>DELIVERED</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.data.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{formatId(order.id)}</TableCell>
                <TableCell>
                  {formatDateTime(order.createdAt).dateTime}
                </TableCell>
                <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                <TableCell>
                  {order.isPaid && order.paidAt
                    ? formatDateTime(order.paidAt).dateTime
                    : "Not Paid"}
                </TableCell>
                <TableCell>
                  {order.isDelivered && order.deliveredAt
                    ? formatDateTime(order.deliveredAt).dateTime
                    : "Not Delivered"}
                </TableCell>
                <TableCell>
                  <Button asChild variant='outline' size='sm'>
                    <Link href={`/order/${order.id}`}>
                      <Eye />
                    </Link>
                  </Button>
                  <Button asChild variant='outline' size='sm' className='ml-2'>
                    <Link href={`/order/${order.id}`}>
                      <Trash />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {orders.totalPages > 1 && (
        <Pagination page={Number(page) || 1} totalPages={orders.totalPages} />
      )}
    </div>
  );
};

export default OrdersPage;
