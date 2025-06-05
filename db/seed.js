import db from "#db/client";
import { addPlaylist } from "#db/queries/playlists";
import { addPlaylistTrack } from "#db/queries/playlistTracks";
import { addTracks } from "#db/queries/tracks";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i <= 10; i++) {
    const desc = "playlist description";
    let playlistName = `playlist` + i;
    let playlistObject = { name: playlistName, desc: desc };
    await addPlaylist(playlistObject);
  }

  for (let i = 1; i <= 20; i++) {
    let trackName = `track` + i;
    let trackDuration = Math.floor(Math.random() * 180000);
    let trackObject = { name: trackName, duration: trackDuration };
    await addTracks(trackObject);
  }

  for (let i = 1; i <= 15; i++) {
    let playlistId = Math.floor(Math.random() * 10);
    let trackId = Math.floor(Math.random() * 20);
    if (playlistId <= 0) {
      playlistId += 1;
    } else if (trackId <= 0) {
      trackId += 1;
    }
    let playlistTrackObject = { playlistId: playlistId, trackId: trackId };
    await addPlaylistTrack(playlistTrackObject);
  }
}
