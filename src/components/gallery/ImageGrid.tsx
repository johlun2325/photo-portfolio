// src/components/gallery/ImageGrid.tsx
import Image from "next/image";
import Link from "next/link";
import { CloudinaryImage } from "@/types";
import { getOptimizedImageUrl } from "@/utils/imageOptimization";

interface ImageGridProps {
  images: CloudinaryImage[];
  categoryName?: string;
}

export const ImageGrid = ({ images, categoryName }: ImageGridProps) => {
  if (!images.length) return null;

  return (
    <div className="space-y-4">
      {categoryName && (
        <h2 className="text-2xl font-semibold text-gray-800">
          {categoryName}
        </h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <Link
            href={`/gallery/${encodeURIComponent(image.public_id)}`}
            key={image.public_id}
          >
            <div className="aspect-square relative bg-white rounded-lg overflow-hidden">
              <Image
                src={getOptimizedImageUrl(image.secure_url, 600)}
                alt=""
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                priority={index < 4}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
