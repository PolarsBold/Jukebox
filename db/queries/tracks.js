import db from "#db/client";

export async function addTracks({ name, duration }) {
  const SQL = `INSERT INTO tracks(name, duration_ms)
    VALUES($1, $2) RETURNING *`;
  const {
    rows: [track],
  } = await db.query(SQL, [name, duration]);
  return track;
}

export async function getTracks() {
  const SQL = `SELECT * FROM tracks`;
  const { rows: tracks } = await db.query(SQL);
  return tracks;
}

export async function getTrackById(id) {
  const SQL = `SELECT * FROM tracks WHERE id = $1`;
  const {
    rows: [track],
  } = await db.query(SQL, [id]);
  return track;
}
