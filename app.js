import express from "express";
const app = express();
export default app;

import tracksRouter from "#api/tracksRouter";
import playlistRouter from "#api/playlistsRouter";

app.use(express.json());

app.use("/tracks", tracksRouter);
app.use("/playlists", playlistRouter);

app.use((err, req, res, next) => {
  if (err.code === "23503") {
    return res.status(400).send(err.detail);
  }
  if (err.code === "22P02") {
    return res.status(400).send(err.message);
  }
  if (err.code === "22007") {
    return res.status(400).send(err.message);
  }
  if (err.code === "22008") {
    return res.status(400).send(err.message);
  }

  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
