import { getAllImagePaths, getImageDetail } from '@/utils/cloudinary';
import { ImageDetail } from '@/components/image/ImageDetail';
import { ImageNotFound } from '@/components/image/ImageNotFound';
import { ImagePageProps } from '@/types';

export async function getStaticPaths() {
  const paths = await getAllImagePaths();
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const image = await getImageDetail(params.id);
  return {
    props: { image }
  };
}

export default function ImagePage({ image }: ImagePageProps) {
  if (!image) {
    return <ImageNotFound />;
  }

  return <ImageDetail image={image} />;
}
