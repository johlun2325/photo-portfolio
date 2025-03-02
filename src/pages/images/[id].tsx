import Image from 'next/image';
import Link from 'next/link';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResource } from '@/types';
import { ImagePageProps } from '@/types';
import { CloudinaryImageDetail } from '@/types';

const getOptimizedImageUrl = (url: string, width: number) => {
  return url.replace('/upload/', `/upload/w_${width},c_scale,q_auto,f_auto/`);
};

export async function getStaticPaths() {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const results = await cloudinary.search
      .expression('folder:portfolio/*')
      .execute();

    const paths = results.resources.map((image: CloudinaryResource) => ({
      params: { 
        id: image.public_id
      }
    }));

    return {
      paths,
      fallback: false
    };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return {
      paths: [],
      fallback: false
    };
  }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const result = await cloudinary.api.resource(params.id, {
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

    return {
      props: {
        image: serializedResult
      }
    };
  } catch (error) {
    console.error('Error fetching image:', error);
    return {
      props: {
        image: null
      }
    };
  }
}

export default function ImagePage({ image }: ImagePageProps) {
  if (!image) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <p className="text-gray-600">Bilden kunde inte hittas</p>
        <Link 
          href="/gallery" 
          className="text-blue-500 hover:text-blue-700 mt-4 inline-block"
        >
          ← Tillbaka till galleriet
        </Link>
      </div>
    );
  }

  const formatImageTitle = (img: CloudinaryImageDetail): string => {
    if (!img.tags?.length) return '';
    const titleTag = img.tags.find(tag => tag.startsWith('title:'));
    return titleTag ? titleTag.replace('title:', '') : '';
  };

  const optimizedWidth = Math.min(image.width, 1200);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="py-2 px-4 border-b border-gray-100">
          <Link 
            href="/gallery" 
            className="text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center"
          >
            <span className="mr-2">←</span>
            Tillbaka till galleriet
          </Link>
        </div>

        <div 
          className="relative w-full bg-gray-50"
          style={{ 
            paddingTop: `${Math.min((image.height / image.width) * 100, 75)}%`
          }}
        >
          <Image
            src={getOptimizedImageUrl(image.secure_url, optimizedWidth)}
            alt={formatImageTitle(image)}
            fill
            className="object-contain"
            sizes={`(max-width: 1280px) 100vw, ${optimizedWidth}px`}
            priority
          />
        </div>
        
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {formatImageTitle(image)}
          </h1>
          <p className="text-gray-600 mt-2">
            Uppladdad: {new Date(image.created_at).toLocaleDateString('sv-SE', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
