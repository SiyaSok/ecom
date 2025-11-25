/** @format */

const Footer = () => {
  return (
    <footer className='bg-gradient-to-br from-slate-900 via-black to-black text-white'>
      {/* Top Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Brand Section */}
          <div className='lg:col-span-1'>
            <div className='flex items-center gap-3 mb-6'>
              <h3 className='text-2xl font-bold'>Hanger</h3>
            </div>
            <p className='text-gray-300 mb-6'>
              Your ultimate fashion destination. Discover the latest trends with
              premium quality and exceptional service.
            </p>

            {/* Social Links */}
            <div className='flex gap-4'>
              {["Facebook", "Instagram", "Twitter", "TikTok"].map((social) => (
                <a
                  key={social}
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors'>
                  <div className='w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700'>
                    {social.charAt(0)}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className='grid grid-cols-2 gap-8 md:col-span-3'>
            {/* Account */}
            <div>
              <h4 className='font-bold text-lg mb-4'>Account</h4>
              <ul className='space-y-2'>
                {[
                  "Account Info",
                  "Orders",
                  "Returns",
                  "Wishlist",
                  "Settings",
                  "Gift Vouchers",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href='#'
                      className='text-gray-300 hover:text-white transition-colors'>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className='font-bold text-lg mb-4'>Support</h4>
              <ul className='space-y-2'>
                {[
                  "Help Centre",
                  "Contact Us",
                  "FAQ",
                  "Payment Options",
                  "Delivery Info",
                  "Returns Policy",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href='#'
                      className='text-gray-300 hover:text-white transition-colors'>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className='font-bold text-lg mb-4'>Company</h4>
              <ul className='space-y-2'>
                {[
                  "About Us",
                  "Careers",
                  "Tech Careers",
                  "Marketing",
                  "Corporate Gifts",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href='#'
                      className='text-gray-300 hover:text-white transition-colors'>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className='font-bold text-lg mb-4'>Contact</h4>
              <div className='space-y-3 text-gray-300'>
                <div className='flex items-center gap-2'>
                  <svg
                    className='h-4 w-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                    />
                  </svg>
                  <span>+27 11 123 4567</span>
                </div>
                <div className='flex items-center gap-2'>
                  <svg
                    className='h-4 w-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    />
                  </svg>
                  <span>hello@thehanger.co.za</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className='border-t border-gray-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <div className='text-gray-400 text-sm'>
              © {new Date().getFullYear()} The Hanger. All rights reserved.
            </div>

            <div className='flex gap-6 text-sm'>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors'>
                Terms
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors'>
                Privacy
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors'>
                Cookies
              </a>
            </div>

            <div className='flex gap-4'>
              {["Visa", "Mastercard", "Apple Pay"].map((method) => (
                <div
                  key={method}
                  className='text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded'>
                  {method}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
