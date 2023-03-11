/* eslint-disable no-console */
import MeiliSearch from 'meilisearch';

async function addDocuments() {
  const resp = await fetch('http://localhost:3000/api/get/song');
  const songs = await resp.json();

  const documents = songs.map(({ id, name, image }) => ({
    id,
    name,
    image,
    type: 'song',
  }));

  const client = new MeiliSearch({
    host: 'https://ms-35282174b78b-1815.sgp.meilisearch.io',
    apiKey: '0b42ac846de1c1a7ed40469a0bc709987be0cf9a018959127724e6fdd201bbcc',
  });

  const index = client.index('songs');

  const response = await index.addDocuments(documents);

  console.log(response);
}

addDocuments().catch((e) => console.log(e));
