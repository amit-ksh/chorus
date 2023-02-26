import { FC } from 'react';
import { Box, Center, Heading, SimpleGrid, Text } from '@chakra-ui/react';

import LinkCard from './linkcard';
import { usePlaylist } from '../lib/hooks';
import Loader from './loader';

const UserPlaylists: FC<{
  resourceName?: 'playlist' | 'savedPlaylist';
  heading: string;
  emptyMessage: string;
}> = ({ resourceName = 'playlist', heading, emptyMessage }) => {
  const { playlists, isLoading } = usePlaylist(resourceName);

  return (
    <Box as="section">
      <Heading as="h2" fontSize="2xl">
        {heading}
      </Heading>

      {!isLoading && !playlists.length && (
        <Center h="50vh">
          <Text
            fontSize="3xl"
            fontWeight="semibold"
            fontFamily="monospace"
            textAlign="center"
          >
            {emptyMessage}
          </Text>
        </Center>
      )}

      {isLoading && <Loader />}

      <SimpleGrid columns={[2, 3, 3, 4, 5]} gap={6} my={8} ml={4}>
        {!isLoading &&
          playlists.map((song) => (
            <LinkCard
              key={song.id}
              linkData={song}
              link={`/playlists/${song.id}`}
              imageSize="148px"
            />
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default UserPlaylists;
