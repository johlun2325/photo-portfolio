// src/pages/index.tsx
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface CloudinaryImage {
  public_id: string;
  secure_url: string;
}

interface CategoryImages {
  concert: CloudinaryImage[];
  landscape: CloudinaryImage[];
  street: CloudinaryImage[];
}

export default function Home() {
  const [images, setImages] = useState<CategoryImages>({ concert: [], landscape: [], street: [] });
  const [currentImages, setCurrentImages] = useState<CloudinaryImage[]>([]);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fetchCategoryImages = async (category: string) => {
      try {
        const response = await fetch(`/api/images?category=portfolio/${category}`);
        const data = await response.json();
        return data.resources || [];
      } catch (error) {
        console.error(`Error fetching ${category} images:`, error);
        return [];
      }
    };

    const fetchAllImages = async () => {
      const [concertImages, landscapeImages, streetImages] = await Promise.all([
        fetchCategoryImages('concert'),
        fetchCategoryImages('landscape'),
        fetchCategoryImages('street'),
      ]);

      setImages({
        concert: concertImages,
        landscape: landscapeImages,
        street: streetImages,
      });

      setCurrentImages([
        getRandomImage(concertImages),
        getRandomImage(landscapeImages),
        getRandomImage(streetImages),
      ]);
    };

    fetchAllImages();
  }, []);

  const getRandomImage = (images: CloudinaryImage[]): CloudinaryImage => {
    return images[Math.floor(Math.random() * images.length)];
  };

  useEffect(() => {
    if (Object.values(images).every(arr => arr.length > 0)) {
      const interval = setInterval(() => {
        setFading(true);
        
        setTimeout(() => {
          setCurrentImages([
            getRandomImage(images.concert),
            getRandomImage(images.landscape),
            getRandomImage(images.street),
          ]);
          setFading(false);
        }, 1000);
      }, 7000);

      return () => clearInterval(interval);
    }
  }, [images]);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {currentImages.map((image, index) => (
        <div 
          key={image?.public_id || index}
          className="aspect-square relative bg-white rounded-lg overflow-hidden"
        >
          {image && (
            <Image
              src={image.secure_url}
              alt=""
              fill
              className={`
                object-cover
                transition-opacity duration-1000 ease-in-out
                ${fading ? 'opacity-0' : 'opacity-100'}
              `}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
      ))}
    </section>
  );
}
