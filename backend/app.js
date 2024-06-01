import express from "express";
import userRoutes from "./routes/userRoutes.js";
import albumRoutes from "./routes/albumRoutes.js";
import songRoutes from "./routes/songRoutes.js";
import playlistRoutes from "./routes/playlistRoutes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.raw({ type: "audio/mp3", limit: "50mb" }));

app.use("/users", cors(), userRoutes);
app.use("/albums", cors(), albumRoutes);
app.use("/songs", cors(), songRoutes);
app.use("/playlists", cors(), playlistRoutes);

app.listen(process.env.DB_PORT, () => {
    console.log("Backend server is running! PORT: ", process.env.DB_PORT);
});
