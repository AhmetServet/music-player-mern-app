import playlistService from "../services/playlistService.js";

const getPlaylists = async (req, res) => {
    const playlists = await playlistService.getPlaylists();
    res.json(playlists);
};

const createPlaylist = async (req, res) => {
    const newPlaylist = await playlistService.createPlaylist(req.body);
    res.json(newPlaylist);
};

const getPlaylistById = async (req, res) => {
    const playlist = await playlistService.getPlaylistById(req.body.playlistID);
    res.json(playlist);
};

const updatePlaylist = async (req, res) => {
    const updatedPlaylist = await playlistService.updatePlaylist(
        req.body.playlistID,
        req.body.title
    );
    res.json(updatedPlaylist);
};

const deletePlaylist = async (req, res) => {
    await playlistService.deletePlaylist(req.body.playlistID);
    res.json({ message: "Playlist deleted" });
};
const addSongToPlaylist = async (req, res) => {
    const newSong = await playlistService.addSongToPlaylist(
        req.body.playlistID,
        req.body.songID
    );
    res.json(newSong);
};

const removeSongFromPlaylist = async (req, res) => {
    await playlistService.removeSongFromPlaylist(
        req.body.playlistID,
        req.body.songID
    );
    res.json({ message: "Song removed from playlist" });
};

export default {
    getPlaylists,
    createPlaylist,
    getPlaylistById,
    updatePlaylist,
    deletePlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
};
