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
import {
  BadgeDollarSign,
  Barcode,
  CreditCard,
  Users,
  TrendingUp,
  Eye,
  Package,
} from "lucide-react";
import Link from "next/link";
import ChartOverview from "./charts";
import { rquireAdmin } from "@/lib/auth-guard";
import { Button } from "@/components/ui/button";

const OverViewPage = async () => {
  await rquireAdmin();
  const session = await auth();

  if (session?.user?.role !== "admin") {
    throw new Error("User is not authorized");
  }

  const summary = await getOrderSummary();

  const InfoCards = [
    {
      title: "Total Revenue",
      icon: <BadgeDollarSign className='w-5 h-5' />,
      value: formatCurrency(
        summary.totalSales._sum.totalPrice?.toString() || 0
      ),
      description: "+20.1% from last month",
      trend: "up",
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Total Sales",
      icon: <CreditCard className='w-5 h-5' />,
      value: formatNumber(summary.ordersCount),
      description: "+12% from last month",
      trend: "up",
      color: "from-blue-500 to-cyan-600",
    },
    {
      title: "Customers",
      icon: <Users className='w-5 h-5' />,
      value: formatNumber(summary.userCount),
      description: "+8% from last month",
      trend: "up",
      color: "from-purple-500 to-violet-600",
    },
    {
      title: "Products",
      icon: <Barcode className='w-5 h-5' />,
      value: formatNumber(summary.productCount),
      description: "+15% from last month",
      trend: "up",
      color: "from-orange-500 to-amber-600",
    },
  ];

  return (
    <div className='space-y-6'>
      {/* Hero Header */}
      <section className='relative bg-gradient-to-br  from-slate-900 via-black to-slate-900 rounded-2xl overflow-hidden'>
        {/* Background Pattern */}
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent'></div>

        {/* Floating Icons */}
        {/* <div className='absolute top-10 left-10 w-20 h-20 bg-green-500/10 rounded-full backdrop-blur-sm border border-green-500/20 flex items-center justify-center'>
          <TrendingUp className='w-8 h-8 text-green-300' />
        </div> */}
        {/* <div className='absolute bottom-10 right-10 w-16 h-16 bg-pink-500/10 rounded-full backdrop-blur-sm border border-pink-500/20 flex items-center justify-center'>
          <ShoppingBag className='w-6 h-6 text-pink-300' />
        </div> */}
        {/* <div className='absolute top-1/2 right-1/4 w-12 h-12 bg-blue-500/10 rounded-full backdrop-blur-sm border border-blue-500/20 flex items-center justify-center'>
          <Package className='w-5 h-5 text-blue-300' />
        </div> */}

        {/* Main Content */}
        <div className='relative max-w-7xl mx-auto px-6 py-12'>
          <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between'>
            <div className='space-y-4 flex-1'>
              <div className='space-y-2'>
                <div className='inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2'>
                  <TrendingUp className='w-4 h-4 text-green-300' />
                  <span className='text-sm text-green-200 font-medium'>
                    Dashboard Overview
                  </span>
                </div>

                <h1 className='text-3xl lg:text-4xl font-bold text-white tracking-tight'>
                  Welcome to Your{" "}
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400'>
                    Dashboard
                  </span>
                </h1>

                <p className='text-lg text-gray-300 max-w-2xl mb-4'>
                  Monitor your store performance, track sales, and manage your
                  business with real-time analytics and insights.
                </p>
                {/* Quick Actions */}
                <div className='flex gap-3 pt-6 '>
                  <Button
                    asChild
                    className='bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 border-0 text-white px-8 py-3  font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200'>
                    <Link href='/admin/orders'>View Orders</Link>
                  </Button>
                  <Button className='bg-gradient-to-r from-green-600 to-blue-600 hover:from-blue-700 hover:to-green-700 border-0 text-white px-8 py-3  font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200'>
                    Export Report
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4'>
                <div className='text-center bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10'>
                  <div className='text-lg font-bold text-white'>
                    {formatCurrency(
                      summary.totalSales._sum.totalPrice?.toString() || 0
                    )}
                  </div>
                  <div className='text-xs text-gray-400'>Revenue</div>
                </div>
                <div className='text-center bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10'>
                  <div className='text-lg font-bold text-white'>
                    {formatNumber(summary.ordersCount)}
                  </div>
                  <div className='text-xs text-gray-400'>Orders</div>
                </div>
                <div className='text-center bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10'>
                  <div className='text-lg font-bold text-white'>
                    {formatNumber(summary.userCount)}
                  </div>
                  <div className='text-xs text-gray-400'>Customers</div>
                </div>
                <div className='text-center bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10'>
                  <div className='text-lg font-bold text-white'>
                    {formatNumber(summary.productCount)}
                  </div>
                  <div className='text-xs text-gray-400'>Products</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Content */}
      <div className='space-y-6'>
        {/* Stats Cards */}
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {InfoCards.map((item, i) => (
            <Card
              key={i}
              className='relative overflow-hidden border-0 shadow-lg'>
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10`}></div>
              <div className='absolute top-0 right-0 w-20 h-20 -mr-6 -mt-6 bg-white/5 rounded-full'></div>

              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-4 relative z-10'>
                <CardTitle className='text-sm font-medium text-gray-600'>
                  {item.title}
                </CardTitle>
                <div
                  className={`p-2 rounded-lg bg-gradient-to-br ${item.color} text-white`}>
                  {item.icon}
                </div>
              </CardHeader>
              <CardContent className='relative z-10'>
                <div className='text-2xl font-bold text-gray-900 mb-1'>
                  {item.value}
                </div>
                <div className='flex items-center gap-1'>
                  <TrendingUp className='w-3 h-3 text-green-500' />
                  <p className='text-xs text-gray-500'>{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts and Recent Sales */}
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-7'>
          {/* Revenue Chart */}
          <Card className='col-span-4 border-0 shadow-lg'>
            <CardHeader className='pb-4'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-lg font-semibold'>
                  Revenue Overview
                </CardTitle>
                <div className='flex items-center gap-2 text-sm text-gray-500'>
                  <div className='flex items-center gap-1'>
                    <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                    <span>This Month</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <div className='w-2 h-2 bg-gray-300 rounded-full'></div>
                    <span>Last Month</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className='pt-2'>
              <ChartOverview
                data={{
                  salesData: summary.salesData,
                }}
              />
            </CardContent>
          </Card>

          {/* Recent Sales */}
          <Card className='col-span-3 border-0 shadow-lg'>
            <CardHeader className='pb-4'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-lg font-semibold'>
                  Recent Sales
                </CardTitle>
                <Button variant='ghost' size='sm' asChild>
                  <Link
                    href='/admin/orders'
                    className='text-xs text-blue-600 hover:text-blue-700'>
                    View All
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className='p-0'>
              <Table>
                <TableHeader>
                  <TableRow className='border-b border-gray-100'>
                    <TableHead className='text-xs font-medium text-gray-500'>
                      CUSTOMER
                    </TableHead>
                    <TableHead className='text-xs font-medium text-gray-500'>
                      DATE
                    </TableHead>
                    <TableHead className='text-xs font-medium text-gray-500'>
                      AMOUNT
                    </TableHead>
                    <TableHead className='text-xs font-medium text-gray-500'>
                      ACTION
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {summary.latestSale.map((order) => (
                    <TableRow
                      key={order.id}
                      className='border-b border-gray-50 hover:bg-gray-50/50 transition-colors'>
                      <TableCell className='py-3'>
                        <div className='flex items-center gap-2'>
                          <div className='w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center'>
                            <span className='text-xs font-medium text-white'>
                              {order?.user?.name
                                ? order.user.name.charAt(0).toUpperCase()
                                : "D"}
                            </span>
                          </div>
                          <span className='text-sm font-medium'>
                            {order?.user?.name
                              ? order.user.name
                              : "Deleted User"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className='py-3 text-sm text-gray-600'>
                        {formatDateTime(order.createdAt).dateOnly}
                      </TableCell>
                      <TableCell className='py-3'>
                        <span className='text-sm font-semibold text-green-600'>
                          {formatCurrency(order.totalPrice)}
                        </span>
                      </TableCell>
                      <TableCell className='py-3'>
                        <Button
                          asChild
                          variant='ghost'
                          size='sm'
                          className='h-8 px-2'>
                          <Link
                            href={`/order/${order.id}`}
                            className='flex items-center gap-1 text-xs'>
                            <Eye className='w-3 h-3' />
                            View
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {summary.latestSale.length === 0 && (
                <div className='py-8 text-center'>
                  <Package className='w-12 h-12 text-gray-300 mx-auto mb-2' />
                  <p className='text-sm text-gray-500'>No recent sales</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats Section */}
        <div className='grid gap-6 md:grid-cols-3'>
          {/* Average Order Value */}
          <Card className='border-0 shadow-lg'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm font-medium text-gray-600'>
                Average Order Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-gray-900'>
                {formatCurrency(
                  summary.totalSales._sum.totalPrice && summary.ordersCount > 0
                    ? (
                        Number(summary.totalSales._sum.totalPrice) /
                        summary.ordersCount
                      ).toFixed(2)
                    : "0"
                )}
              </div>
              <div className='flex items-center gap-1 mt-1'>
                <TrendingUp className='w-3 h-3 text-green-500' />
                <p className='text-xs text-gray-500'>+5.2% from last month</p>
              </div>
            </CardContent>
          </Card>

          {/* Conversion Rate */}
          <Card className='border-0 shadow-lg'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm font-medium text-gray-600'>
                Conversion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-gray-900'>3.2%</div>
              <div className='flex items-center gap-1 mt-1'>
                <TrendingUp className='w-3 h-3 text-green-500' />
                <p className='text-xs text-gray-500'>+0.8% from last month</p>
              </div>
            </CardContent>
          </Card>

          {/* Customer Satisfaction */}
          <Card className='border-0 shadow-lg'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm font-medium text-gray-600'>
                Customer Satisfaction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-gray-900'>94%</div>
              <div className='flex items-center gap-1 mt-1'>
                <TrendingUp className='w-3 h-3 text-green-500' />
                <p className='text-xs text-gray-500'>+2% from last month</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OverViewPage;
