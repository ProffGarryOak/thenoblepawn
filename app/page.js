import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { SignInButton, SignUpButton, SignedIn, SignedOut, afterSignInUrl, afterSignUpUrl } from '@clerk/nextjs';

const HomePage = () => {
  const featuredItems = [
    {
      id: 1,
      name: 'Vintage Rolex Submariner',
      price: 12500,
      image: '/watch.png',
      category: 'Watches',
      verified: true
    },
    {
      id: 2,
      name: 'Antique Ezyptian Vase',
      price: 3500,
      image: '/vase.png',
      category: 'Home Decor',
      verified: true
    },
    {
      id: 3,
      name: 'Signed Beatles Album',
      price: 8500,
      image: '/album.png',
      category: 'Collectibles',
      verified: true
    },
    {
      id: 4,
      name: 'Art Deco Diamond Ring',
      price: 6200,
      image: '/ring.png',
      category: 'Jewelry',
      verified: true
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f4e8]">
     
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-[#4a0f0f] text-[#f0d700] py-20">
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-cinzel font-bold mb-6">
                The Noble Pawn Experience
              </h1>
              <p className="text-xl font-playfair mb-8">
                Buy, sell, and authenticate rare and vintage treasures with royal treatment
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/shop" className="bg-[#d4af37] hover:bg-gold-700 text-[#3a0a0a] font-bold py-3 px-6 rounded font-playfair transition">
                  Shop Verified Items
                </Link>
                <Link href="/sell" className="border-2 border-[#d4af37] hover:bg-gold-600/20 text-[#f0d700] font-bold py-3 px-6 rounded font-playfair transition">
                  Sell Your Treasure
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-[#f8f4e8]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-cinzel font-bold text-center mb-12 text-[#3a0a0a]">
              <span className="border-b-2 border-[#d4af37] pb-2">How It Works</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-gold-600">
                <div className="text-[#d4af37] mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl text-[#d4af37]  font-cinzel font-semibold text-center mb-3">Submit Your Item</h3>
                <p className="text-gray-700 font-playfair text-center">
                  Upload details and photos of your item. Our AI and expert team will evaluate its authenticity and value.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-gold-600">
                <div className="text-[#d4af37]  mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-cinzel text-[#d4af37] font-semibold text-center mb-3">Verification & Pricing</h3>
                <p className="text-gray-700 font-playfair text-center">
                  Pay a small fee for our authentication service. Once verified, we&apos;ll help you set the perfect price.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-gold-600">
                <div className="text-gold-600 text-[#d4af37]  mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-cinzel text-[#d4af37]  font-semibold text-center mb-3">Sell With Confidence</h3>
                <p className="text-gray-700 font-playfair text-center">
                  Your item is listed with our royal seal of approval. When it sells, we handle payment and shipping.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Items */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-cinzel font-bold text-center mb-4 text-[#3a0a0a]">
              <span className="border-b-2 border-gold-600 pb-2">Royal Verified Treasures</span>
            </h2>
            <p className="text-center mb-12 font-playfair max-w-2xl mx-auto text-[#4a0f0f]">
              Each item in our collection has been meticulously authenticated by our experts and AI technology.
            </p>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredItems.map((item) => (
                <div key={item.id} className="bg-[#f8f4e8] rounded-lg overflow-hidden shadow-md border border-gold-200 hover:shadow-lg transition">
                  <div className="relative h-48">
                    <Image 
                      src={item.image}
                      alt={item.name}
                      layout="fill"
                      objectFit="contain"
                      className="hover:opacity-90 transition"
                    />
                    {item.verified && (
                      <div className="absolute top-2 right-2 bg-[#d4af37] text-white text-xs font-bold px-2 py-1 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Verified
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-cinzel font-semibold text-lg mb-1 text-[#4a0f0f]">{item.name}</h3>
                    <p className="text-[#044e3f] font-playfair text-sm mb-2">{item.category}</p>
                    <p className="font-bold text-[#d4af37] font-playfair">${item.price.toLocaleString()}</p>
                    <button className="mt-3 w-full bg-[#3a0a0a] hover:bg-[#4a0f0f] text-white py-2 px-4 rounded font-playfair transition">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link href="/shop" className="inline-block bg-[#d4af37] hover:bg-gold-700 text-[#3a0a0a] font-bold py-3 px-8 rounded font-playfair transition">
                Browse All Treasures
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-[#f8f4e8] text-[#f0d700]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-cinzel font-bold text-center mb-12">
              <span className="text-[#3a0a0a] border-b-2 border-[#d4af37] pb-2">Royal Testimonials</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-[#fff] p-6 shadow-md rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#d4af37] flex items-center justify-center text-[#3a0a0a] font-bold mr-4">
                    JD
                  </div>
                  <div>
                    <h4 className="font-cinzel text-[#d4af37] font-semibold">James D.</h4>
                    <div className="flex text-[#3a0a0a]">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="font-playfair italic text-gray-700">
                  &quot;Sold my grandfather&apos;s pocket watch through Royal Pawn and got 30% more than local dealers offered. The authentication process gave buyers confidence and the platform was easy to use.&quot;
                </p>
              </div>
              
              <div className="bg-[#fff] p-6 shadow-md rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#d4af37] flex items-center justify-center text-[#3a0a0a] font-bold mr-4">
                    SM
                  </div>
                  <div>
                    <h4 className="font-cinzel font-semibold text[#d4af37]">Sarah M.</h4>
                    <div className="flex text-[#3a0a0a]">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="font-playfair italic text-gray-700">
                  &quot;As a collector, I appreciate the rigorous verification process. I&apos;ve purchased several items knowing they&apos;re genuine. The royal treatment makes buying high-value items online stress-free.&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#4a0f0f] text-[#f0d700]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-cinzel font-bold mb-6">Ready to Discover or Sell Treasures?</h2>
            <p className="text-xl font-playfair mb-8 max-w-2xl mx-auto">
              Join our royal community of collectors, enthusiasts, and sellers today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <SignedOut>
                <SignUpButton afterSignUpUrl="/dashboard" mode="modal">
                  <button className="bg-[#d4af37] hover:bg-gold-700 text-[#3a0a0a] font-bold py-3 px-8 rounded font-playfair transition">Create Account</button>
                </SignUpButton>
                <SignInButton afterSignInUrl="/dashboard" mode="modal">
                  <button className="border-2 border-[#d4af37] hover:bg-gold-600/20 text-[#f0d700] font-bold py-3 px-8 rounded font-playfair transition">Sign In</button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <a href="/dashboard" className="bg-[#d4af37] hover:bg-gold-700 text-[#3a0a0a] font-bold py-3 px-8 rounded font-playfair transition">Go to Dashboard</a>
              </SignedIn>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default HomePage;