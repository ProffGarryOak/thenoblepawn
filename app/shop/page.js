import Link from 'next/link';
import ItemCard from '@/components/ItemCard';

async function getItems() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items`, {
      next: { revalidate: 60 } 
    });

    if (!res.ok) {
      throw new Error('Failed to fetch items');
    }

    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error('Error fetching items:', error);
    return [];
  }
}

export default async function ShopPage() {
  const items = await getItems();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-[#4a0f0f] text-yellow-500 py-20">
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
              Royal Verified Treasures
            </h1>
            <p className="text-xl mb-8 font-serif">
              Each item authenticated by our experts and AI technology
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Filters and Sorting */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select className="block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-yellow-500">
                  <option>All Categories</option>
                  <option>Jewelry</option>
                  <option>Watches</option>
                  <option>Collectibles</option>
                  <option>Art & Antiques</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <select className="block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-yellow-500">
                  <option>Sort by: Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Most Popular</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="text-gray-600">
              Showing {items.length} {items.length === 1 ? 'item' : 'items'}
            </div>
          </div>

          {/* Items Grid */}
          {items.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No items found</h3>
              <p className="text-gray-500 mb-4">We couldn&apos;t find any items matching your criteria</p>
              <Link href="/sell" className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded">
                Sell Your First Item
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {items.length > 0 && (
            <div className="flex justify-center mt-12">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-100">
                  Previous
                </button>
                <button className="px-3 py-1 rounded bg-yellow-600 text-white">
                  1
                </button>
                <button className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-100">
                  2
                </button>
                <button className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-100">
                  3
                </button>
                <span className="px-2 text-gray-500">...</span>
                <button className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-100">
                  8
                </button>
                <button className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-100">
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
