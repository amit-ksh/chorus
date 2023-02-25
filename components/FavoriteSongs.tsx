import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { FC } from 'react';

import { useFavorite } from '../lib/hooks';
import LinkCard from './linkcard';

const FavoriteSongs: FC = () => {
  const { songs, isLoading } = useFavorite();

  return (
    <Box as="section">
      <Heading as="h2" fontSize="2xl">
        Your Favorite Songs
      </Heading>

      {!isLoading && !songs.length && (
        <Center h="65vh">
          <Text
            fontSize="3xl"
            fontWeight="semibold"
            fontFamily="monospace"
            textAlign="center"
          >
            0 Favorite Songs
          </Text>
        </Center>
      )}

      {isLoading && (
        <Center mt={12}>
          <Spinner
            color="purple.400"
            size="xl"
            thickness="3px"
            label="loading"
          />
        </Center>
      )}

      <SimpleGrid columns={[2, 3, 3, 4, 5]} gap={6} my={8} ml={4}>
        {!isLoading &&
          songs.map((song) => (
            <LinkCard
              key={song.id}
              linkData={song}
              link={`/song/${song.id}`}
              imageSize="148px"
            />
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default FavoriteSongs;
