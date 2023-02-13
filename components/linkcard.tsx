import NextLink from 'next/link';
import {
  Box,
  Grid,
  Heading,
  Img,
  LayoutProps,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import { FC } from 'react';

interface ILinkCardProps {
  linkData: {
    id: string;
    name: string;
    url: string;
  };
  imageSize: LayoutProps['boxSize'];
  roundImage?: boolean;
}

const LinkCard: FC<ILinkCardProps> = ({
  linkData,
  imageSize,
  roundImage = false,
}) => {
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
    >
      <Box w="full" mb={6}>
        <Img
          display="block"
          boxSize="full"
          borderRadius={roundImage ? 'full' : 'md'}
          boxShadow="0 8px 20px rgb(0 0 0 / 60%)"
          src={`https://picsum.photos/400?random=${linkData.id}`}
        />
      </Box>
      <LinkOverlay as={NextLink} href={`artist/${linkData.id}`}>
        <Heading
          as="h3"
          lineHeight={2}
          fontSize="md"
          fontWeight="medium"
          textAlign="start"
        >
          {linkData.name}
        </Heading>
      </LinkOverlay>
    </Grid>
  );
};

export default LinkCard;