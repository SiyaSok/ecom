/** @format */

import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOrderSummary } from "@/lib/actions/order.action";
import { formatCurrency, formatDateTime, formatNumber } from "@/lib/utils";
import { BadgeDollarSign, Barcode, CreditCard, Users } from "lucide-react";
import Link from "next/link";
import ChartOverview from "./charts";

const OverViewPage = async () => {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    throw new Error("User is not  authorized");
  }
  const summary = await getOrderSummary();

  const InfoCards = [
    {
      title: "Total Revenue",
      icon: <BadgeDollarSign />,
      value: formatCurrency(
        summary.totalSales._sum.totalPrice?.toString() || 0
      ),
    },
    {
      title: "Sales",
      icon: <CreditCard />,
      value: formatNumber(summary.ordersCount),
    },
    {
      title: "Customers",
      icon: <Users />,
      value: formatNumber(summary.userCount),
    },
    {
      title: "Products",
      icon: <Barcode />,
      value: formatNumber(summary.productCount),
    },
  ];

  return (
    <div className='space-y-2'>
      <h1 className='h2-bold'>Dashboard</h1>`
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {InfoCards.map((item, i) => (
          <Card
            key={i}
            className='odd:bg-gray-100 even:text-gray-900 even:bg-white odd:text-black'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {item.title}
              </CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartOverview
              data={{
                salesData: summary.salesData,
              }}
            />
          </CardContent>
        </Card>
        <Card className='col-span-3'>
          <CardHeader>
            <CardTitle>Recent Sales </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>BUYER</TableHead>
                  <TableHead>DATE</TableHead>
                  <TableHead>TOTAL</TableHead>
                  <TableHead>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {summary.latestSale.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      {order?.user?.name ? order?.user?.name : "Deleted User"}
                    </TableCell>
                    <TableCell>
                      {formatDateTime(order.createdAt).dateTime}
                    </TableCell>
                    <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                    <TableCell>
                      <Link href={`/order/${order.id}`}>Details</Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverViewPage;
