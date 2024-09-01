// controllers/uploadController.js

import path from "path";
import sharp from "sharp";
import fsExtra from "fs-extra";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadAndConvertImage = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Log file details to help with debugging
    console.log("Received file:", file.originalname);
    console.log("File buffer length:", file.buffer.length);

    // Set up the destination path for the converted image
    const outputFileName = `${Date.now()}-${
      file.originalname.split(".")[0]
    }.webp`;
    const outputPath = path.join(__dirname, "../uploads", outputFileName);

    // Convert the image to WebP format using sharp and save it to the uploads folder
    await sharp(file.buffer).webp({ quality: 80 }).toFile(outputPath);

    // Respond with the path of the converted image
    res.status(200).json({
      message: "Image uploaded and converted to WebP successfully",
      filePath: outputPath,
    });
  } catch (error) {
    console.error("Error during image processing:", error); // Log the full error details
    res.status(500).json({
      message: "An error occurred during image processing",
      error: error.message,
    });
  }
};
