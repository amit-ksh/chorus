import { Button, Flex, Heading, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import GradientLayout from '../../components/gradientLayout';
import { Profile } from '../../components/Profile';
import SongsTable from '../../components/songsTable';
import { validateToken } from '../../lib/auth';
import fetcher from '../../lib/fetcher';
import prisma from '../../lib/prisma';
import { getRandomBGColor } from '../../lib/utils';

const Playlist = ({ artist }) => {
  const [following, setFollowing] = useState<boolean>(
    !!artist.followers.length
  );
  const [followers, setFollowers] = useState<number>(artist.followers.length);

  const toast = useToast();
  const TOASTID = 'follow-artist-toast';

  // random color for gradient background
  const color = getRandomBGColor();

  const handleFollow = async () => {
    setFollowers((v) => (!following ? v + 1 : v - 1));
    setFollowing((v) => !v);

    try {
      const response = await fetcher('/put/followArtist', {
        id: artist.id,
        following,
      });

      if (response.error) {
        // undo the changes
        setFollowing((v) => !v);
        setFollowers((v) => (following ? v + 1 : v - 1));

        throw new Error(response.error);
      }
    } catch (error) {
      if (!toast.isActive(TOASTID)) {
        toast({
          id: TOASTID,
          title: error.message,
          status: 'error',
          duration: 5000,
          position: 'top',
        });
      }
    }
  };

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
            {followers}{' '}
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
            onClick={handleFollow}
          >
            {following ? 'Following' : 'Follow'}
          </Button>
        </Flex>
      </Profile>

      <SongsTable songs={artist.songs} />
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
      followers: {
        where: {
          id: user.id,
        },
      },
    },
  });

  return {
    props: { artist },
  };
};

export default Playlist;
