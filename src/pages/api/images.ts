import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '@/utils/cloudinary';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { category } = req.query;
  const categoryString = Array.isArray(category) ? category[0] : category;

  try {
    let expression = 'folder:portfolio/*';

    if (categoryString) {
      const fullPath = categoryString.startsWith('portfolio/') 
        ? categoryString 
        : `portfolio/${categoryString}`;
      expression = `folder:${fullPath}/*`;
    }

    const results = await cloudinary.search
      .expression(expression)
      .sort_by('created_at', 'desc')
      .execute();

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({
      error: 'Error fetching images',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
