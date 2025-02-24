// src/pages/index.tsx
import Image from 'next/image';

export default function Home() {
  const featuredImages = [
    {
      id: 1,
      url: 'https://res.cloudinary.com/dbse0vgyf/image/upload/v1740352102/torsten_lj2ai9.jpg',
    },
    {
      id: 2,
      url: 'https://res.cloudinary.com/dbse0vgyf/image/upload/v1740352102/torsten_lj2ai9.jpg',
    },
    {
      id: 3,
      url: 'https://res.cloudinary.com/dbse0vgyf/image/upload/v1740352102/torsten_lj2ai9.jpg',
    }
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {featuredImages.map((image) => (
        <div 
          key={image.id}
          className="aspect-square relative bg-white rounded-lg overflow-hidden"
        >
          <Image
            src={image.url}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ))}
    </section>
  );
}