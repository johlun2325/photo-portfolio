import { v2 as cloudinary } from 'cloudinary';
import { 
  CategoryImages, 
  CloudinaryResource, 
  CloudinaryImageDetail, 
  CloudinaryImage 
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

    // Ta bort undefined-värden
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

/**
 * Hämtar bilder för alla angivna kategorier
 */
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
    
    // Skapa ett tomt objekt med alla kategorier
    return categories.reduce((acc, category) => {
      acc[category] = [];
      return acc;
    }, {} as CategoryImages);
  }
}
