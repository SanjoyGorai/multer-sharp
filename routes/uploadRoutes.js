// routes/uploadRoutes.js

import express from "express";
import { upload } from "../middlewares/multerMiddleware.js";
import { uploadAndConvertImage } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/upload-image", upload.single("image"), uploadAndConvertImage);

export default router;
