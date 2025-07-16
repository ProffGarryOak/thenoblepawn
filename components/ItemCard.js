import Link from 'next/link';
import Image from 'next/image';

export default function ItemCard({ item }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition duration-300">
      <Link href={`/shop/${item.id}`}>
        <div className="relative h-48 w-full">
          <Image
            src={item.imageUrl || '/placeholder-item.jpg'}
            alt={item.name}
            fill
            className="object-cover hover:opacity-90 transition"
          />
          {item.isVerified && (
            <div className="absolute top-2 right-2 bg-yellow-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Verified
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/shop/${item.id}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-yellow-600 transition">{item.name}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-2">{item.category}</p>
        
        <div className="flex justify-between items-center mt-3">
          <span className="font-bold text-yellow-600">${item.price.toLocaleString()}</span>
          <button className="bg-gray-900 hover:bg-gray-800 text-white py-1 px-3 rounded text-sm transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}