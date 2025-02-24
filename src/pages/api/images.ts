// src/pages/api/images.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '@/utils/cloudinary';
// src/pages/api/images.ts
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { category } = req.query;
  console.log('API received category:', category);

  try {
    let expression = 'folder:portfolio/*'; // Default: alla bilder i portfolio

    if (category) {
      // Inkludera portfolio i sökvägen
      expression = `folder:portfolio/${category}/*`;
    }

    console.log('Search expression:', expression);

    const results = await cloudinary.search
      .expression(expression)
      .sort_by('created_at', 'desc')
      .execute();

    console.log('Cloudinary results:', results);

    res.status(200).json(results);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      error: 'Error fetching images',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}