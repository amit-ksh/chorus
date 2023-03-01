import { Box } from '@chakra-ui/react';

import { validateToken } from '../../lib/auth';
import prisma from '../../lib/prisma';

import GradientLayout from '../../components/gradientLayout';
import Profile from '../../components/profile';

const CreatePlaylistPage = ({ playlist }) => {
  return (
    <GradientLayout
      as="main"
      gradient={
        'linear(40deg, twitter.500 0%, twitter.800 30%, rgba(0,0,0,0.6) 100%)'
      }
    >
      <Profile
        id={playlist.id}
        title={playlist.name}
        subtitle="Playlist"
        description={`${playlist?.songs.length || 0} songs`}
        image={`https://picsum.photos/400?random=${playlist.id}`}
        isEditable={playlist.isEditable}
        my={10}
        mx={4}
      ></Profile>
      <Box h="65vh" bgGradient="linear(#12121288 0%, #121212dd 100%)"></Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ req }) => {
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
    playlist = await prisma.playlist.create({
      data: {
        name: 'Playlist Name',
        user: {
          connect: { id: user.id },
        },
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
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        path: '/',
      },
    };
  }
  playlist.isEditable = playlist.userId === user.id;

  return {
    props: { playlist },
  };
};

export default CreatePlaylistPage;
