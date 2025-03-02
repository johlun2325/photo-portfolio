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
  [key: string]: CloudinaryImage[]; // Tillåter dynamiska kategorier
}

export interface HomeProps {
  initialImages: CategoryImages;
}

export interface ImagePageProps {
  image: CloudinaryImageDetail | null;
}
