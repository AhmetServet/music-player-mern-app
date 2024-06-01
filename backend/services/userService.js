import db from "../db.js";

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM GeneralUsers", (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

const createUser = (userData) => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO GeneralUsers SET ?",
            [userData], // [userdata] = [username, password, userType]
            (err, results) => {
                if (err) reject(err);
                resolve("User created successfully!");
            }
        );
    });
};

const getUserById = (userID) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM GeneralUsers WHERE userID = ?",
            userID,
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
};

const updateUser = (userID, userData) => {
    return new Promise((resolve, reject) => {
        db.query(
            "UPDATE GeneralUsers SET ? WHERE userID = ?",
            [userData, userID],
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
};

const deleteUser = (userID) => {
    return new Promise((resolve, reject) => {
        db.query(
            "DELETE FROM GeneralUsers WHERE userID = ?",
            [userID],
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
};

const checkUser = (userData) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM GeneralUsers WHERE username = ? AND password = ?",
            [userData.username, userData.password],
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
};

const getListenerById = (userID) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM Listeners WHERE userID = ?",
            [userID],
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
};

const getArtistById = (userID) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM Artists WHERE userID = ?",
            [userID],
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
};

const getArtistNameById = (artistID) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT name FROM Artists WHERE artistID = ?",
            [artistID],
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
};

export default {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    checkUser,
    getListenerById,
    getArtistById,
    getArtistNameById,
};
