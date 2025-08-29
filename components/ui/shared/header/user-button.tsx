/** @format */
import { auth } from "@/auth";
import { signOutUser } from "@/lib/actions/user.action";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  BringToFront,
  Heart,
  LogOut,
  Target,
  User,
  UserIcon,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const UserButton = async () => {
  const session = await auth();

  if (!session?.user) {
    return (
      <Button asChild variant='ghost' size='sm' className='gap-2'>
        <Link href='/sign-in'>
          <UserIcon className='h-4 w-4' />
          Sign In
        </Link>
      </Button>
    );
  }

  const { user } = session;
  const firstInitial = user.name?.charAt(0).toUpperCase() ?? "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='relative h-8 w-8 rounded-full border bg-white font-bold text-black hover:bg-gray-100 mt-1'>
          <Avatar className='h-8 w-8'>
            <AvatarFallback>{firstInitial}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='p-3'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none truncate'>
              {user.name}
            </p>
            <p className='text-xs text-muted-foreground leading-none truncate'>
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            href='/user/profile'
            className='flex w-full items-center gap-2 p-2 hover:bg-accent hover:text-accent-foreground'>
            <User className='h-4 w-4' />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href='/wishlist'
            className='flex w-full items-center gap-2 p-2 hover:bg-accent hover:text-accent-foreground'>
            <Heart className='h-4 w-4' />
            Wishlist
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href='/user/orders'
            className='flex w-full items-center gap-2 p-2 hover:bg-accent hover:text-accent-foreground'>
            <BringToFront className='h-4 w-4' />
            Orders
          </Link>
        </DropdownMenuItem>

        {user.role === "admin" && (
          <DropdownMenuItem asChild>
            <Link
              href='/admin/overview'
              className='flex w-full items-center gap-2 p-2 hover:bg-accent hover:text-accent-foreground'>
              <Target className='h-4 w-4' />
              Admin
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <form action={signOutUser} className='w-full'>
            <Button
              type='submit'
              variant='ghost'
              className='w-full justify-start px-2 py-1.5 text-sm'
              size='sm'>
              <LogOut className='mr-2 h-4 w-4' />
              Sign Out
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
