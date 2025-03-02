import { getCategoryImages } from '@/utils/cloudinary';
import { useImageRotation } from '@/hooks/useImageRotation';
import { RotatingImages } from '@/components/home/RotatingImages';
import { HomeProps } from '@/types';

export async function getStaticProps() {
  const categories = ['concert', 'landscape', 'street'];
  const initialImages = await getCategoryImages(categories);

  return {
    props: { initialImages }
  };
}

export default function Home({ initialImages }: HomeProps) {
  const { currentImages, fading } = useImageRotation(initialImages);
  
  return <RotatingImages images={currentImages} fading={fading} />;
}
