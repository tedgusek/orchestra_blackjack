import Image from 'next/image';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1 className='text-5xl'> Welcome to Blackjack</h1>
      <Link
        href={'/game'}
        className='bg-green-500 p-4 fixed top-96 rounded-full drop-shadow-2xl border-4 border-white'
      >
        Start Game
      </Link>
    </main>
  );
}
