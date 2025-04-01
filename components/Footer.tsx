/** @format */

import { APP_NAME } from "@/lib/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='border-t'>
      <div className='px-5 flex-center'>
        {currentYear}.{APP_NAME}. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
