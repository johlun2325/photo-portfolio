// src/components/gallery/CategoryList.tsx
import Image from "next/image";
import { CategoryListProps } from "@/types";
import { getOptimizedImageUrl } from "@/utils/imageOptimization";

export const CategoryList = ({ 
  categories, 
  selectedCategory, 
  onCategoryClick 
}: CategoryListProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 w-full">
      {categories.map((category) => (
        <div
          key={category.id}
          className="relative group cursor-pointer"
          onClick={() => onCategoryClick(category.id)}
        >
          <div className="aspect-[3/2] relative overflow-hidden rounded-lg">
            <Image
              src={getOptimizedImageUrl(category.coverImage, 400)}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority
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
  );
};
