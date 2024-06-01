import db from "../db.js";

const getPlaylists = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM Playlists", (err, playlists) => {
            if (err) reject(err);
            const playlistPromises = playlists.map((playlist) => {
                return new Promise((resolve, reject) => {
                    db.query(
                        "SELECT * FROM Contains WHERE playlistID = ?",
                        [playlist.playlistID],
                        (err, songs) => {
                            if (err) reject(err);
                            const playlistWithSongs = {
                                ...playlist,
                                songs,
                            };
                            resolve(playlistWithSongs);
                        }
                    );
                });
            });
            Promise.all(playlistPromises)
                .then((results) => {
                    resolve(results);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    });
};

const createPlaylist = (playlistData) => {
    return new Promise((resolve, reject) => {
        const { listenerID, title, songs } = playlistData;
        db.query(
            "INSERT INTO Playlists SET ?",
            { listenerID: listenerID, title: title },
            (err, results) => {
                if (err) return reject(err);

                const playlistID = results.insertId;
                const songPromises = songs.map((songID) => {
                    return new Promise((resolve, reject) => {
                        db.query(
                            "INSERT INTO Contains SET ?",
                            { playlistID: playlistID, songID: songID },
                            (err, results) => {
                                if (err) return reject(err);
                                resolve();
                            }
                        );
                    });
                });

                Promise.all(songPromises)
                    .then(() => {
                        resolve({
                            message: "Playlist created successfully!",
                            playlistID: playlistID,
                        });
                    })
                    .catch((err) => {
                        reject(err);
                    });
            }
        );
    });
};

const getPlaylistById = (playlistID) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM Playlists WHERE playlistID = ?",
            playlistID,
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
};

const updatePlaylist = (playlistID, playlistData) => {
    return new Promise((resolve, reject) => {
        db.query(
            "UPDATE Playlists SET title = ? WHERE playlistID = ?",
            [playlistData, playlistID],
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
};

const deletePlaylist = (playlistID) => {
    return new Promise((resolve, reject) => {
        db.query(
            "DELETE FROM Playlists WHERE playlistID = ?",
            [playlistID],
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
};

const addSongToPlaylist = (playlistID, songID) => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO Contains SET ?",
            { playlistID: playlistID, songID: songID },
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
};

const removeSongFromPlaylist = (playlistID, songID) => {
    return new Promise((resolve, reject) => {
        db.query(
            "DELETE FROM Contains WHERE playlistID = ? AND songID = ?",
            [playlistID, songID],
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
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
