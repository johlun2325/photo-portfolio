import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  created_at: string;
  tags: string[];
}

export default function ImagePage() {
  const router = useRouter();
  const { id } = router.query;
  const [image, setImage] = useState<CloudinaryImage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatImageTitle = (image: CloudinaryImage | null) => {
    if (!image || !image.tags) return '';
    const titleTag = image.tags.find(tag => tag.startsWith('title:'));
    return titleTag ? titleTag.replace('title:', '') : '';
  };

  useEffect(() => {
    if (!id) return;

    const fetchImage = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/image?id=${id}`);
        if (!response.ok) throw new Error('Failed to fetch image');
        
        const data = await response.json();
        setImage(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading image');
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [id]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!image) return <div className="text-center py-8">Image not found</div>;

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="p-4">
          <Link 
            href="/gallery" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to gallery
          </Link>
        </div>

        <div className="relative w-full" style={{ 
          paddingTop: `${(image.height / image.width) * 100}%`
        }}>
          <Image
            src={image.secure_url}
            alt={formatImageTitle(image)}
            fill
            className="object-contain"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
        </div>
        
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {formatImageTitle(image)}
          </h1>
          <p className="text-gray-600 mt-2">
            Uploaded: {new Date(image.created_at).toLocaleDateString('sv-SE', {
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
