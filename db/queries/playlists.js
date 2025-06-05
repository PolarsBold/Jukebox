import db from "#db/client";

export async function addPlaylist({ name, desc }) {
  const SQL = `INSERT INTO playlists(name, description)
    VALUES($1, $2) RETURNING *`;
  const {
    rows: [playlist],
  } = await db.query(SQL, [name, desc]);
  return playlist;
}
