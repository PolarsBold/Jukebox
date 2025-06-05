import db from "#db/client";

export async function addPlaylistTrack({ playlist_id, track_id }) {
  const SQL = `INSERT INTO playlists_tracks(playlist_id, track_id)
    VALUES($1, $2) RETURNING *`;
  const {
    rows: [playlistTrack],
  } = await db.query(SQL, [playlist_id, track_id]);
  return playlistTrack;
}

export async function getPlaylistTrack(playlistId, trackId) {
  const SQL = `SELECT * FROM playlists_tracks WHERE playlist_id = $1 AND track_id = $2`;
  const {
    rows: [playlistTrack],
  } = await db.query(SQL, [playlistId, trackId]);
  return playlistTrack;
}
