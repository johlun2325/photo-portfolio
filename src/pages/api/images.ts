import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '@/utils/cloudinary';

interface CloudinarySearchResult {
  resources: Array<{
    public_id: string;
    secure_url: string;
    created_at: string;
    width: number;
    height: number;
  }>;
  total_count: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { category, limit } = req.query;
  const categoryString = Array.isArray(category) ? category[0] : category;
  const limitNum = limit ? parseInt(Array.isArray(limit) ? limit[0] : limit) : undefined;

  try {
    let expression = 'folder:portfolio/*';

    if (categoryString) {
      const fullPath = categoryString.startsWith('portfolio/') 
        ? categoryString 
        : `portfolio/${categoryString}`;
      expression = `folder:${fullPath}/*`;
    }

    const searchQuery = cloudinary.search
      .expression(expression)
      .sort_by('created_at', 'desc');

    if (limitNum && !isNaN(limitNum)) {
      searchQuery.max_results(limitNum);
    }

    const results = await searchQuery.execute() as CloudinarySearchResult;

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({
      error: 'Error fetching images',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
