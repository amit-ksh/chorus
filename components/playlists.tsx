import NextLink from 'next/link';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  GridProps,
  Img,
  LinkBox,
  LinkOverlay,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
} from '@chakra-ui/react';

import { usePlaylist } from '../lib/hooks';
import { formatDate } from '../lib/formatter';

const PlaylistSkeleton = () => {
  return (
    <Box pl="2" borderRadius="4px" bg="green.400">
      <Flex align="center" bg="gray.900" borderRadius="4px" py="3" px="4">
        <Skeleton w={16} h={16} borderRadius="4px" />
        <Box w="70%" ml={6}>
          <SkeletonText
            fadeDuration={4}
            skeletonHeight="2.5rem"
            noOfLines={1}
          />
          <SkeletonText
            fadeDuration={4}
            mt={1}
            w="70%"
            skeletonHeight="8px"
            noOfLines={1}
          />
        </Box>
      </Flex>
    </Box>
  );
};

const Playlists = (props: GridProps) => {
  const { playlists, isLoading } = usePlaylist();

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
      {isLoading
        ? [1, 2, 3, 4, 5, 6].map((n) => <PlaylistSkeleton key={n} />)
        : playlists.map((playlist) => (
            <GridItem key={playlist.id}>
              <LinkBox pl="2" borderRadius="4px" bg="green.400">
                <Flex
                  align="center"
                  bg="gray.900"
                  borderRadius="4px"
                  px="4"
                  py="2"
                >
                  <Box>
                    <Img
                      boxSize="16"
                      src={`https://picsum.photos/400?random=${playlist.id}`}
                      borderRadius="3px"
                      boxShadow="2px 1px 5px var(--chakra-colors-green-400)"
                    />
                  </Box>
                  <Box ml={6}>
                    <LinkOverlay as={NextLink} href={`playlist/${playlist.id}`}>
                      <Text fontSize="1.3em">{playlist.name}</Text>
                    </LinkOverlay>

                    <Text fontSize="x-small">
                      <Text as="span" fontWeight="semibold">
                        Updated At:
                      </Text>{' '}
                      {formatDate(playlist.updatedAt).split('T')[0]}
                    </Text>
                  </Box>
                </Flex>
              </LinkBox>
            </GridItem>
          ))}
    </Grid>
  );
};

export default Playlists;
