import Link from 'next/link';

export const ImageNotFound = () => {
  return (
    <div className="max-w-2xl mx-auto p-8 text-center">
      <p className="text-gray-600">Image could not be found</p>
      <Link 
        href="/gallery" 
        className="text-blue-500 hover:text-blue-700 mt-4 inline-block"
      >
        ← Back to Gallery
      </Link>
    </div>
  );
};
