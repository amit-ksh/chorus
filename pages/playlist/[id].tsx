import {
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  useToast,
} from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import GradientLayout from '../../components/gradientLayout';
import { Profile } from '../../components/Profile';
import SongsTable from '../../components/songsTable';

import fetcher from '../../lib/fetcher';
import { validateToken } from '../../lib/auth';
import prisma from '../../lib/prisma';
import { getRandomBGColor } from '../../lib/utils';
import { useState } from 'react';

const Playlist = ({ playlist }) => {
  const [favorite, setFavorite] = useState<boolean>(
    playlist.savedBy.length ? true : false
  );
  const [likes, setLikes] = useState<number>(playlist.likes);

  const toast = useToast();

  const color = getRandomBGColor();

  const savePlaylist = async () => {
    setFavorite(!favorite);
    setLikes((v) => (favorite ? v + 1 : v - 1));

    try {
      const response = await fetcher('/put/favoritePlaylist', {
        id: playlist.id,
        favorite,
      });

      if (response.error) {
        // undo the changes
        setFavorite(!favorite);
        setLikes((v) => (favorite ? v + 1 : v - 1));

        throw new Error(response.error);
      }
    } catch (error) {
      toast({
        title: error.message,
        status: 'error',
        duration: 5000,
        position: 'top',
      });
    }
  };

  return (
    <GradientLayout
      as="main"
      gradient={`linear(40deg, ${color}.500 0%, ${color}.800 30%, rgba(0,0,0,0.6) 100%)`}
    >
      <Profile
        title={playlist.name}
        subtitle="Playlist"
        description={`${playlist.songs.length} songs`}
        image={`https://picsum.photos/400?random=${playlist.id}`}
        m={10}
      >
        <Flex mt={6} align="center" color="gray.300">
          <Heading as="h3">
            {likes}{' '}
            <Text as="span" fontSize="md">
              likes
            </Text>
          </Heading>

          <Box alignSelf="flex-end" ml={4}>
            <IconButton
              bg="transparent"
              color="red"
              fontSize="25px"
              aria-label="like"
              icon={favorite ? <AiFillHeart /> : <AiOutlineHeart />}
              _hover={{ bg: 'transparent' }}
              _focus={{ bg: 'transparent' }}
              onClick={savePlaylist}
            />
          </Box>
        </Flex>
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

  const playlist = await prisma.playlist.findUnique({
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

  return {
    props: { playlist },
  };
};

export default Playlist;
