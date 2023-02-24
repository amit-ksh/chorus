import { Center, Heading, SimpleGrid, Spinner, Text } from '@chakra-ui/react';

import GradientLayout from '../components/gradientLayout';
import LinkCard from '../components/linkcard';
import { useFavorite } from '../lib/hooks';

const FavoritePage = () => {
  const { songs, isLoading } = useFavorite();

  return (
    <GradientLayout
      as="main"
      gradient={
        'linear(40deg, purple.400 0%, purple.800 30%, rgba(0,0,0,0.6) 100%)'
      }
      p={4}
      color="white"
    >
      <Heading as="h1">Your Favorite Songs</Heading>

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
    </GradientLayout>
  );
};

export default FavoritePage;
