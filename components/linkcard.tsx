import NextLink from 'next/link';
import {
  Box,
  Grid,
  Heading,
  IconButton,
  Img,
  LayoutProps,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import { FC } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { useStoreActions } from 'easy-peasy';

interface ILinkCardProps {
  linkData: {
    id: string;
    name: string;
    url: string;
    artist?: {
      songs: string[];
    };
  };
  link: string;
  imageSize: LayoutProps['boxSize'];
  roundImage?: boolean;
}

const LinkCard: FC<ILinkCardProps> = ({
  linkData,
  imageSize,
  roundImage = false,
  link,
}) => {
  const setActiveSong = useStoreActions(
    (actions: any) => actions.changeActiveSong
  );
  const playSongs = useStoreActions(
    (actions: any) => actions.changeActiveSongs
  );

  const handlePlay = (activeSong?) => {
    setActiveSong(activeSong);
    playSongs(linkData.artist.songs);
  };

  return (
    <Grid
      as={LinkBox}
      direction="column"
      w={imageSize}
      p={4}
      bg="gray.800"
      borderRadius="md"
      transition="background-color 0.3s ease"
      _hover={{ bg: 'purple.600' }}
      _focus={{ bg: 'purple.600' }}
    >
      <Box position="relative" w="full" mb={6}>
        <Img
          display="block"
          boxSize="full"
          borderRadius={roundImage ? 'full' : 'md'}
          boxShadow="0 8px 20px rgb(0 0 0 / 60%)"
          src={`https://picsum.photos/400?random=${linkData.id}`}
          alt={linkData.name}
        />
        {!!linkData.url && (
          <Box position="absolute" bottom={2} right={2}>
            <IconButton
              icon={<BsFillPlayFill color="black" fontSize="30px" />}
              aria-label="play"
              bg="purple.500"
              _hover={{ bg: 'purple.400' }}
              _focus={{ bg: 'purple.400' }}
              size="md"
              isRound
              zIndex={10}
              onClick={() => handlePlay(linkData)}
            />
          </Box>
        )}
      </Box>

      <LinkOverlay as={NextLink} href={link}>
        <Heading as="h3" fontSize="md" fontWeight="medium">
          {linkData.name}
        </Heading>
      </LinkOverlay>
    </Grid>
  );
};

export default LinkCard;
