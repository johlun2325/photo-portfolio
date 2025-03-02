// src/pages/gallery/index.tsx
import { useState } from "react";
import { getCategories, getAllCategoryImages } from "@/utils/cloudinary";
import { CategoryList } from "@/components/gallery/CategoryList";
import { ImageGrid } from "@/components/gallery/ImageGrid";
import { GalleryProps, CloudinaryImage } from "@/types";

export async function getStaticProps() {
  const categories = await getCategories();
  const initialImages = await getAllCategoryImages(categories);

  return {
    props: {
      categories,
      initialImages,
    },
  };
}

export default function Gallery({ categories, initialImages }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryImages, setCategoryImages] = useState<CloudinaryImage[]>([]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCategoryImages(initialImages[categoryId] || []);
  };

  const selectedCategoryName = categories.find(
    c => c.id === selectedCategory
  )?.name;

  return (
    <div className="space-y-8 p-8">
      <CategoryList 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onCategoryClick={handleCategoryClick} 
      />

      {selectedCategory && (
        <ImageGrid 
          images={categoryImages} 
          categoryName={selectedCategoryName} 
        />
      )}
    </div>
  );
}
