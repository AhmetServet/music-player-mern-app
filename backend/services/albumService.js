import db from "../db.js";

const getAlbums = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM Albums", (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

const createAlbum = (albumData) => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO Albums SET ?",
            [albumData], // [albumData] = [title, artist, releaseDate]
            (err, results) => {
                if (err) reject(err);
                resolve("Album created successfully!");
            }
        );
    });
};

const getAlbumById = (albumID) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM Albums WHERE albumID = ?",
            albumID,
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
};

const updateAlbum = (albumID, title) => {
    return new Promise((resolve, reject) => {
        db.query(
            "UPDATE Albums SET title = ? WHERE albumID = ?",
            [title, albumID],
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
};

const deleteAlbum = (albumID) => {
    return new Promise((resolve, reject) => {
        db.query(
            "DELETE FROM Albums WHERE albumID = ?",
            [albumID],
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
};

const getAlbumsByArtistId = (artistID) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM Albums WHERE artistID = ?",
            [artistID],
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
};

export default {
    getAlbums,
    createAlbum,
    getAlbumById,
    updateAlbum,
    deleteAlbum,
    getAlbumsByArtistId,
};
