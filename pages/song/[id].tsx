import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { BsFillPlayFill } from 'react-icons/bs';
import GradientLayout from '../../components/gradientLayout';
import { Profile } from '../../components/Profile';
import SongsTable from '../../components/songsTable';
import { validateToken } from '../../lib/auth';
import fetcher from '../../lib/fetcher';
import { formatTime } from '../../lib/formatter';
import prisma from '../../lib/prisma';
import { getRandomBGColor } from '../../lib/utils';

const Song = ({ song }) => {
  // random color for gradient background
  const color = getRandomBGColor();

  return (
    <GradientLayout
      as="main"
      gradient={`linear(40deg, ${color}.500 0%, ${color}.800 30%, rgba(0,0,0,0.6) 100%)`}
    >
      <Profile
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
          <Heading as="h3" w="100px">
            {song.likes}{' '}
            <Text as="span" fontSize="md">
              likes
            </Text>
          </Heading>

          <Box alignSelf="flex-end" ml={4} w="full">
            <IconButton
              bg="transparent"
              color="red"
              fontSize="25px"
              aria-label="like"
              icon={<AiFillHeart />}
              _hover={{ bg: 'transparent' }}
              _focus={{ bg: 'transparent' }}
              // onClick={saveSong}
            />
          </Box>

          <Box>
            <IconButton
              icon={<BsFillPlayFill color="black" fontSize="30px" />}
              aria-label="play"
              bg="purple.500"
              _hover={{ bg: 'purple.400' }}
              _focus={{ bg: 'purple.400' }}
              size="lg"
              isRound
              // onClick={() => handlePlay()}
            />
          </Box>
        </Flex>

        {/* Songs By Artist */}
        <Box my={8}>
          <Heading as="h2" fontSize="xl" color="white">
            <Text as="span" fontWeight="semibold">
              More Songs By
            </Text>{' '}
            {song.artist.name}
          </Heading>
          <SongsTable songs={song.artist.songs} hasPlayButton={false} />
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

  const song = await prisma.song.findUnique({
    where: {
      id: query.id,
    },
    include: {
      artist: {
        select: {
          name: true,
          songs: true,
        },
      },
    },
  });

  return {
    props: { song },
  };
};

export default Song;
