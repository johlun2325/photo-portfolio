// src/pages/index.tsx
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Arrays med bilder för varje position
const imageGroups = {
  position1: [
    'https://res.cloudinary.com/dbse0vgyf/image/upload/v1740352102/torsten_lj2ai9.jpg',
    // Lägg till fler URLs här för position 1
  ],
  position2: [
    'https://res.cloudinary.com/dbse0vgyf/image/upload/v1740352102/torsten_lj2ai9.jpg',
    // Lägg till fler URLs här för position 2
  ],
  position3: [
    'https://res.cloudinary.com/dbse0vgyf/image/upload/v1740352102/torsten_lj2ai9.jpg',
    // Lägg till fler URLs här för position 3
  ]
};

export default function Home() {
  const [currentIndices, setCurrentIndices] = useState({ position1: 0, position2: 0, position3: 0 });
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrentIndices(prev => ({
          position1: (prev.position1 + 1) % imageGroups.position1.length,
          position2: (prev.position2 + 1) % imageGroups.position2.length,
          position3: (prev.position3 + 1) % imageGroups.position3.length,
        }));
        setFading(false);
      }, 1000);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const featuredImages = [
    {
      id: 1,
      url: imageGroups.position1[currentIndices.position1],
    },
    {
      id: 2,
      url: imageGroups.position2[currentIndices.position2],
    },
    {
      id: 3,
      url: imageGroups.position3[currentIndices.position3],
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
            className={`
              object-cover
              transition-opacity duration-1000 ease-in-out
              ${fading ? 'opacity-0' : 'opacity-100'}
            `}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ))}
    </section>
  );
}