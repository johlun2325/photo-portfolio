export type NavItem = {
  path: string;
  label: string;
};

export interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  width?: number;
  height?: number;
}

export interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
}

export interface CloudinaryImageDetail extends CloudinaryImage {
  width: number;
  height: number;
  format: string;
  created_at: string;
  tags: string[];
}

export interface CategoryImages {
  concert: CloudinaryImage[];
  landscape: CloudinaryImage[];
  street: CloudinaryImage[];
  [key: string]: CloudinaryImage[];
}

export interface HomeProps {
  initialImages: CategoryImages;
}

export interface ImagePageProps {
  image: CloudinaryImageDetail | null;
}

/**
 * En kategori i galleriet
 */
export interface Category {
  id: string;
  name: string;
  coverImage: string;
}

/**
 * Props för galleri-sidan
 */
export interface GalleryProps {
  categories: Category[];
  initialImages: Record<string, CloudinaryImage[]>;
}

/**
 * Props för kategorilistan
 */
export interface CategoryListProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryClick: (categoryId: string) => void;
}

/**
 * Props för bildgallerikomponenten
 */
export interface ImageGalleryProps {
  categoryName: string;
  images: CloudinaryImage[];
}
