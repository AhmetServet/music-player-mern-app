import express from "express";
import albumController from "../controllers/albumController.js";

const router = express.Router();

router.get("/", albumController.getAlbums);
router.post("/", albumController.createAlbum);
router.get("/id", albumController.getAlbumById);
router.put("/id", albumController.updateAlbum);
router.delete("/id", albumController.deleteAlbum);
router.post("/artist/id", albumController.getAlbumsByArtistId);

export default router;
