import userService from "../services/userService.js";

const getAllUsers = async (req, res) => {
    const users = await userService.getAllUsers();
    res.json(users);
};

const createUser = async (req, res) => {
    const newUser = await userService.createUser(req.body);
    res.json(newUser);
};

const getUserById = async (req, res) => {
    const user = await userService.getUserById(req.body.userID);
    res.json(user);
};

const updateUser = async (req, res) => {
    const updatedUser = await userService.updateUser(req.body);
    res.json(updatedUser);
};

const deleteUser = async (req, res) => {
    await userService.deleteUser(req.body.userID);
    res.json({ message: "User deleted" });
};

const checkUser = async (req, res) => {
    const user = await userService.checkUser(req.body);
    res.json(user);
};

const getListenerById = async (req, res) => {
    const listener = await userService.getListenerById(req.body.userID);
    res.json(listener);
};

const getArtistById = async (req, res) => {
    const artist = await userService.getArtistById(req.body.userID);
    res.json(artist);
};

const getArtistNameById = async (req, res) => {
    const artistName = await userService.getArtistNameById(req.body.artistID);
    res.json(artistName);
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
