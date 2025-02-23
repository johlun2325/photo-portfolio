import { useRouter } from 'next/router';

export default function Photo() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Image container */}
      <div className="bg-white rounded-lg p-4 mb-4">
        <div className="aspect-[3/2] bg-gray-100 rounded flex items-center justify-center">
          Stor version av bild {id}
        </div>
      </div>

      {/* Image details */}
      <div className="bg-white rounded-lg p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Bild {id}
        </h1>
        <p className="text-gray-700">
          Beskrivning av bilden kommer här
        </p>
      </div>
    </div>
  );
}