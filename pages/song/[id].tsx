import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import FavoriteButton from '../../components/favoriteButton';
import GradientLayout from '../../components/gradientLayout';
import Profile from '../../components/profile';
import SongsTable from '../../components/songsTable';
import { validateToken } from '../../lib/auth';
import prisma from '../../lib/prisma';
import { getRandomBGColor } from '../../lib/utils';

const Song = ({ song, likedByUser }) => {
  // random color for gradient background
  const color = getRandomBGColor();

  return (
    <GradientLayout
      as="main"
      gradient={`linear(40deg, ${color}.500 0%, ${color}.800 30%, rgba(0,0,0,0.6) 100%)`}
    >
      <Profile
        resourceName="song"
        title={song.name}
        subtitle="Song"
        description={
          <>
            By{' '}
            <Text as="span" fontWeight="semibold" fontSize="sm">
              {song.artist.name}
            </Text>
          </>
        }
        image={`https://picsum.photos/400?random=${song.id}`}
        m={10}
      >
        {/* LIKES */}
        <Flex mt={6} align="center" color="gray.300">
          <FavoriteButton
            type="song"
            item={song}
            userFavorite={likedByUser}
            isDisabled={song.isOwner}
            w="full"
          />
        </Flex>

        {/* Songs By Artist */}
        <Box my={8}>
          <Heading as="h2" fontSize="xl" color="white" mb={4}>
            <Text as="span" fontWeight="semibold">
              More Songs By
            </Text>{' '}
            {song.artist.name}
          </Heading>
          <SongsTable songs={song.artist.songs} />
        </Box>
      </Profile>
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ req, query }) => {
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

  try {
    const User = await prisma.user.findUnique({
      where: { id: user.id },
    });
    const { songs } = await prisma.playlist.findUnique({
      where: {
        id: User.favoritePlaylistId,
      },
      select: {
        songs: {
          where: {
            id: query.id,
          },
          select: {
            id: true,
          },
        },
      },
    });
    const likedByUser = songs.length > 0;

    const song = await prisma.song.findUnique({
      where: {
        id: query.id,
      },
      include: {
        artist: {
          select: {
            name: true,
            songs: {
              include: {
                artist: true,
              },
            },
          },
        },
      },
    });

    return {
      props: { song, likedByUser },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default Song;
