import db from "#db/client";

export async function addPlaylist({ name, desc }) {
  const SQL = `INSERT INTO playlists(name, description)
    VALUES($1, $2) RETURNING *`;
  const {
    rows: [playlist],
  } = await db.query(SQL, [name, desc]);
  return playlist;
}

export async function getPlaylists() {
  const SQL = `SELECT * FROM playlists`;
  const { rows: playlists } = await db.query(SQL);
  return playlists;
}

export async function getPlaylistById(id) {
  const SQL = `SELECT * FROM playlists WHERE id = $1`;
  const {
    rows: [playlist],
  } = await db.query(SQL, [id]);
  return playlist;
}

export async function getTracksByPlaylist(id) {
  const SQL = `SELECT DISTINCT tracks.*
  FROM
    playlists_tracks
    JOIN tracks ON playlists_tracks.track_id = tracks.id
    JOIN playlists ON playlists_tracks.playlist_id = playlists.id
  WHERE
    playlists.id = $1`;
  const { rows: tracks } = await db.query(SQL, [id]);
  return tracks;
}

export async function addTrackByPlaylistId({
  trackId,
  trackName,
  trackRuningTime,
}) {
  const SQL = `INSERT INTO tracks(id, name, duration_ms) 
  VALUES($1, $2, $3) RETURNING *`;
  const {
    rows: [track],
  } = await db.query(SQL, [trackId, trackName, trackRuningTime]);
  return track;
}
