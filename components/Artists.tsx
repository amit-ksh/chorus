import { FC } from 'react';
import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
} from '@chakra-ui/react';

import LinkCard from './linkcard';
import { useArtist } from '../lib/hooks';

const Artists: FC<{
  heading: string;
  emptyMessage: string;
}> = ({ heading, emptyMessage }) => {
  const { artists, isLoading } = useArtist();

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
          artists.map((song) => (
            <LinkCard
              key={song.id}
              linkData={song}
              link={`/artist/${song.id}`}
              imageSize="148px"
            />
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default Artists;
