import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { v2 as cloudinary } from 'cloudinary';
import { HomeProps } from '@/types';
import { CloudinaryImage } from '@/types';
import { CategoryImages } from '@/types';

const getOptimizedImageUrl = (url: string, width: number) => {
  return url.replace('/upload/', `/upload/w_${width},c_scale,q_auto,f_auto/`);
};

export async function getStaticProps() {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const categories = ['concert', 'landscape', 'street'];
    const categoryImages: CategoryImages = {
      concert: [],
      landscape: [],
      street: []
    };

    for (const category of categories) {
      const results = await cloudinary.search
        .expression(`folder:portfolio/${category}/*`)
        .sort_by('created_at', 'desc')
        .max_results(10)
        .execute();
      categoryImages[category as keyof CategoryImages] = results.resources;
    }

    return {
      props: {
        initialImages: categoryImages
      }
    };
  } catch (error) {
    console.error('Error fetching images:', error);
    return {
      props: {
        initialImages: { concert: [], landscape: [], street: [] }
      }
    };
  }
}

export default function Home({ initialImages }: HomeProps) {
  const [currentImages, setCurrentImages] = useState<CloudinaryImage[]>([]);
  const [fading, setFading] = useState(false);

  const getRandomImage = useCallback((images: CloudinaryImage[]): CloudinaryImage => {
    if (!images.length) return { public_id: '', secure_url: '' };
    return images[Math.floor(Math.random() * images.length)];
  }, []);

  const updateImages = useCallback(() => {
    const newImages = [
      getRandomImage(initialImages.concert),
      getRandomImage(initialImages.landscape),
      getRandomImage(initialImages.street),
    ].filter(img => img.secure_url);

    if (newImages.length === 3) {
      setCurrentImages(newImages);
    }
  }, [initialImages, getRandomImage]);

  useEffect(() => {
    updateImages();
    
    const interval = setInterval(() => {
      setFading(true);
      
      setTimeout(() => {
        updateImages();
        setFading(false);
      }, 1000);
    }, 7000);

    return () => clearInterval(interval);
  }, [updateImages]);

  if (!currentImages.length) {
    return <div>Loading...</div>;
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {currentImages.map((image, index) => (
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
}
