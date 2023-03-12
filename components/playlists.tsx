import { FC } from 'react';
import NextLink from 'next/link';
import {
  Box,
  BoxProps,
  ChakraProps,
  Flex,
  GridItem,
  IconButton,
  Img,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  SimpleGridProps,
  Skeleton,
  SkeletonText,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { MdDeleteOutline } from 'react-icons/md';

import DeleteConfirmationModal from './deleteConfirmationModal';

import { useUserPlaylist } from '../lib/hooks';
import { formatDate } from '../lib/formatter';

export default function Playlists(props: SimpleGridProps) {
  const { playlists, isLoading } = useUserPlaylist();

  return (
    <>
      <SimpleGrid columns={[1, 2, 1, 2]} gap={4} {...props}>
        {isLoading
          ? [1, 2, 3, 4, 5, 6].map((n) => (
              <PlaylistSkeleton key={n} bgColor="whiteAlpha" />
            ))
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
    </>
  );
}

interface PlaylistCardProps extends BoxProps {
  playlist: {
    id: string;
    name: string;
    updatedAt: Date;
  };
  bgColor?: ChakraProps['color'];
}

export const PlaylistCard = ({
  playlist,
  bgColor = 'purple.500',
  ...rest
}: PlaylistCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box pl="2" borderRadius="4px" bg={bgColor} {...rest}>
        <Flex
          align="center"
          justify="space-between"
          bg="gray.900"
          borderRadius="4px"
          px="4"
          py="2"
        >
          <Flex align="center">
            <Box>
              <Img
                boxSize="16"
                src={`https://picsum.photos/400?random=${playlist.id}`}
                borderRadius="3px"
                boxShadow={`2px 1px 5px var(--chakra-colors-${bgColor}-400)`}
              />
            </Box>
            <Box ml={6}>
              <LinkOverlay as={NextLink} href={`playlist/${playlist.id}`}>
                <Text fontSize="1.3em" color="white">
                  {playlist.name}
                </Text>
              </LinkOverlay>

              <Text fontSize="x-small">
                <Text as="span" fontWeight="semibold">
                  Updated At:
                </Text>{' '}
                {formatDate(playlist.updatedAt).split('T')[0]}
              </Text>
            </Box>
          </Flex>

          <Box>
            <IconButton
              icon={<MdDeleteOutline />}
              bg="transparent"
              color="red"
              aria-label="delete playlist"
              onClick={onOpen}
            />
          </Box>
        </Flex>
      </Box>

      {/* Confirmation Modal */}
      <DeleteConfirmationModal
        itemId={playlist.id}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export const PlaylistSkeleton: FC<Omit<PlaylistCardProps, 'playlist'>> = ({
  bgColor,
  ...rest
}) => {
  return (
    <Box pl="2" borderRadius="4px" bg={bgColor} {...rest}>
      <Flex align="center" bg="gray.900" borderRadius="4px" py="3" px="4">
        <Skeleton w={16} h={16} borderRadius="4px" />
        <Box w="70%" ml={6}>
          <SkeletonText speed={1.8} skeletonHeight="2.5rem" noOfLines={1} />
          <SkeletonText
            speed={1.8}
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
