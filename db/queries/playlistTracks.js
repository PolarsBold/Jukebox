import db from "#db/client";

export async function addPlaylistTrack({ playlistId, trackId }) {
  const SQL = `INSERT INTO playlists_tracks(playlist_id, track_id)
    VALUES($1, $2) RETURNING *`;
  const {
    rows: [playlistTrack],
  } = await db.query(SQL, [playlistId, trackId]);
  return playlistTrack;
}
