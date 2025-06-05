import { getTrackById, getTracks } from "#db/queries/tracks";
import express from "express";
const tracksRouter = express.Router();
export default tracksRouter;

tracksRouter.get("/", async (req, res, next) => {
  try {
    const tracks = await getTracks();
    res.status(200).send(tracks);
  } catch (err) {
    next(err);
  }
});

tracksRouter.get("/:id", async (req, res, next) => {
  try {
    const track = await getTrackById(req.params.id);
    if (!track) {
      return res.status(404).json({ message: "track not found" });
    }
    res.status(200).send(track);
  } catch (err) {
    next(err);
  }
});
