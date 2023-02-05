import NextLink from 'next/link';
import {
  Flex,
  Grid,
  GridItem,
  GridProps,
  Img,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';
import { usePlaylist } from '../lib/hooks';
import { formatDate } from '../lib/formatter';

const Playlists = (props: GridProps) => {
  const { playlists } = usePlaylist();

  return (
    <Grid
      gridTemplateColumns={{
        base: '1fr',
        sm: '1fr 1fr',
        md: '1fr',
        lg: '1fr 1fr',
      }}
      gap={3}
      {...props}
    >
      {playlists?.map((playlist) => (
        <GridItem key={playlist.id} pl="2" borderRadius="4px" bg="orange.400">
          <LinkBox>
            <Flex align="center" bg="gray.900" borderRadius="4px" p="4">
              <Img
                boxSize="12"
                src={`https://picsum.photos/400?random=${playlist.id}`}
                borderRadius="100%"
              />
              <LinkOverlay
                as={NextLink}
                href={`playlist/${playlist.id}`}
                ml={6}
              >
                <Text fontSize="large">{playlist.name}</Text>
                <Text fontSize="x-small">
                  <Text as="span" fontWeight="semibold">
                    Updated At:
                  </Text>{' '}
                  {formatDate(playlist.updatedAt).split('T')[0]}
                </Text>
              </LinkOverlay>
            </Flex>
          </LinkBox>
        </GridItem>
      ))}
    </Grid>
  );
};

export default Playlists;
