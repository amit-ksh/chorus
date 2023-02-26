import { FC, ReactNode } from 'react';
import {
  Box,
  Heading,
  LinkBox,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useStoreState } from 'easy-peasy';

import { validateToken } from '../lib/auth';
import { usePlaylist } from '../lib/hooks';
import prisma from '../lib/prisma';

import { PlaylistCard, PlaylistSkeleton } from '../components/playlists';
import LinkCard from '../components/linkcard';

const greeting = () => {
  const hours = new Date().getHours();

  if (hours > 0 && hours < 12) {
    return 'Good Morning!';
  } else if (hours > 12 && hours < 18) {
    return 'Good Afternoon!';
  } else {
    return 'Good Evening!';
  }
};

const Home = ({ artists, songs, playlists }) => {
  const { playlists: userPlaylist, isLoading } = usePlaylist('playlist');

  const activeSong = useStoreState((state: any) => state.activeSong);

  return (
    <Box
      as="main"
      pb={activeSong ? '10vh' : '2vh'}
      minH="90vh"
      color="white"
      overflowY="auto"
      bg="gray.800"
      bgGradient={
        'linear(40deg, purple.400 0%, purple.800 30%, rgba(0,0,0,0.6) 100%)'
      }
      bgAttachment="fixed"
    >
      {/* USER'S PLAYLIST */}
      <VStack as="section" py={5} px={10} spacing={4} align="flex-start">
        <Text fontWeight="bold" fontSize={{ base: '3xl', sm: '4xl' }}>
          {greeting()}
        </Text>
        <Box>
          {isLoading && <PlaylistSkeleton minW="310px" maxW="360px" w="40vw" />}
          {!isLoading && userPlaylist.length > 0 && (
            <PlaylistCard
              as={LinkBox}
              playlist={userPlaylist[0]}
              minW="310px"
              maxW="360px"
              w="40vw"
              borderColor="purple"
              transition="transform 300ms"
              _hover={{ transform: 'scale(1.05)' }}
              _focusWithin={{ transform: 'scale(1.05)' }}
            />
          )}
        </Box>
      </VStack>

      {/* ARTISTS */}
      <PageSection title="Top Artists">
        {artists.map((artist) => (
          <LinkCard
            key={artist.id}
            link={`/artist/${artist.id}`}
            linkData={artist}
            imageSize="145px"
            roundImage={true}
          />
        ))}
      </PageSection>

      {/* SONGS */}
      <PageSection title="Top Songs">
        {songs.map((song) => (
          <LinkCard
            key={song.id}
            link={`/song/${song.id}`}
            linkData={song}
            imageSize="148px"
          />
        ))}
      </PageSection>

      {/* PLAYLISTS */}
      <PageSection title="Top Playlists">
        {playlists.map((playlist) => (
          <LinkCard
            key={playlist.id}
            link={`/playlist/${playlist.id}`}
            linkData={playlist}
            imageSize="148px"
          />
        ))}
      </PageSection>
    </Box>
  );
};

export default Home;

export const getServerSideProps = async ({ req }) => {
  try {
    validateToken(req.cookies.TRAX_ACCESS_TOKEN);
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        path: '/signin',
      },
    };
  }

  const [artists, songs, playlists] = await Promise.all([
    prisma.artist.findMany({ take: 10 }),
    prisma.song.findMany({
      take: 10,
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
    }),
    prisma.playlist.findMany({ take: 10 }),
  ]);

  return {
    props: { artists, songs, playlists },
  };
};

const PageSection: FC<{ title: string; children: ReactNode }> = ({
  children,
  title,
}) => (
  <VStack as="section" py={5} px={10} spacing={4} align="flex-start">
    <Heading as="h2" fontWeight="bold" fontSize={{ base: 'xl', sm: '2xl' }}>
      {title}
    </Heading>
    <SimpleGrid columns={[2, 3, 3, 4, 5]} gap={6} pb={2}>
      {children}
    </SimpleGrid>
  </VStack>
);
