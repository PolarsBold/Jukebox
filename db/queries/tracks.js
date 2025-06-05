import db from "#db/client";

export async function addTracks({ name, duration }) {
  const SQL = `INSERT INTO tracks(name, duration_ms)
    VALUES($1, $2) RETURNING *`;
  const {
    rows: [track],
  } = await db.query(SQL, [name, duration]);
  return track;
}
