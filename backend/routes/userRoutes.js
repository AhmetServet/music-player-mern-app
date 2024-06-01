import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.get("/id", userController.getUserById);
router.put("/id", userController.updateUser);
router.delete("/id", userController.deleteUser);
router.post("/login", userController.checkUser);
router.post("/listener/id", userController.getListenerById);
router.post("/artist/id", userController.getArtistById);
router.post("/artistName/id", userController.getArtistNameById);

export default router;
