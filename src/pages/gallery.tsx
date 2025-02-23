// src/pages/gallery.tsx
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Type for our image data
interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  format: string;
  width: number;
  height: number;
}

export default function Gallery() {
  const [images, setImages] = useState<CloudinaryImage[]>([]);

  // Fetch images when component mounts
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/images");
        const data = await response.json();
        setImages(data.resources || []);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

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
        {images.map((image) => (
          <Link
            href={`/images/${image.public_id}`}
            key={image.public_id}
            className="aspect-square bg-white rounded-lg overflow-hidden hover:opacity-90 transition-opacity relative"
          >
            <Image
              src={image.secure_url}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
