/* eslint-disable no-console */
import MeiliSearch from 'meilisearch';

async function addDocuments() {
  const [songResp, playlistResp, artistResp] = await Promise.all([
    fetch('http://localhost:3000/api/get/song'),
    fetch('http://localhost:3000/api/get/playlist'),
    fetch('http://localhost:3000/api/get/artist'),
  ]);
  const [songs, playlists, artists] = await await Promise.all([
    songResp.json(),
    playlistResp.json(),
    artistResp.json(),
  ]);

  const songDocuments = songs.map(({ id, name, image }) => ({
    id,
    name,
    image,
    type: 'song',
  }));
  const playlistDocuments = playlists.map(({ id, name, image }) => ({
    id,
    name,
    image,
    type: 'playlist',
  }));
  const artistDocuments = artists.map(({ id, name, image }) => ({
    id,
    name,
    image,
    type: 'artist',
  }));

  const client = new MeiliSearch({
    host: 'https://ms-35282174b78b-1815.sgp.meilisearch.io',
    apiKey: '0b42ac846de1c1a7ed40469a0bc709987be0cf9a018959127724e6fdd201bbcc',
  });

  const songIndex = client.index('songs');
  const playlistIndex = client.index('playlists');
  const artistIndex = client.index('artists');

  const response = await Promise.all([
    songIndex.addDocuments(songDocuments, { primaryKey: 'id' }),
    playlistIndex.addDocuments(playlistDocuments, { primaryKey: 'id' }),
    artistIndex.addDocuments(artistDocuments, { primaryKey: 'id' }),
  ]);

  console.log(response);
}

addDocuments().catch((e) => console.log(e));
