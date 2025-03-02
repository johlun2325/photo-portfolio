import { CloudinaryImageDetail } from '@/types';

export const formatImageTitle = (image: CloudinaryImageDetail): string => {
  if (!image.tags?.length) return '';
  const titleTag = image.tags.find(tag => tag.startsWith('title:'));
  return titleTag ? titleTag.replace('title:', '') : '';
};

export const formatImageDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
