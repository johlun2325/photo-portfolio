import Image from 'next/image';
import Link from 'next/link';
import { CloudinaryImageDetail } from '@/types';
import { getOptimizedImageUrl } from '@/utils/imageOptimization';
import { formatImageTitle, formatImageDate } from '@/utils/imageFormatting';

interface ImageDetailProps {
  image: CloudinaryImageDetail;
}

export const ImageDetail = ({ image }: ImageDetailProps) => {
  const optimizedWidth = Math.min(image.width, 1200);
  const title = formatImageTitle(image);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="py-2 px-4 border-b border-gray-100">
          <Link 
            href="/gallery" 
            className="text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center"
          >
            <span className="mr-2">←</span>
            Back to Gallery
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
            alt={title}
            fill
            className="object-contain"
            sizes={`(max-width: 1280px) 100vw, ${optimizedWidth}px`}
            priority
          />
        </div>
        
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {title}
          </h1>
          <p className="text-gray-600 mt-2">
            Uploaded: {formatImageDate(image.created_at)}
          </p>
        </div>
      </div>
    </div>
  );
};
