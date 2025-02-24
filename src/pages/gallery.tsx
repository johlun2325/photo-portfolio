// src/pages/gallery.tsx
import { useState } from 'react';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
  coverImage: string;
  description: string;
}

const categories: Category[] = [
  {
    id: 'concert',
    name: 'Konsert',
    coverImage: 'https://res.cloudinary.com/dbse0vgyf/image/upload/v1740352102/torsten_lj2ai9.jpg',
    description: 'Konsertfotografering'
  },
  {
    id: 'landscape',
    name: 'Landskap',
    coverImage: 'https://res.cloudinary.com/dbse0vgyf/image/upload/v1740352102/torsten_lj2ai9.jpg',
    description: 'Landskapsfotografering'
  },
  {
    id: 'street',
    name: 'Street',
    coverImage: 'https://res.cloudinary.com/dbse0vgyf/image/upload/v1740352102/torsten_lj2ai9.jpg',
    description: 'Streetfotografering'
  }
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="space-y-8 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800">Gallery</h1>
      
      {/* Kategori-container */}
      <div className="flex flex-col md:flex-row gap-4 w-full">
        {categories.map((category) => (
          <div 
            key={category.id}
            className="flex-1 relative group cursor-pointer"
            onClick={() => setSelectedCategory(category.id)}
          >
            <div className="aspect-[16/9] relative overflow-hidden rounded-lg">
              <Image
                src={category.coverImage}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Overlay med kategorinamn */}
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-opacity duration-300 group-hover:bg-opacity-20">
                <h2 className="text-white text-2xl font-semibold">
                  {category.name}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Bildgrid för vald kategori */}
      {selectedCategory && (
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800">
            {categories.find(c => c.id === selectedCategory)?.name}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Här kommer bilderna för vald kategori senare */}
            <div className="aspect-square bg-gray-100 rounded-lg"></div>
            <div className="aspect-square bg-gray-100 rounded-lg"></div>
            <div className="aspect-square bg-gray-100 rounded-lg"></div>
          </div>
        </div>
      )}
    </div>
  );
}