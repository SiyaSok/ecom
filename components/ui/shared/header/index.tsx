/** @format */
import { APP_NAME } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import Menu from "./menu";
const Header = () => {
  return (
    <header className='w-full border-b'>
      <div className='wrapper flex-between'>
        <div className='flex-start'>
          <Link href='/' className='flex-start'>
            <Image
              src='/images/logo.svg'
              alt='logo'
              width={48}
              height={48}
              priority={true}
            />
            <span className='hidden text-black lg:block font-bold text-2xl ml-3'>
              {APP_NAME}
            </span>
          </Link>
        </div>
        <Menu />
      </div>
    </header>
  );
};

export default Header;
