/** @format */

const Footer = () => {
  return (
    <footer className='bg-black text-white'>
      {/* Top Section */}
      <div className='w-full px-6 md:px-12 py-6'>
        {/* Logo */}
        <div className='mb-4'>The Hanger</div>

        {/* Navigation Sections */}
        <div className=' grid grid-cols-2 md:flex md:flex-row md:flex-wrap justify-between gap-4'>
          {/* Account Section */}
          <section className='w-52'>
            <div className='mb-4 font-bold text-p3'>Account</div>
            <ul className='space-y-2'>
              <li>
                <a href='/account' className='hover:underline'>
                  Account Info
                </a>
              </li>
              <li>
                <a href='/account/orders' className='hover:underline'>
                  Orders
                </a>
              </li>
              <li>
                <a href='/users/my_account/returns' className='hover:underline'>
                  Returns
                </a>
              </li>
              <li>
                <a href='/wishlist' className='hover:underline'>
                  Wishlist
                </a>
              </li>
              <li>
                <a href='/account/settings' className='hover:underline'>
                  Notification Settings
                </a>
              </li>
              <li>
                <a href='/e-gifts' className='hover:underline'>
                  Buy Gift vouchers
                </a>
              </li>
            </ul>
          </section>

          {/* Client Concierge Section */}
          <section className='w-52'>
            <div className='mb-4 font-bold text-p3'>Client Concierge</div>
            <ul className='space-y-2'>
              <li>
                <a href='/support' className='hover:underline'>
                  Help Centre
                </a>
              </li>
              <li>
                <a href='/support/contact_us' className='hover:underline'>
                  Contact
                </a>
              </li>
              <li>
                <a href='/support/faq' className='hover:underline'>
                  FAQ
                </a>
              </li>
              <li>
                <a href='/landing/somanywaystopay' className='hover:underline'>
                  Payment Options
                </a>
              </li>
              <li>
                <a
                  href='/landing/deliverycostoptions'
                  className='hover:underline'>
                  Delivery Options
                </a>
              </li>
              <li>
                <a href='/landing/clickcollect' className='hover:underline'>
                  Click & Collect
                </a>
              </li>
              <li>
                <a href='/returns_policy' className='hover:underline'>
                  Returns Policy
                </a>
              </li>
              <li>
                <a href='/privacypolicy' className='hover:underline'>
                  Privacy Policy
                </a>
              </li>
            </ul>
          </section>

          {/* The Company Section */}
          <section className='w-52'>
            <div className='mb-4 font-bold text-p3'>The Company</div>
            <ul className='space-y-2'>
              <li>
                <a href='/about_us' className='hover:underline'>
                  About Us
                </a>
              </li>
              <li>
                <a href='/careers-info' className='hover:underline'>
                  Careers at Superbalist
                </a>
              </li>
              <li>
                <a href='/careers-tech' className='hover:underline'>
                  Tech Careers
                </a>
              </li>
              <li>
                <a href='/marketingservices' className='hover:underline'>
                  Marketing Services
                </a>
              </li>
              <li>
                <a href='/rewards-services' className='hover:underline'>
                  Corporate Gifts Vouchers
                </a>
              </li>
            </ul>
          </section>

          {/* Download App Section */}
          {/* <section className='flex flex-col gap-4 w-52'>
            <div className='font-bold text-p3'>Download the App</div>
            <div className='flex flex-col gap-2'>
              <button className='transition-transform hover:scale-105 active:scale-95'>
                <img
                  src='/app-store-badge.svg'
                  alt='Download on the App Store'
                  className='h-8'
                />
              </button>
              <button className='transition-transform hover:scale-105 active:scale-95'>
                <img
                  src='/google-play-badge.png'
                  alt='Get it on Google Play'
                  className='h-8'
                />
              </button>
            </div>
          </section> */}

          {/* Connect With Us Section */}
          <section className='w-52'>
            <div className='mb-4 font-bold text-p3'>Connect With Us</div>
            <ul className='flex justify-start gap-4 mb-6'>
              <li>
                <a
                  href='https://www.facebook.com/superbalist/'
                  target='_blank'
                  className='transition-transform hover:scale-125 active:scale-95'>
                  {/* Facebook Icon */}
                  <svg width='25' height='24' viewBox='0 0 25 24' fill='white'>
                    <path d='M21.833 12.0551C21.833 7.0545 17.8038 3 12.833 3C7.8622 3 3.83301 7.05394 3.83301 12.0551C3.83301 16.5748 7.1242 20.3211 11.4268 21V14.6724H9.14188V12.0551H11.4268V10.0605C11.4268 7.79081 12.7706 6.53756 14.8259 6.53756C15.8109 6.53756 16.8408 6.71475 16.8408 6.71475V8.94281H15.7057C14.5874 8.94281 14.2393 9.64088 14.2393 10.3569V12.0557H16.7351L16.3363 14.673H14.2393V21.0006C18.5418 20.3211 21.833 16.5754 21.833 12.0557' />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href='https://www.instagram.com/superbalist/'
                  target='_blank'
                  className='transition-transform hover:scale-125 active:scale-95'>
                  {/* Instagram Icon */}
                  <svg width='25' height='24' viewBox='0 0 25 24' fill='white'>
                    <path d='M15.7968 20.9996H9.86691C9.81066 20.99 9.75497 20.9754 9.69816 20.9709C9.1244 20.9209 8.54165 20.9203 7.97859 20.8151C5.92152 20.4292 4.60189 19.2255 4.07933 17.1813C3.8532 16.2971 3.85039 15.3886 3.84251 14.4864C3.82676 12.719 3.83014 10.9511 3.85601 9.18425C3.86557 8.49631 3.89539 7.79881 4.02083 7.12549C4.4022 5.07517 5.61158 3.76229 7.64727 3.24085C8.52028 3.01754 9.41578 3.01079 10.3062 3.0046C12.1917 2.9911 14.0778 3.01023 15.9633 3.02429C16.6653 3.02935 17.3662 3.07267 18.0507 3.24704C19.5549 3.62898 20.6585 4.5003 21.2941 5.93074C21.6524 6.73737 21.7571 7.59743 21.7925 8.46987C21.7998 8.65718 21.8195 8.84394 21.833 9.03069V14.9623C21.8234 15.0185 21.806 15.0748 21.8043 15.1305C21.7835 15.8263 21.752 16.5215 21.5821 17.201C21.1979 18.7338 20.3086 19.8498 18.8467 20.4821C18.0536 20.8252 17.2115 20.9248 16.3582 20.9597C16.1709 20.9675 15.9836 20.9867 15.7974 21.0002M20.2243 12.0148C20.2153 12.0148 20.2057 12.0148 20.1967 12.0148C20.1967 11.2588 20.2113 10.5028 20.1922 9.74731C20.1748 9.04025 20.1489 8.33093 20.0763 7.62837C20.0066 6.94943 19.7669 6.32505 19.3057 5.79968C18.6712 5.0763 17.8381 4.77255 16.9173 4.7163C15.8615 4.65161 14.8017 4.63586 13.7437 4.62292C12.6901 4.60998 11.6365 4.61448 10.5835 4.63586C9.87647 4.64992 9.16772 4.67973 8.46515 4.75173C7.78678 4.82092 7.16296 5.06111 6.63758 5.52236C5.91421 6.15686 5.61046 6.99049 5.55364 7.91187C5.48895 8.96769 5.4732 10.028 5.46027 11.0866C5.44677 12.1402 5.45127 13.1938 5.47264 14.2479C5.48727 14.955 5.51596 15.6637 5.58852 16.3668C5.65827 17.0452 5.89789 17.6696 6.35915 18.1955C6.99365 18.9189 7.82671 19.2227 8.74753 19.2789C9.80391 19.3442 10.8637 19.3599 11.9217 19.3723C12.9747 19.3852 14.0289 19.3858 15.0819 19.3588C15.8592 19.3385 16.6439 19.3233 17.4095 19.2035C18.7179 18.9982 19.6044 18.2405 19.9559 16.9411C20.0713 16.5148 20.1309 16.0636 20.1472 15.6215C20.1922 14.4206 20.2006 13.2179 20.2243 12.0164' />
                  </svg>
                </a>
              </li>
              {/* Additional social icons would go here */}
            </ul>
            <button className='w-full px-3 py-2 text-center border-2 border-white transition-transform hover:scale-110 active:scale-95'>
              <span className='uppercase font-bold text-p3'>read our blog</span>
            </button>
          </section>
        </div>
      </div>

      {/* Bottom Section */}
      <div className='w-full'>
        <section className='flex flex-col items-center justify-center gap-2 px-12 py-6 bg-neutral-900'>
          {/* Payment Methods */}
          <div className='flex gap-2 mb-4'>
            <ul className='flex flex-wrap justify-center gap-2'>
              <li className='icon icon-apple-pay'>Apple Pay</li>
              <li className='icon icon-google-pay'>Google Pay</li>
              <li className='icon icon-mastercard'>Mastercard</li>
              <li className='icon icon-visa'>Visa</li>
              {/* Additional payment methods would go here */}
            </ul>
          </div>

          {/* Legal Links */}
          <ul className='flex flex-col flex-wrap items-center justify-center gap-2 sm:flex-row sm:items-start sm:gap-6'>
            <li>
              <a href='/terms_and_conditions' className='hover:underline'>
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href='/privacypolicy' className='hover:underline'>
                Privacy Policy
              </a>
            </li>
            <li>
              <a href='/shop' className='hover:underline'>
                Shopping Glossary
              </a>
            </li>
            <li>
              <a href='/dresses-a-to-z' className='hover:underline'>
                Dresses Glossary
              </a>
            </li>
            <li>
              <a href='/sneakers-a-to-z' className='hover:underline'>
                Sneakers Glossary
              </a>
            </li>
            <li>
              <a href='/home-and-living-a-to-z' className='hover:underline'>
                Home + Living Glossary
              </a>
            </li>
            <li>
              <a href='/blackfriday-a-to-z' className='hover:underline'>
                Black Friday Glossary
              </a>
            </li>
            <li>
              <a href='/blackfriday' className='hover:underline'>
                Black Friday
              </a>
            </li>
          </ul>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
