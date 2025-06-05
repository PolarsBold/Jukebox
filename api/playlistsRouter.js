import {
  addPlaylist,
  addTrackByPlaylistId,
  getPlaylistById,
  getPlaylists,
  getTracksByPlaylist,
} from "#db/queries/playlists";
import { addPlaylistTrack, getPlaylistTrack } from "#db/queries/playlistTracks";
import { getTrackById } from "#db/queries/tracks";
import express from "express";
const playlistRouter = express.Router();
export default playlistRouter;

playlistRouter
  .get("/", async (req, res) => {
    const playlists = await getPlaylists();
    res.status(200).send(playlists);
  })
  .post("/", async (req, res, next) => {
    try {
      if (!req.body || !req.body.name || !req.body.description) {
        return res.status(400).json({ message: "missing body" });
      }
      const newPlaylist = await addPlaylist({
        name: req.body.name,
        desc: req.body.description,
      });
      res.status(201).json(newPlaylist);
    } catch (err) {
      next(err);
    }
  });

playlistRouter.get("/:id", async (req, res) => {
  const playlist = await getPlaylistById(req.params.id);
  if (!playlist) {
    return res.status(404).json({ message: "playlist does not exist" });
  }
  res.status(200).send(playlist);
});

playlistRouter
  .get("/:id/tracks", async (req, res) => {
    if (isNaN(Number(req.params.id))) {
      return res.status(400).json({ message: "id is not a number" });
    }
    if (Number(req.params.id) <= 0 || Number(req.params.id) > 11) {
      return res
        .status(404)
        .json({ message: "playlist or tracks do not exist" });
    }
    const tracks = await getTracksByPlaylist(req.params.id);
    res.status(200).send(tracks);
  })
  .post("/:id/tracks", async (req, res, next) => {
    try {
      if (!req.body) {
        return res.status(400).json({ message: "body is missing" });
      }
      const playlistId = Number(req.params.id);
      const trackId = Number(req.body.trackId);
      if (isNaN(playlistId) || isNaN(trackId)) {
        return res
          .status(400)
          .json({ message: "playlist id or track id are not numbers" });
      }
      if (!trackId) {
        return res.status(400).json({ message: "track id is missing" });
      }
      const playlist = await getPlaylistById(playlistId);
      if (!playlist) {
        return res.status(404).json({ message: "playlist does not exist" });
      }
      const track = await getTrackById(trackId);
      if (!track) {
        return res.status(400).json({ message: "track does not exist" });
      }
      const playlistTrack = await getPlaylistTrack(playlistId, trackId);
      if (playlistTrack) {
        return res.status(400).json({ message: "track already in playlist" });
      }
      console.log("playlistId:", playlistId);
      console.log("trackId:", trackId);
      console.log("playlist:", playlist);
      console.log("track:", track);
      console.log("playlistTrack:", playlistTrack);
      const newPlaylistTrack = await addPlaylistTrack({
        playlist_id: playlistId,
        track_id: trackId,
      });
      res.status(201).json({
        ...newPlaylistTrack,
        message: "track successfully added",
      });
    } catch (err) {
      next(err);
    }
  });
