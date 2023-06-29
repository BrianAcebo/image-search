import { Router } from "express";
import { 
    storeAllImages, 
    storeImage, 
    returnImage, 
    createImageSchema 
} from "../../utils.js";

const router = Router()

// Store all images
router.get("/store-all", storeAllImages);

// Store an image
router.get("/store-image", storeImage);

// Return result
router.get("/return", returnImage);

// Create weaviate schema
router.get("/create-schema", createImageSchema);

export default router;