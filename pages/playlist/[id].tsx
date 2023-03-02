import GradientLayout from '../../components/gradientLayout';
import Profile from '../../components/profile';
import SongsTable from '../../components/songsTable';

import { validateToken } from '../../lib/auth';
import prisma from '../../lib/prisma';
import { getRandomBGColor } from '../../lib/utils';
import FavoriteButton from '../../components/favoriteButton';

const Playlist = ({ playlist }) => {
  // random color for gradient background
  const color = getRandomBGColor();

  return (
    <GradientLayout
      as="main"
      gradient={`linear(40deg, ${color}.500 0%, ${color}.800 30%, rgba(0,0,0,0.6) 100%)`}
    >
      <Profile
        id={playlist.id}
        resourceName="playlist"
        title={playlist.name}
        subtitle="Playlist"
        description={`${playlist.songs.length} songs`}
        isOwner={playlist.isOwner}
        image={`https://picsum.photos/400?random=${playlist.id}`}
        m={10}
      >
        <FavoriteButton
          type="Playlist"
          item={playlist}
          userFavorite={playlist.savedBy.length > 0}
          mt={6}
        />
      </Profile>

      <SongsTable songs={playlist.songs} />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  let user;
  try {
    user = validateToken(req.cookies.TRAX_ACCESS_TOKEN);
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        path: '/signin',
      },
    };
  }

  let playlist;
  try {
    playlist = await prisma.playlist.findUnique({
      where: {
        id: query.id,
      },
      include: {
        songs: {
          include: {
            artist: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
        // check whether user liked the playlist or not
        savedBy: {
          where: {
            id: user.id,
          },
        },
      },
    });
    playlist.isOwner = playlist.userId === user.id;

    return {
      props: { playlist },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default Playlist;
