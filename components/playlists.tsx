import NextLink from 'next/link';
import {
  Box,
  BoxProps,
  ChakraProps,
  Flex,
  GridItem,
  Img,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  SimpleGridProps,
  Skeleton,
  SkeletonText,
  Text,
} from '@chakra-ui/react';

import { usePlaylist } from '../lib/hooks';
import { formatDate } from '../lib/formatter';

export default function Playlists(props: SimpleGridProps) {
  const { playlists, isLoading } = usePlaylist();

  return (
    <SimpleGrid columns={[1, 2, 1, 2]} gap={4} {...props}>
      {isLoading
        ? [1, 2, 3, 4, 5, 6].map((n) => <PlaylistSkeleton key={n} />)
        : playlists.map((playlist) => (
            <GridItem key={playlist.id}>
              <PlaylistCard
                as={LinkBox}
                playlist={playlist}
                transition="transform 300ms"
                _hover={{ transform: 'scale(1.05)' }}
                _focusWithin={{ transform: 'scale(1.05)' }}
              />
            </GridItem>
          ))}
    </SimpleGrid>
  );
}

interface PlaylistCardProps extends BoxProps {
  playlist: {
    id: string;
    name: string;
    updatedAt: Date;
  };
  borderColor?: ChakraProps['borderColor'];
}

export const PlaylistCard = ({
  playlist,
  borderColor = 'green',
  ...rest
}: PlaylistCardProps) => {
  return (
    <Box pl="2" borderRadius="4px" bg={`${borderColor}.500`} {...rest}>
      <Flex align="center" bg="gray.900" borderRadius="4px" px="4" py="2">
        <Box>
          <Img
            boxSize="16"
            src={`https://picsum.photos/400?random=${playlist.id}`}
            borderRadius="3px"
            boxShadow={`2px 1px 5px var(--chakra-colors-${borderColor}-400)`}
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
    </Box>
  );
};

export const PlaylistSkeleton = (props: BoxProps) => {
  return (
    <Box pl="2" borderRadius="4px" bg="green.400" {...props}>
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
