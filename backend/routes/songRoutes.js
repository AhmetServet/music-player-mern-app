import songController from "../controllers/songController.js";
import express from "express";

const router = express.Router();

router.get("/", songController.getSongs);
router.post("/listener", songController.getSongsByListenerId);
router.post("/artist", songController.getSongsByArtistId);
router.post("/album", songController.getSongsByAlbumId);
router.post("/", songController.createSong);
router.post("/id", songController.getSongById);
router.put("/id", songController.updateSong);
router.put("/album/id", songController.updateSongAlbumBySongId);
router.delete("/id", songController.deleteSong);
router.get("/playlist/id", songController.getSongsInPlaylistById);

export default router;
