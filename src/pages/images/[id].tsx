// src/pages/images/[id].tsx
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  format: string;
  width: number;
  height: number;
}

export default function ImagePage() {
  const router = useRouter();
  const { id } = router.query;
  const [image, setImage] = useState<CloudinaryImage | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchImage = async () => {
      try {
        const response = await fetch(`/api/image?id=${id}`);
        const data = await response.json();
        setImage(data);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, [id]);

  if (!image) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg">
        {/* Image container that adapts to image dimensions */}
        <div className="relative w-full" style={{ 
          paddingTop: `${(image.height / image.width) * 100}%`
        }}>
          <Image
            src={image.secure_url}
            alt=""
            fill
            className="object-contain"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
        </div>
        
        {/* Image details */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {image.public_id.split('/').pop()?.replace(/_/g, ' ')}
          </h1>
        </div>
      </div>
    </div>
  );
}