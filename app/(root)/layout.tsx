/** @format */

import Footer from "@/components/Footer";
import Header from "@/components/ui/shared/header";
import CollectionsMenu from "@/components/ui/shared/header/collections-menu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex h-screen flex-col'>
      <Header />
      <CollectionsMenu />
      <main className='flex-1 wrapper'>{children}</main>
      <Footer />
    </div>
  );
}
