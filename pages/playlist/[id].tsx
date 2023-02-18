import { Box, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { AiOutlineHeart } from 'react-icons/ai';
import GradientLayout from '../../components/gradientLayout';
import { Profile } from '../../components/Profile';
import SongsTable from '../../components/songsTable';
import { validateToken } from '../../lib/auth';
import prisma from '../../lib/prisma';
import { getRandomBGColor } from '../../lib/utils';

const Playlist = ({ playlist }) => {
  const color = getRandomBGColor();

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
            {playlist.likes}{' '}
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
              icon={<AiOutlineHeart />}
              _hover={{ bg: 'transparent' }}
              _focus={{ bg: 'transparent' }}
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

  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: query.id,
      userId: user.id,
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
    },
  });

  return {
    props: { playlist },
  };
};

export default Playlist;
