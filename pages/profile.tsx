import { Box, Heading } from '@chakra-ui/react';

import GradientLayout from '../components/gradientLayout';
import Playlists from '../components/playlists';
import Profile from '../components/profile';
import Artists from '../components/artists';
import { useMe } from '../lib/hooks';

const UserProfile = () => {
  const { user, isLoading } = useMe();

  return (
    <GradientLayout
      as="main"
      gradient={
        'linear(40deg, purple.400 0%, purple.800 30%, rgba(0,0,0,0.6) 100%)'
      }
    >
      <Profile
        id={user?.id}
        type="user"
        subtitle="profile"
        title={`${user?.firstName} ${user?.lastName}`}
        description={`${user?.playlistsCount} public playlist`}
        image={user?.image || `https://picsum.photos/400?random=${user?.id}`}
        isLoading={isLoading}
        isOwner={true}
        roundImage
        m={10}
      />

      <Box color="white" px="40px" mt={8}>
        <Box mb="40px">
          <Heading fontSize="2xl" fontWeight="bold" mb={4}>
            Your Playlists
          </Heading>

          <Playlists id="playlists" ml={4} />
        </Box>
      </Box>

      <Box color="white" px="40px" mt={8}>
        <Artists
          heading="Artists You Follow"
          emptyMessage="0 Artists for have followed"
        />
      </Box>
    </GradientLayout>
  );
};

export default UserProfile;
