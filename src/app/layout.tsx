import type { Metadata } from 'next';
import './globals.css';
import Image from 'next/image';
import Link from 'next/link';
import { Routes } from '@/modules/common/types/routes';

export const metadata: Metadata = {
  title: 'Pet sitting calendar',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='h-full'>
      <body className='flex min-h-full flex-col bg-gradient-to-t from-violet-100 to-fuchsia-50'>
        <header>
          <nav aria-label='global' className='flex items-center justify-between p-6 lg:px-8'>
            <div className='flex lg:flex-1'>
              <div className='-m-1.5 p-1.5'>
                <span className='sr-only'>Pet sitting</span>
                <Image alt='Logo' src='/logo.png' width={30} height={30} />
              </div>
            </div>
            <div className='hidden flex-1 justify-end'>
              <Link href={Routes.login} className='text-sm/6 font-semibold text-gray-900'>
                Log in <span aria-hidden='true'>&rarr;</span>
              </Link>
            </div>
          </nav>
        </header>
        <main className='grow'>{children}</main>
      </body>
    </html>
  );
}
