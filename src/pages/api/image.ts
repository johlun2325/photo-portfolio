import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '@/utils/cloudinary';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Image ID is required' });
  }

  try {
    const result = await cloudinary.api.resource(id, {
      resource_type: 'image',
      prefix: 'portfolio',
      tags: true
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: 'Error fetching image',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
