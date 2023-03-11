import { FC } from 'react';
import { Box, Center, Heading, SimpleGrid, Text } from '@chakra-ui/react';

import LinkCard from './linkcard';
import { useUserPlaylist } from '../lib/hooks';
import Loader from './loader';

const UserPlaylists: FC<{
  heading: string;
  emptyMessage: string;
}> = ({ heading, emptyMessage }) => {
  const { playlists, isLoading } = useUserPlaylist();

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
              link={`/playlist/${song.id}`}
              imageSize="148px"
            />
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default UserPlaylists;
