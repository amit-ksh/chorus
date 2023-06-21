import {
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import AddSongToPlaylistModal from '../../components/addSongToPlaylistModal';
import FavoriteButton from '../../components/favoriteButton';
import GradientLayout from '../../components/gradientLayout';
import Profile from '../../components/profile';
import SongsTable from '../../components/songsTable';
import { validateToken } from '../../lib/auth';
import prisma from '../../lib/prisma';
import { getRandomBGColor } from '../../lib/utils';

const Song = ({ song, likedByUser }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // random color for gradient background
  const color = getRandomBGColor();

  return (
    <GradientLayout
      as="main"
      gradient={`linear(40deg, ${color}.500 0%, ${color}.800 30%, rgba(0,0,0,0.6) 100%)`}
    >
      <Profile
        id={song?.id}
        type="song"
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
        image={song?.image || `https://picsum.photos/400?random=${song.id}`}
        m={10}
      >
        {/* LIKES */}
        <Flex w="full" mt={6} align="center" color="gray.300">
          <FavoriteButton
            type="song"
            item={song}
            userFavorite={likedByUser}
            isOwner={song.isOwner}
          />

          <Box>
            <IconButton
              icon={<MdAdd color="white" fontSize="25px" />}
              aria-label="add song to playlist"
              size="sm"
              isRound
              ml={4}
              onClick={onOpen}
            />
            <AddSongToPlaylistModal
              songId={song.id}
              isOpen={isOpen}
              onClose={onClose}
            />
          </Box>
        </Flex>
      </Profile>

      {/* Songs By Artist */}
      <Box mt={8}>
        <Heading as="h2" fontSize="xl" color="white" mb={4} ml={4}>
          <Text as="span" fontWeight="semibold">
            More Songs By
          </Text>{' '}
          {song.artist.name}
        </Heading>
        <SongsTable songs={song.artist.songs} />
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ req, query }) => {
  let user;
  try {
    user = validateToken(req.cookies.CHORUS_ACCESS_TOKEN);
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

    const totalSongs = await prisma.playlist.count({
      where: {
        id:
          User.favoritePlaylistId != null ? User.favoritePlaylistId : undefined,
        songIds: { equals: query.id },
      },
    });
    const likedByUser = totalSongs > 0;

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
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default Song;
