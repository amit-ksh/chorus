import { FC } from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import GradientLayout from '../components/gradientLayout';
import UserFavorite from '../components/userFavorite';
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
            <UserFavorite
              itemType="song"
              heading="Favorite Songs"
              emptyMessage="0 Favorite Songs"
            />
          </TabPanel>
          <TabPanel>
            <UserPlaylists
              heading="Your Playlists"
              emptyMessage="You have 0 playlists"
            />
          </TabPanel>
          <TabPanel>
            <UserFavorite
              itemType="playlist"
              heading="Your Favorite Playlists"
              emptyMessage="You have 0 favorite playlists"
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </GradientLayout>
  );
};

export default UserLibrary;
