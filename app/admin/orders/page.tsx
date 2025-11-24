/** @format */
import { deleteOrder, getAllOrders } from "@/lib/actions/order.action";
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
import {
  Eye,
  Package,
  Truck,
  CreditCard,
  User,
  TrendingUp,
} from "lucide-react";
import DeleteDialog from "@/components/ui/shared/delete-dialog";

const OrdersPage = async (props: {
  searchParams: Promise<{ page: string; query: string }>;
}) => {
  await rquireAdmin();

  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const searchText = searchParams.query || "";

  const orders = await getAllOrders({
    page: page,
    query: searchText,
  });

  // Calculate stats from order data
  const totalOrders = orders.data.length;
  const totalRevenue = orders.data.reduce(
    (acc, order) => acc + parseFloat(order.totalPrice),
    0
  );
  const paidOrders = orders.data.filter((order) => order.isPaid).length;
  const deliveredOrders = orders.data.filter(
    (order) => order.isDelivered
  ).length;
  const pendingDelivery = paidOrders - deliveredOrders;

  // Get payment method icon
  const getPaymentIcon = (method: string) => {
    const paymentIcons: { [key: string]: string } = {
      PayPal: "text-blue-500",
      "Credit Card": "text-green-500",
      Stripe: "text-purple-500",
      Cash: "text-gray-500",
      "Bank Transfer": "text-orange-500",
    };
    return paymentIcons[method] || "text-gray-400";
  };

  // Get status color
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getStatusColor = (order: any) => {
    if (!order.isPaid)
      return {
        bg: "bg-red-100",
        text: "text-red-800",
        border: "border-red-200",
      };
    if (!order.isDelivered)
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        border: "border-yellow-200",
      };
    return {
      bg: "bg-green-100",
      text: "text-green-800",
      border: "border-green-200",
    };
  };

  // Get status text
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getStatusText = (order: any) => {
    if (!order.isPaid) return "Pending Payment";
    if (!order.isDelivered) return "Processing";
    return "Delivered";
  };

  return (
    <div className='space-y-6'>
      {/* Cool Hero Header */}
      <section className='relative bg-gradient-to-br  from-slate-900 via-black to-slate-900  rounded-2xl overflow-hidden'>
        {/* Background Pattern */}
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent'></div>

        {/* Floating Icons */}
        {/* <div className='absolute top-10 left-10 w-20 h-20 bg-orange-500/10 rounded-full backdrop-blur-sm border border-orange-500/20 flex items-center justify-center'>
          <Package className='w-8 h-8 text-orange-300' />
        </div> */}
        <div className='absolute bottom-10 right-10 w-16 h-16 bg-green-500/10 rounded-full backdrop-blur-sm border border-green-500/20 flex items-center justify-center'>
          <Truck className='w-6 h-6 text-green-300' />
        </div>
        <div className='absolute top-1/2 right-1/4 w-12 h-12 bg-blue-500/10 rounded-full backdrop-blur-sm border border-blue-500/20 flex items-center justify-center'>
          <CreditCard className='w-5 h-5 text-blue-300' />
        </div>

        {/* Main Content */}
        <div className='relative max-w-7xl mx-auto px-6 py-16'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
            {/* Text Content */}
            <div className='space-y-6'>
              <div className='space-y-4'>
                <div className='inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2'>
                  <Package className='w-4 h-4 text-green-300' />
                  <span className='text-sm text-green-200 font-medium'>
                    Order Management
                  </span>
                </div>

                <h1 className='text-4xl lg:text-5xl font-bold text-white tracking-tight'>
                  Order{" "}
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400'>
                    Dashboard
                  </span>
                </h1>

                <p className='text-lg text-gray-300 max-w-lg'>
                  Manage customer orders, track shipments, and monitor payment
                  status. Keep your customers informed and ensure smooth order
                  fulfillment from purchase to delivery.
                </p>
              </div>

              {/* Stats */}
              <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
                <div className='text-center bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10'>
                  <div className='text-xl font-bold text-white'>
                    {totalOrders}
                  </div>
                  <div className='text-sm text-gray-400'>Total Orders</div>
                </div>
                <div className='text-center bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10'>
                  <div className='text-xl font-bold text-white'>
                    {formatCurrency(totalRevenue.toFixed(2))}
                  </div>
                  <div className='text-sm text-gray-400'>Total Revenue</div>
                </div>
                <div className='text-center bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10'>
                  <div className='text-xl font-bold text-white'>
                    {paidOrders}
                  </div>
                  <div className='text-sm text-gray-400'>Paid Orders</div>
                </div>
                <div className='text-center bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10'>
                  <div className='text-xl font-bold text-white'>
                    {pendingDelivery}
                  </div>
                  <div className='text-sm text-gray-400'>Pending Delivery</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className='flex gap-4'>
                <Button
                  asChild
                  className='bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 border-0 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200'>
                  <Link href={"/admin/orders/analytics"}>View Analytics</Link>
                </Button>
                {/* <Button
                  variant='outline'
                  className='border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-full font-semibold backdrop-blur-sm'>
                  Export Orders
                </Button> */}
              </div>
            </div>

            {/* Order Cards Preview */}
            <div className='relative'>
              <div className='space-y-4'>
                {orders.data.slice(0, 3).map((order) => {
                  const status = getStatusColor(order);
                  return (
                    <div
                      key={order.id}
                      className='bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all duration-300 group'>
                      <div className='flex items-start justify-between'>
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-center gap-3 mb-2'>
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${status.bg} ${status.border}`}>
                              <User className={`w-4 h-4 ${status.text}`} />
                            </div>
                            <div>
                              <h3 className='font-semibold text-white text-sm group-hover:text-orange-200 transition-colors'>
                                {order.user.name}
                              </h3>
                              <p className='text-xs text-gray-400'>
                                {formatDateTime(order.createdAt).dateTime}
                              </p>
                            </div>
                          </div>

                          <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-4'>
                              <span
                                className={`text-xs font-medium px-2 py-1 rounded-full ${status.bg} ${status.text}`}>
                                {getStatusText(order)}
                              </span>
                              <span
                                className={`text-xs ${getPaymentIcon(order.paymentMethod)}`}>
                                {order.paymentMethod}
                              </span>
                            </div>
                            <span className='text-sm font-bold text-white'>
                              {formatCurrency(order.totalPrice)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Floating Elements */}
              <div className='absolute -top-4 -right-4 w-24 h-24 bg-green-500/20 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-pulse'></div>
              <div className='absolute -bottom-4 -left-4 w-32 h-32 bg-green-500/20 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-pulse delay-1000'></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <h1 className='h2-bold'>All Orders</h1>
            {searchText && (
              <div className='flex items-center gap-2'>
                <span className='text-sm text-gray-600'>
                  Filtered by <i>&quot;{searchText}&quot;</i>
                </span>
                <Link href={"/admin/orders"}>
                  <Button variant='outline' size='sm'>
                    Remove Filter
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className='flex items-center gap-4'>
            <div className='text-sm text-gray-600'>
              Showing {orders.data.length} of {totalOrders} orders
            </div>
            <Button asChild variant='outline' size={"lg"}>
              <Link
                href={"/admin/orders/analytics"}
                className='flex items-center gap-2'>
                <TrendingUp className='w-4 h-4' />
                Analytics
              </Link>
            </Button>
          </div>
        </div>

        <div className='overflow-x-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ORDER ID</TableHead>
                <TableHead>DATE</TableHead>
                <TableHead>CUSTOMER</TableHead>
                <TableHead>PAYMENT METHOD</TableHead>
                <TableHead>TOTAL</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>PAID</TableHead>
                <TableHead>DELIVERED</TableHead>
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.data.map((order) => {
                const status = getStatusColor(order);
                return (
                  <TableRow key={order.id} className='hover:bg-gray-50/50'>
                    <TableCell className='font-mono text-sm'>
                      {formatId(order.id)}
                    </TableCell>
                    <TableCell>
                      <div className='flex flex-col'>
                        <span className='text-sm font-medium'>
                          {formatDateTime(order.createdAt).dateOnly}
                        </span>
                        <span className='text-xs text-gray-500'>
                          {formatDateTime(order.createdAt).timeOnly}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <User className='w-4 h-4 text-gray-400' />
                        <span className='font-medium'>{order.user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <CreditCard
                          className={`w-4 h-4 ${getPaymentIcon(order.paymentMethod)}`}
                        />
                        <span className='text-sm'>{order.paymentMethod}</span>
                      </div>
                    </TableCell>
                    <TableCell className='font-semibold text-green-600'>
                      <div className='flex items-center gap-1'>
                        {formatCurrency(order.totalPrice)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.text} ${status.border}`}>
                        {getStatusText(order)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {order.isPaid ? (
                        <div className='flex items-center gap-2 text-green-600'>
                          <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                          <span className='text-sm'>
                            {order.paidAt
                              ? formatDateTime(order.paidAt).dateTime
                              : "Paid"}
                          </span>
                        </div>
                      ) : (
                        <div className='flex items-center gap-2 text-red-600'>
                          <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                          <span className='text-sm'>Pending</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {order.isDelivered ? (
                        <div className='flex items-center gap-2 text-green-600'>
                          <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                          <span className='text-sm'>
                            {order.deliveredAt
                              ? formatDateTime(order.deliveredAt).dateTime
                              : "Delivered"}
                          </span>
                        </div>
                      ) : (
                        <div className='flex items-center gap-2 text-yellow-600'>
                          <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
                          <span className='text-sm'>Processing</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className='flex gap-2'>
                        <Button asChild variant='outline' size='sm'>
                          <Link href={`/order/${order.id}`}>
                            <Eye className='w-4 h-4' />
                          </Link>
                        </Button>
                        <DeleteDialog id={order.id} action={deleteOrder} />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {orders.totalPages > 1 && (
          <Pagination page={Number(page) || 1} totalPages={orders.totalPages} />
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
