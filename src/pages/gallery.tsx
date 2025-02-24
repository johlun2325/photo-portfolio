// src/pages/gallery.tsx
import { useState } from 'react';
import Image from 'next/image';

interface CloudinaryImage {
  public_id: string;
  secure_url: string;
}

const categories = [
  {
    id: 'concert',
    name: 'Konsert',
    coverImage: 'https://res.cloudinary.com/dbse0vgyf/image/upload/v1740398024/IMG_0308_kalaxd.jpg',
  },
  {
    id: 'landscape',
    name: 'Landskap',
    coverImage: 'https://res.cloudinary.com/dbse0vgyf/image/upload/v1740398061/IMG_2139_u6ztz6.jpg',
  },
  {
    id: 'street',
    name: 'Street',
    coverImage: 'https://res.cloudinary.com/dbse0vgyf/image/upload/v1740398143/DSCF3782_n3jnmc.jpg',
  }
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryImages, setCategoryImages] = useState<CloudinaryImage[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCategoryImages = async (category: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/images?category=${category}`);
      const data = await response.json();
      setCategoryImages(data.resources || []);
    } catch (error) {
      console.error('Error fetching category images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    fetchCategoryImages(categoryId);
  };

  return (
    <div className="space-y-8 p-8">
      {/* Kategori-knappar */}
      <div className="flex flex-col md:flex-row gap-4 w-full">
        {categories.map((category) => (
          <div 
            key={category.id}
            className="flex-1 relative group cursor-pointer"
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="aspect-[16/9] relative overflow-hidden rounded-lg">
              <Image
                src={category.coverImage}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className={`
                absolute inset-0 bg-black bg-opacity-30 
                flex items-center justify-center
                transition-opacity duration-300
                ${selectedCategory === category.id ? 'bg-opacity-50' : 'group-hover:bg-opacity-20'}
              `}>
                <h2 className="text-white text-2xl font-semibold">{category.name}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bildgrid för vald kategori */}
      {selectedCategory && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            {categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          
          {loading ? (
            <div className="text-center py-8">Laddar bilder...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categoryImages.map((image) => (
                <div 
                  key={image.public_id}
                  className="aspect-square relative bg-white rounded-lg overflow-hidden"
                >
                  <Image
                    src={image.secure_url}
                    alt=""
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}