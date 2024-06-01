import albumService from "../services/albumService.js";

const getAlbums = async (req, res) => {
    const albums = await albumService.getAlbums();
    res.json(albums);
};

const createAlbum = async (req, res) => {
    const newAlbum = await albumService.createAlbum(req.body);
    res.json(newAlbum);
};

const getAlbumById = async (req, res) => {
    const album = await albumService.getAlbumById(req.body.albumID);
    res.json(album);
};

const updateAlbum = async (req, res) => {
    const updatedAlbum = await albumService.updateAlbum(
        req.body.albumID,
        req.body.title
    );
    res.json(updatedAlbum);
};

const deleteAlbum = async (req, res) => {
    await albumService.deleteAlbum(req.body.albumID);
    res.json({ message: "Album deleted" });
};

const getAlbumsByArtistId = async (req, res) => {
    const albums = await albumService.getAlbumsByArtistId(req.body.artistID);
    res.json(albums);
};

export default {
    getAlbums,
    createAlbum,
    getAlbumById,
    updateAlbum,
    deleteAlbum,
    getAlbumsByArtistId,
};
