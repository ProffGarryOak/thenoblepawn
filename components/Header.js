import Link from 'next/link';
import Image from 'next/image';
import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';

const Header = () => {
  return (
    <header className="bg-[#1D0505] text-[#e6c200] border-b-2 border-[#d4af37]">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="Royal Pawn Logo" 
              width={100} 
              height={100}
             
            />
            <h1 className="ml-3 text-2xl font-cinzel font-bold hidden md:block">
              The Noble Pawn
            </h1>
          </Link>
        </div>

        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="hover:text-gold-300 transition font-playfair">
            Home
          </Link>
          <Link href="/shop" className="hover:text-gold-300 transition font-playfair">
            Shop
          </Link>
          <Link href="/sell" className="hover:text-gold-300 transition font-playfair">
            Sell an Item
          </Link>
          <Link href="/about" className="hover:text-gold-300 transition font-playfair">
            Our Story
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:text-gold-300 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="p-2 hover:text-gold-300 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </button>
          
          {/* <button className="md:hidden p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button> */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton afterSignInUrl="/dashboard" mode="modal">
              <button className="px-4 py-2 rounded  text-gold-300  font-playfair hover:cursor-pointer  transition">Sign In</button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden bg-[#4a0f0f] py-2 px-4">
        <div className="flex flex-col space-y-2">
          <Link href="/" className="text-[#f0d700] hover:text-gold-200 py-1 font-playfair">
            Home
          </Link>
          <Link href="/shop" className="text-[#f0d700] hover:text-gold-200 py-1 font-playfair">
            Shop
          </Link>
          <Link href="/sell" className="text-[#f0d700] hover:text-gold-200 py-1 font-playfair">
            Sell an Item
          </Link>
          <Link href="/about" className="text-[#f0d700] hover:text-gold-200 py-1 font-playfair">
            Our Story
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;