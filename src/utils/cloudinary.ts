import { v2 as cloudinary } from 'cloudinary';
import { 
  CategoryImages, 
  CloudinaryResource, 
  CloudinaryImageDetail, 
  CloudinaryImage,
  Category 
} from '@/types';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function getAllImagePaths() {
  try {
    const results = await cloudinary.search
      .expression('folder:portfolio/*')
      .execute();

    return results.resources.map((image: CloudinaryResource) => ({
      params: { id: image.public_id }
    }));
  } catch (error) {
    console.error('Error fetching image paths:', error);
    return [];
  }
}

export async function getImageDetail(imageId: string): Promise<CloudinaryImageDetail | null> {
  try {
    const result = await cloudinary.api.resource(imageId, {
      resource_type: 'image',
      tags: true
    });

    const serializedResult = {
      ...result,
      created_at: result.created_at || null,
      rate_limit_reset_at: null,
      uploaded_at: null,
      last_updated: null,
    };

    Object.keys(serializedResult).forEach(key => {
      if (serializedResult[key] === undefined) {
        delete serializedResult[key];
      }
    });

    return serializedResult as CloudinaryImageDetail;
  } catch (error) {
    console.error('Error fetching image detail:', error);
    return null;
  }
}

export async function getCategoryImages(categories: string[]): Promise<CategoryImages> {
  try {
    const categoryImages = {} as CategoryImages;
    
    for (const category of categories) {
      const results = await cloudinary.search
        .expression(`folder:portfolio/${category}/*`)
        .sort_by('created_at', 'desc')
        .max_results(10)
        .execute();
        
      categoryImages[category] = results.resources as CloudinaryImage[];
    }
    
    return categoryImages;
  } catch (error) {
    console.error('Error fetching images:', error);
    

    return categories.reduce((acc, category) => {
      acc[category] = [];
      return acc;
    }, {} as CategoryImages);
  }
}

/**
 * Hämtar alla kategorier med omslagsbilder
 */
export async function getGalleryCategories(): Promise<Category[]> {
  try {
    const foldersResult = await cloudinary.api.sub_folders("portfolio");

    return Promise.all(
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
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

/**
 * Hämtar alla bilder för alla kategorier
 */
export async function getAllCategoryImages(categories: Category[]): Promise<Record<string, CloudinaryImage[]>> {
  try {
    const initialImages: Record<string, CloudinaryImage[]> = {};
    
    for (const category of categories) {
      const images = await cloudinary.search
        .expression(`folder:portfolio/${category.id}/*`)
        .sort_by("created_at", "desc")
        .max_results(100)
        .execute();
        
      initialImages[category.id] = images.resources as CloudinaryImage[];
    }
    
    return initialImages;
  } catch (error) {
    console.error("Error fetching category images:", error);
    return {};
  }
}

// Lägg till i src/utils/cloudinary.ts

/**
 * Hämtar alla kategorier med omslagsbilder
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const foldersResult = await cloudinary.api.sub_folders("portfolio");

    return await Promise.all(
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
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
