import { useState, useEffect, useCallback } from 'react';
import { CloudinaryImage, CategoryImages } from '@/types';

export function useImageRotation(categoryImages: CategoryImages) {
  const [currentImages, setCurrentImages] = useState<CloudinaryImage[]>([]);
  const [fading, setFading] = useState(false);

  const getRandomImage = useCallback((images: CloudinaryImage[]): CloudinaryImage => {
    if (!images.length) return { public_id: '', secure_url: '' };
    return images[Math.floor(Math.random() * images.length)];
  }, []);

  const updateImages = useCallback(() => {
    const newImages = [
      getRandomImage(categoryImages.concert),
      getRandomImage(categoryImages.landscape),
      getRandomImage(categoryImages.street),
    ].filter(img => img.secure_url);

    if (newImages.length === 3) {
      setCurrentImages(newImages);
    }
  }, [categoryImages, getRandomImage]);

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

  return { currentImages, fading };
}
