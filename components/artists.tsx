import { FC } from 'react';
import { Box, Center, Heading, SimpleGrid, Text } from '@chakra-ui/react';

import LinkCard from './linkcard';
import Loader from './loader';
import { useFavorite } from '../lib/hooks';

const Artists: FC<{
  heading: string;
  emptyMessage: string;
}> = ({ heading, emptyMessage }) => {
  const { favorites: artists, isLoading } = useFavorite('artist');

  return (
    <Box as="section">
      <Heading as="h2" fontSize="2xl">
        {heading}
      </Heading>

      {!isLoading && !artists.length && (
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
          artists.map((artist) => (
            <LinkCard
              key={artist.id}
              type="artist"
              linkData={artist}
              imageSize="148px"
              roundImage
            />
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default Artists;
