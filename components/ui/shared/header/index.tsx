/** @format */
import { APP_NAME } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import Menu from "./menu";
import CategoryDrawer from "./category-drawer";
import Search from "./search";
const Header = () => {
  return (
    <header className='w-full border-b'>
      <div className='wrapper flex-between'>
        <div className='flex-start'>
          <CategoryDrawer />
          <Link href='/' className='flex-start ml-4'>
            <Image
              src='/images/logo.svg'
              alt='logo'
              width={60}
              height={60}
              priority={true}
            />
            <span className='hidden text-black lg:block font-bold text-2xl ml-3'>
              {APP_NAME}
            </span>
          </Link>
        </div>
        <Search />
        <Menu />
      </div>
    </header>
  );
};

export default Header;
