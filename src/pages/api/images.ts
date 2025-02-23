import type { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "@/utils/cloudinary";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const results = await cloudinary.search
      .expression("folder:portfolio/*") // you can create a folder in Cloudinary called "portfolio"
      .sort_by("created_at", "desc")
      .execute();

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({
      error: "Error fetching images",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
