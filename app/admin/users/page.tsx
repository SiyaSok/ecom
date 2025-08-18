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
import { SquarePen } from "lucide-react";
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
  return (
    <div className='space-y-2'>
      <h2 className='h2-bold'>All Users</h2>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>EMAIL</TableHead>
              <TableHead>ROLE</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.data?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{formatId(user.id)}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.role === "admin" ? (
                    <Badge variant='default'>Admin</Badge>
                  ) : (
                    <Badge variant='secondary'>User</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Button asChild variant='outline' size='sm'>
                    <Link href={`/admin/users/${user.id}`}>
                      <SquarePen />
                    </Link>
                  </Button>
                  <DeleteDialog id={user.id} action={deleteUser} />
                </TableCell>
              </TableRow>
            ))}
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
  );
};

export default UsersPage;
