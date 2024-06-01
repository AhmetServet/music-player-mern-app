import songService from "../services/songService.js";

const getSongs = async (req, res) => {
    const songs = await songService.getSongs();
    res.json(songs);
};

const getSongsByListenerId = async (req, res) => {
    const songs = await songService.getSongsByListenerId(req.body.listenerID);
    res.json(songs);
};

const getSongsByAlbumId = async (req, res) => {
    const songs = await songService.getSongsByAlbumId(req.body.albumID);
    res.json(songs);
};

const getSongsByArtistId = async (req, res) => {
    const songs = await songService.getSongsByArtistId(req.body.artistID);
    res.json(songs);
};

const createSong = async (req, res) => {
    const newSong = await songService.createSong(req.body);
    res.json(newSong);
};

const getSongById = async (req, res) => {
    const song = await songService.getSongById(req.body.songID);
    res.json(song);
};

const updateSong = async (req, res) => {
    const updatedSong = await songService.updateSong(
        req.body.songID,
        req.body.title
    );
    res.json(updatedSong);
};

const updateSongAlbumBySongId = async (req, res) => {
    const updatedSong = await songService.updateSongAlbumBySongId(
        req.body.songID,
        req.body.albumID
    );
    res.json(updatedSong);
};

const deleteSong = async (req, res) => {
    await songService.deleteSong(req.body.songID);
    res.json({ message: "Song deleted" });
};

const getSongsInPlaylistById = async (req, res) => {
    const songs = await songService.getSongsInPlaylistById(req.body.playlistID);
    res.json(songs);
};

export default {
    getSongs,
    getSongsByListenerId,
    getSongsByArtistId,
    getSongsByAlbumId,
    createSong,
    getSongById,
    updateSong,
    updateSongAlbumBySongId,
    deleteSong,
    getSongsInPlaylistById,
};
