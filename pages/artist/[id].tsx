import GradientLayout from '../../components/gradientLayout';
import SongsTable from '../../components/songsTable';
import prisma from '../../lib/prisma';
import { getRandomBGColor } from '../../lib/utils';

const Playlist = ({ artist }) => {
  const color = getRandomBGColor();

  return (
    <GradientLayout
      gradient={`linear(40deg, ${color}.500 0%, ${color}.800 30%, rgba(0,0,0,0.6) 100%)`}
      title={artist.name}
      subtitle="Artist"
      description={`${artist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${artist.id}`}
      roundImage={false}
    >
      <SongsTable songs={artist.songs} />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  const artist = await prisma.artist.findFirst({
    where: {
      id: query.id,
    },
    include: {
      songs: {
        where: { artistId: query.id },
      },
    },
  });

  return {
    props: { artist },
  };
};

export default Playlist;
