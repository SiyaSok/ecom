/** @format */

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/ui/shared/delete-dialog";
import Pagination from "@/components/ui/shared/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteUser, geAllUsers } from "@/lib/actions/user.action";
import { rquireAdmin } from "@/lib/auth-guard";
import { formatId } from "@/lib/utils";
import {
  SquarePen,
  Users,
  Shield,
  Mail,
  MapPin,
  CreditCard,
  UserCheck,
} from "lucide-react";
import Link from "next/link";

const UsersPage = async (props: {
  searchParams: Promise<{ page: string; query: string }>;
}) => {
  await rquireAdmin();

  const { page, query: searchText } = await props.searchParams;
  const users = await geAllUsers({
    page: Number(page) || 1,
    query: searchText || "",
  });

  // Calculate stats from user data
  const totalUsers = users.data?.length || 0;
  const adminUsers =
    users.data?.filter((user) => user.role === "admin").length || 0;
  const verifiedUsers =
    users.data?.filter((user) => user.emailVerified).length || 0;
  const usersWithAddress =
    users.data?.filter((user) => user.address).length || 0;

  // Get user role color
  const getRoleColor = (role: string) => {
    return role === "admin"
      ? {
          bg: "bg-blue-100",
          text: "text-blue-800",
          border: "border-blue-200",
        }
      : { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" };
  };

  // Get user status color
  // const getUserStatusColor = (user: any) => {
  //   if (user.role === "admin")
  //     return {
  //       bg: "bg-blue-500/20",
  //       text: "text-blue-300",
  //       border: "border-blue-500/20",
  //     };
  //   if (user.emailVerified)
  //     return {
  //       bg: "bg-green-500/20",
  //       text: "text-green-300",
  //       border: "border-green-500/20",
  //     };
  //   return {
  //     bg: "bg-gray-500/20",
  //     text: "text-gray-300",
  //     border: "border-gray-500/20",
  //   };
  // };

  // Get payment method icon
  const getPaymentIcon = (method: string) => {
    const paymentIcons: { [key: string]: string } = {
      PayPal: "text-blue-500",
      "Credit Card": "text-green-500",
      Stripe: "text-blue-500",
      Cash: "text-gray-500",
      "Bank Transfer": "text-orange-500",
    };
    return paymentIcons[method] || "text-gray-400";
  };

  return (
    <div className='space-y-6'>
      {/* Cool Hero Header */}
      <section className='relative bg-gradient-to-br from-slate-900 via-black to-slate-900  rounded-2xl overflow-hidden'>
        {/* Background Pattern */}
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent'></div>

        {/* Floating Icons */}
        {/* <div className='absolute top-10 left-10 w-20 h-20 bg-blue-500/10 rounded-full backdrop-blur-sm border border-blue-500/20 flex items-center justify-center'>
          <Users className='w-8 h-8 text-blue-300' />
        </div> */}
        <div className='absolute bottom-10 right-10 w-16 h-16 bg-blue-500/10 rounded-full backdrop-blur-sm border border-blue-500/20 flex items-center justify-center'>
          <Shield className='w-6 h-6 text-blue-300' />
        </div>
        <div className='absolute top-1/2 right-1/4 w-12 h-12 bg-blue-500/10 rounded-full backdrop-blur-sm border border-blue-500/20 flex items-center justify-center'>
          <UserCheck className='w-5 h-5 text-blue-300' />
        </div>

        {/* Main Content */}
        <div className='relative max-w-7xl mx-auto px-6 py-16'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
            {/* Text Content */}
            <div className='space-y-6'>
              <div className='space-y-4'>
                <div className='inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2'>
                  <Shield className='w-4 h-4 text-blue-300' />
                  <span className='text-sm text-blue-200 font-medium'>
                    User Management
                  </span>
                </div>

                <h1 className='text-4xl lg:text-5xl font-bold text-white tracking-tight'>
                  User{" "}
                  <span className=' text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400'>
                    Administration
                  </span>
                </h1>

                <p className='text-lg text-gray-300 max-w-lg'>
                  Manage user accounts, roles, and permissions. Monitor user
                  activity, manage admin access, and ensure secure user
                  management across your platform.
                </p>
              </div>

              {/* Stats */}
              <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
                <div className='text-center bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10'>
                  <div className='text-2xl font-bold text-white'>
                    {totalUsers}
                  </div>
                  <div className='text-sm text-gray-400'>Total Users</div>
                </div>
                <div className='text-center bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10'>
                  <div className='text-2xl font-bold text-white'>
                    {adminUsers}
                  </div>
                  <div className='text-sm text-gray-400'>Admins</div>
                </div>
                <div className='text-center bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10'>
                  <div className='text-2xl font-bold text-white'>
                    {verifiedUsers}
                  </div>
                  <div className='text-sm text-gray-400'>Verified</div>
                </div>
                <div className='text-center bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10'>
                  <div className='text-2xl font-bold text-white'>
                    {usersWithAddress}
                  </div>
                  <div className='text-sm text-gray-400'>With Address</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className='flex gap-4'>
                <Button
                  asChild
                  className='bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 border-0 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200'>
                  <Link href={"/admin/users/create"}>Create New User</Link>
                </Button>
                {/* <Button
                  variant='outline'
                  className='border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-full font-semibold backdrop-blur-sm'>
                  User Analytics
                </Button> */}
              </div>
            </div>

            {/* User Cards Preview */}
            <div className='relative'>
              <div className='space-y-4'>
                {users.data?.slice(0, 3).map((user) => {
                  const roleColor = getRoleColor(user.role);
                  return (
                    <div
                      key={user.id}
                      className='bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all duration-300 group'>
                      <div className='flex items-start justify-between'>
                        <div className='flex items-center gap-3 flex-1 min-w-0'>
                          <div className='relative'>
                            <div className='w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-500 flex items-center justify-center'>
                              <span className='text-white font-semibold text-sm'>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            {user.role === "admin" && (
                              <div className='absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center'>
                                <Shield className='w-3 h-3 text-white' />
                              </div>
                            )}
                          </div>

                          <div className='flex-1 min-w-0'>
                            <div className='flex items-center gap-2 mb-1'>
                              <h3 className='font-semibold text-white text-sm group-hover:text-blue-200 transition-colors truncate'>
                                {user.name}
                              </h3>
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${roleColor.bg} ${roleColor.text} ${roleColor.border}`}>
                                {user.role}
                              </span>
                            </div>

                            <div className='flex items-center gap-2 text-xs text-gray-400 mb-2'>
                              <Mail className='w-3 h-3' />
                              <span className='truncate'>{user.email}</span>
                            </div>

                            <div className='flex items-center gap-3'>
                              {/* {user.address && (
                                <div className='flex items-center gap-1 text-xs text-gray-400'>
                                  <MapPin className='w-3 h-3' />
                                  <span>{user?.address}</span>
                                </div>
                              )} */}
                              {user.paymentMethod && (
                                <div className='flex items-center gap-1 text-xs text-gray-400'>
                                  <CreditCard
                                    className={`w-3 h-3 ${getPaymentIcon(user.paymentMethod)}`}
                                  />
                                  <span>{user.paymentMethod}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Floating Elements */}
              <div className='absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-pulse'></div>
              <div className='absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-pulse delay-1000'></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <h1 className='h2-bold'>All Users</h1>
            {searchText && (
              <div className='flex items-center gap-2'>
                <span className='text-sm text-gray-600'>
                  Filtered by <i>&quot;{searchText}&quot;</i>
                </span>
                <Link href={"/admin/users"}>
                  <Button variant='outline' size='sm'>
                    Remove Filter
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className='flex items-center gap-4'>
            <div className='text-sm text-gray-600'>
              Showing {users.data?.length || 0} of {totalUsers} users
            </div>
            <Button asChild variant='outline' size={"lg"}>
              <Link
                href={"/admin/users/create"}
                className='flex items-center gap-2'>
                <Users className='w-4 h-4' />
                Create User
              </Link>
            </Button>
          </div>
        </div>

        <div className='overflow-x-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>USER ID</TableHead>
                <TableHead>USER</TableHead>
                <TableHead>EMAIL</TableHead>
                <TableHead>ROLE</TableHead>
                <TableHead>ADDRESS</TableHead>
                <TableHead>PAYMENT METHOD</TableHead>
                <TableHead>VERIFIED</TableHead>
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.data?.map((user) => {
                return (
                  <TableRow key={user.id} className='hover:bg-gray-50/50'>
                    <TableCell className='font-mono text-sm'>
                      {formatId(user.id)}
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-3'>
                        <div className='w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-500 flex items-center justify-center'>
                          <span className='text-white font-semibold text-xs'>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <div className='font-medium'>{user.name}</div>
                          <div className='text-xs text-gray-500'>
                            Joined{" "}
                            {new Date(user.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <Mail className='w-4 h-4 text-gray-400' />
                        <span className='text-sm'>{user.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.role === "admin" ? "default" : "secondary"
                        }
                        className={
                          user.role === "admin"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                            : ""
                        }>
                        {user.role === "admin" && (
                          <Shield className='w-3 h-3 mr-1' />
                        )}
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.address ? (
                        <div className='flex items-center gap-2'>
                          <MapPin className='w-4 h-4 text-green-500' />
                          <div className='text-sm'>
                            {/* <div>{user.address?.city?.toString()}</div> */}
                            <div className='text-xs text-gray-500'>
                              {/* {user.address.country} */}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <span className='text-sm text-gray-400'>
                          No address
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {user.paymentMethod ? (
                        <div className='flex items-center gap-2'>
                          <CreditCard
                            className={`w-4 h-4 ${getPaymentIcon(user.paymentMethod)}`}
                          />
                          <span className='text-sm'>{user.paymentMethod}</span>
                        </div>
                      ) : (
                        <span className='text-sm text-gray-400'>Not set</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {user.emailVerified ? (
                        <div className='flex items-center gap-2 text-green-600'>
                          <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                          <span className='text-sm'>Verified</span>
                        </div>
                      ) : (
                        <div className='flex items-center gap-2 text-yellow-600'>
                          <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
                          <span className='text-sm'>Pending</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className='flex gap-2'>
                        <Button asChild variant='outline' size='sm'>
                          <Link href={`/admin/users/${user.id}`}>
                            <SquarePen className='w-4 h-4' />
                          </Link>
                        </Button>
                        <DeleteDialog id={user.id} action={deleteUser} />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {users.totalPages > 1 && (
          <Pagination
            page={Number(page) || 1}
            totalPages={Number(users.totalPages) || 1}
          />
        )}
      </div>
    </div>
  );
};

export default UsersPage;
