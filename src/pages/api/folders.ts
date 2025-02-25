import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '@/utils/cloudinary';

interface CloudinaryFolder {
  name: string;
  path: string;
  created_at: string;
}

interface CloudinaryFolderResult {
  folders: CloudinaryFolder[];
  total_count: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await cloudinary.api.sub_folders('portfolio') as CloudinaryFolderResult;
    const folders = result.folders.map((folder) => folder.name);
    
    res.status(200).json({ folders });
  } catch (error) {
    res.status(500).json({
      error: 'Error fetching folders',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
