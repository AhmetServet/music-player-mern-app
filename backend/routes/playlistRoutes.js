import playlistController from "../controllers/playlistController.js";
import express from "express";

const router = express.Router();

router.get("/", playlistController.getPlaylists);
router.post("/", playlistController.createPlaylist);
router.get("/id", playlistController.getPlaylistById);
router.put("/id", playlistController.updatePlaylist);
router.delete("/id", playlistController.deletePlaylist);
router.post("/song", playlistController.addSongToPlaylist);
router.delete("/song", playlistController.removeSongFromPlaylist);

export default router;
