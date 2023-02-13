import NextLink from 'next/link';
import {
  Box,
  Grid,
  Heading,
  Img,
  LayoutProps,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useStoreState } from 'easy-peasy';
import { PlaylistCard, PlaylistSkeleton } from '../components/playlists';
import { validateToken } from '../lib/auth';
import { usePlaylist } from '../lib/hooks';
import prisma from '../lib/prisma';
import { FC, ReactNode } from 'react';
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
  const { playlists: userPlaylits } = usePlaylist();

  const activeSong = useStoreState((state: any) => state.activeSong);

  return (
    <Box
      pb={activeSong ? '10vh' : '2vh'}
      minH="90vh"
      overflowY="auto"
      bgGradient={
        'linear(40deg, purple.400 0%, purple.800 30%, rgba(0,0,0,0.6) 100%)'
      }
      transition="background 0.5s"
    >
      {/* USER'S PLAYLIST */}
      <VStack as="section" py={5} px={10} spacing={4} align="flex-start">
        <Text fontWeight="bold" fontSize={{ base: '3xl', sm: '4xl' }}>
          {greeting()}
        </Text>
        <Box>
          {userPlaylits.length > 0 ? (
            <PlaylistCard
              as={LinkBox}
              playlist={userPlaylits[0]}
              minW="310px"
              maxW="360px"
              w="40vw"
              transition="transform 300ms"
              _hover={{ transform: 'scale(1.05)' }}
              _focusWithin={{ transform: 'scale(1.05)' }}
            />
          ) : (
            <PlaylistSkeleton minW="310px" maxW="360px" w="40vw" />
          )}
        </Box>
      </VStack>

      {/* ARTISTS */}
      <PageSection title="Top Artists">
        {artists.map((artist) => (
          <LinkCard
            key={artist.id}
            linkData={artist}
            imageSize="145px"
            roundImage={true}
          />
        ))}
      </PageSection>

      {/* SONGS */}
      <PageSection title="Top Songs">
        {songs.map((song) => (
          <LinkCard key={song.id} linkData={song} imageSize="148px" />
        ))}
      </PageSection>

      {/* Playlists */}
      <PageSection title="Top Playlists">
        {playlists.map((playlist) => (
          <LinkCard key={playlist.id} linkData={playlist} imageSize="148px" />
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
    prisma.song.findMany({ take: 10 }),
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
    <Grid
      templateColumns="repeat(10, 1fr)"
      templateRows="1fr"
      overflowX="auto"
      gap={6}
      maxW="100%"
    >
      {children}
    </Grid>
  </VStack>
);
