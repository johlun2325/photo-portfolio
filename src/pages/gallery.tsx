import Link from 'next/link';
{/*import Image from 'next/image'; // We'll need this later for real images*/}

export default function Gallery() {
  return (
    <div className="space-y-8">
      {/* Category Filters */}
      <div className="flex gap-4 justify-center">
        <button className="px-4 py-2 bg-white rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
          Kategori 1
        </button>
        <button className="px-4 py-2 bg-white rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
          Kategori 2
        </button>
        <button className="px-4 py-2 bg-white rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
          Kategori 3
        </button>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(12)].map((_, index) => (
          <Link 
            href={`/images/${index + 1}`} 
            key={index}
            className="aspect-square bg-white rounded-lg overflow-hidden hover:opacity-90 transition-opacity relative" // added relative for Image component
          >
            {/* This structure will work with both placeholders and real images later */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Bild {index + 1}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}