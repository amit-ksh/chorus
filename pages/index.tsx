import { Box, Heading } from '@chakra-ui/react';

import GradientLayout from '../components/gradientLayout';
import Playlists from '../components/playlists';
import { useMe } from '../lib/hooks';

const Home = () => {
  const { user } = useMe();

  return (
    <GradientLayout
      color="green"
      subtitle="profile"
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.playlistsCount} public playlist`}
      image={`https://picsum.photos/400?random=${user?.id}`}
      roundImage
    >
      <Box color="white" px="40px">
        <Box mb="40px">
          <Heading fontSize="2xl" fontWeight="bold" mb={4}>
            Your Playlists
          </Heading>

          <Playlists ml={4} />
        </Box>
      </Box>
    </GradientLayout>
  );
};

export default Home;
