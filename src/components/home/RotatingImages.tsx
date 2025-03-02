import Image from 'next/image';
import { CloudinaryImage } from '@/types';
import { getOptimizedImageUrl } from '@/utils/imageOptimization';

interface RotatingImagesProps {
  images: CloudinaryImage[];
  fading: boolean;
}

export const RotatingImages = ({ images, fading }: RotatingImagesProps) => {
  if (!images.length) {
    return <div>Loading...</div>;
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div 
          key={image.public_id || index}
          className="aspect-square relative bg-white rounded-lg overflow-hidden"
        >
          {image.secure_url && (
            <Image
              src={getOptimizedImageUrl(image.secure_url, 800)}
              alt=""
              fill
              className={`
                object-cover
                transition-opacity duration-1000 ease-in-out
                ${fading ? 'opacity-0' : 'opacity-100'}
              `}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={true}
            />
          )}
        </div>
      ))}
    </section>
  );
};
