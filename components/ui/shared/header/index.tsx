/** @format */
import { APP_NAME } from "@/lib/constants";
import Link from "next/link";
import Menu from "./menu";
import CategoryDrawer from "./category-drawer";
import Search from "./search";
const Header = () => {
  return (
    <header className='w-full border-b bg-black text-white '>
      <div className='wrapper flex-between'>
        <div className='flex-start'>
          <CategoryDrawer />
          <Link href='/' className='flex-start ml-4'>
            <span className='text-white text-lg lg:block font-bold md:text-2xl '>
              {APP_NAME}
            </span>
          </Link>
        </div>
        <Search />
        <div>
          <Menu />
        </div>
      </div>
    </header>
  );
};

export default Header;
