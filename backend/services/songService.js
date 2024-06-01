import db from "../db.js";

const getSongs = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM Songs", (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

const getSongsByListenerId = (listenerID) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM Songs Where listenerID = ?",
            [listenerID],
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
};

const getSongsByArtistId = (artistID) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM Songs WHERE artistID = ?",
            [artistID],
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
};

const getSongsByAlbumId = (albumID) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM Songs WHERE albumID = ?",
            [albumID],
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
};

const createSong = async (songData) => {
    try {
        console.log("Converting MP3 to binary...");
        console.log("Song Data:", songData);

        return new Promise((resolve, reject) => {
            db.query(
                "INSERT INTO Songs SET ?",
                [songData], // [songData] = [title, duration, albumID, artistID, trackFile]
                (err, results) => {
                    if (err) reject(err);
                    resolve("Song created successfully!");
                }
            );
        });
    } catch (err) {
        throw new Error(`Error converting MP3 to binary: ${err.message}`);
    }
};

const getSongById = (songID) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM Songs WHERE songID = ?",
            [songID],
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
};

const updateSong = (songID, newSongTitle) => {
    return new Promise((resolve, reject) => {
        db.query(
            "UPDATE Songs SET title = ? WHERE songID = ?",
            [newSongTitle, songID],
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
};

const updateSongAlbumBySongId = (songID, albumID) => {
    console.log("updateSongAlbumBySongId: songID, albumID", songID, albumID);
    return new Promise((resolve, reject) => {
        db.query(
            "UPDATE Songs SET albumID = ? WHERE songID = ?",
            [albumID, songID],
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
};

const deleteSong = (songID) => {
    return new Promise((resolve, reject) => {
        db.query(
            "DELETE FROM Songs WHERE songID = ?",
            [songID],
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
};

const getSongsInPlaylistById = (playlistID) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM Contains WHERE playlistID = ?",
            [playlistID],
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
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
