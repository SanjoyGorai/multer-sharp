// middlewares/multerMiddleware.js

import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fsExtra from "fs-extra";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads folder exists
const uploadPath = path.join(__dirname, "../uploads");
fsExtra.ensureDirSync(uploadPath);

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG and PNG images are allowed"), false);
    }
  },
});
