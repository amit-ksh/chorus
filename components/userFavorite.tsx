import { Box, Center, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { useFavorite } from '../lib/hooks';
import LinkCard from './linkcard';
import Loader from './loader';

interface IProps {
  itemType: 'song' | 'artist' | 'playlist';
  heading: string;
  emptyMessage: string;
}

const UserFavorite: FC<IProps> = ({ itemType, heading, emptyMessage }) => {
  const { favorites: songs, isLoading } = useFavorite(itemType);

  return (
    <Box as="section">
      <Heading as="h2" fontSize="2xl">
        {heading}
      </Heading>

      {!isLoading && !songs.length && (
        <Center h="65vh">
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
          songs.map((song) => (
            <LinkCard
              key={song.id}
              linkData={song}
              link={`/${itemType}/${song.id}`}
              imageSize="148px"
            />
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default UserFavorite;
