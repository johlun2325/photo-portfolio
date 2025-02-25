import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { v2 as cloudinary } from "cloudinary";

interface CloudinaryImage {
  public_id: string;
  secure_url: string;
}

interface Category {
  id: string;
  name: string;
  coverImage: string;
}

interface GalleryProps {
  categories: Category[];
  initialImages: Record<string, CloudinaryImage[]>;
}

const getOptimizedImageUrl = (url: string, width: number) => {
  return url.replace("/upload/", `/upload/w_${width},c_scale,q_auto,f_auto/`);
};

export async function getStaticProps() {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const foldersResult = await cloudinary.api.sub_folders("portfolio");

    const categoriesWithImages = await Promise.all(
      foldersResult.folders.map(async (folder: { name: string }) => {
        const images = await cloudinary.search
          .expression(`folder:portfolio/${folder.name}/*`)
          .sort_by("created_at", "desc")
          .max_results(1)
          .execute();

        return {
          id: folder.name,
          name: folder.name.charAt(0).toUpperCase() + folder.name.slice(1),
          coverImage: images.resources[0]?.secure_url || "",
        };
      })
    );

    const initialImages: Record<string, CloudinaryImage[]> = {};
    for (const category of categoriesWithImages) {
      const images = await cloudinary.search
        .expression(`folder:portfolio/${category.id}/*`)
        .sort_by("created_at", "desc")
        .max_results(100)
        .execute();
      initialImages[category.id] = images.resources;
    }

    return {
      props: {
        categories: categoriesWithImages,
        initialImages,
      },
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        categories: [],
        initialImages: {},
      },
    };
  }
}

export default function Gallery({ categories, initialImages }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryImages, setCategoryImages] = useState<CloudinaryImage[]>([]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCategoryImages(initialImages[categoryId] || []);
  };

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

      {selectedCategory && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            {categories.find((c) => c.id === selectedCategory)?.name}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categoryImages.map((image, index) => (
              <Link
                href={`/images/${encodeURIComponent(image.public_id)}`}
                key={image.public_id}
              >
                <div className="aspect-square relative bg-white rounded-lg overflow-hidden">
                  <Image
                    src={getOptimizedImageUrl(image.secure_url, 600)}
                    alt=""
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    priority={index < 4}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
