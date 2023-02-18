import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import GradientLayout from '../../components/gradientLayout';
import { Profile } from '../../components/Profile';
import SongsTable from '../../components/songsTable';
import prisma from '../../lib/prisma';
import { getRandomBGColor } from '../../lib/utils';

const Playlist = ({ artist }) => {
  const color = getRandomBGColor();

  return (
    <GradientLayout
      as="main"
      gradient={`linear(40deg, ${color}.500 0%, ${color}.800 30%, rgba(0,0,0,0.6) 100%)`}
    >
      <Profile
        title={artist.name}
        subtitle="Artist"
        description={`${artist.songs.length} songs`}
        image={`https://picsum.photos/400?random=${artist.id}`}
        m={10}
      >
        <Flex mt={6} align="center" color="gray.300">
          <Heading as="h3">
            {artist.followers}{' '}
            <Text as="span" fontSize="md">
              followers
            </Text>
          </Heading>

          <Button
            variant="outline"
            alignSelf="flex-end"
            size="sm"
            ml={4}
            _hover={{
              bg: 'purple.600',
              color: 'gray.100',
              borderColor: 'purple.600',
            }}
            _focus={{
              bg: 'purple.600',
              color: 'gray.100',
              borderColor: 'purple.600',
            }}
            // TODO: add follower on click
          >
            Follow
          </Button>
        </Flex>
      </Profile>

      <SongsTable songs={artist.songs} />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query }) => {
  const artist = await prisma.artist.findFirst({
    where: {
      id: query.id,
    },
    include: {
      songs: {
        where: { artistId: query.id },
        include: {
          artist: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return {
    props: { artist },
  };
};

export default Playlist;
