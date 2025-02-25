import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

interface CloudinaryImage {
  public_id: string;
  secure_url: string;
}

interface Category {
  id: string;
  name: string;
  coverImage: string;
}

export default function Gallery() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryImages, setCategoryImages] = useState<CloudinaryImage[]>([]);
  const [loading, setLoading] = useState(false);

  const formatCategoryName = useCallback((folder: string) => {
    return folder.charAt(0).toUpperCase() + folder.slice(1);
  }, []);

  const fetchLatestImage = useCallback(async (category: string) => {
    try {
      const response = await fetch(`/api/images?category=${category}&limit=1`);
      const data = await response.json();
      return data.resources[0];
    } catch (error) {
      console.error(`Error fetching cover image for ${category}:`, error);
      return null;
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch('/api/folders');
      const data = await response.json();
      
      const categoriesWithCovers = await Promise.all(
        data.folders.map(async (folder: string) => {
          const coverImage = await fetchLatestImage(folder);
          return {
            id: folder,
            name: formatCategoryName(folder),
            coverImage: coverImage?.secure_url || ''
          };
        })
      );

      setCategories(categoriesWithCovers);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, [fetchLatestImage, formatCategoryName]);

  const fetchCategoryImages = useCallback(async (category: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/images?category=${category}`);
      const data = await response.json();
      setCategoryImages(data.resources || []);
    } catch (error) {
      console.error("Error fetching category images:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCategoryClick = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    fetchCategoryImages(categoryId);
  }, [fetchCategoryImages]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="space-y-8 p-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 w-full">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative group cursor-pointer"
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="aspect-[3/2] relative overflow-hidden rounded-lg">
              <Image
                src={category.coverImage}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div
                className={`
                absolute inset-0 bg-black bg-opacity-30 
                flex items-center justify-center
                transition-opacity duration-300
                ${
                  selectedCategory === category.id
                    ? "bg-opacity-50"
                    : "group-hover:bg-opacity-20"
                }
              `}
              >
                <h2 className="text-white text-lg font-semibold">
                  {category.name}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            {categories.find((c) => c.id === selectedCategory)?.name}
          </h2>

          {loading ? (
            <div className="text-center py-8">Load images...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categoryImages.map((image) => (
                <Link
                  href={`/images/${encodeURIComponent(image.public_id)}`}
                  key={image.public_id}
                >
                  <div className="aspect-square relative bg-white rounded-lg overflow-hidden">
                    <Image
                      src={image.secure_url}
                      alt=""
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
