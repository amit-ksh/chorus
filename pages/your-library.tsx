import { FC } from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import GradientLayout from '../components/gradientLayout';
import FavoriteSongs from '../components/favoriteSongs';
import UserPlaylists from '../components/userPlaylists';

const UserLibrary: FC = () => {
  return (
    <GradientLayout
      as="main"
      gradient={
        'linear(40deg, purple.400 0%, purple.800 30%, rgba(0,0,0,0.6) 100%)'
      }
      p={4}
      color="white"
    >
      <Tabs isLazy>
        <TabList justifyContent="center" mx={4} my={2} gap={2}>
          <Tab color="white">Favorite Songs</Tab>
          <Tab color="white">Playlists</Tab>
          <Tab color="white">Saved Playlists</Tab>
        </TabList>

        <TabPanels my={6}>
          <TabPanel>
            <FavoriteSongs />
          </TabPanel>
          <TabPanel>
            <UserPlaylists
              heading="Your Playlists"
              emptyMessage="You have 0 playlists"
            />
          </TabPanel>
          <TabPanel>
            <UserPlaylists
              heading="Your Favorite Playlists"
              emptyMessage="You have 0 favorite playlists"
              resourceName="savedPlaylist"
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </GradientLayout>
  );
};

export default UserLibrary;
