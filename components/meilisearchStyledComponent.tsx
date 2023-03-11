import {
  Box,
  Center,
  chakra,
  Flex,
  Grid,
  GridProps,
  Heading,
  Img,
  Input,
  LinkBox,
  LinkOverlay,
  List,
  ListItem,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { connectHits, connectSearchBox } from 'react-instantsearch-dom';

const Form = chakra('form', {
  baseStyle: {
    w: 'full',
  },
});

const renderInput = (renderOptions) => {
  const { query, refine } = renderOptions;

  return (
    <Form id="searchbox" noValidate action="" role="search">
      <Input
        variant="filled"
        color="purple.500"
        fontSize="lg"
        letterSpacing="1px"
        borderRadius="3xl"
        placeholder="Search"
        boxShadow="0 0 5pt 0.5pt var(--chakra-colors-purple-600)"
        _focus={{
          boxShadow: '0 1px 5pt 1pt var(--chakra-colors-purple-600)',
        }}
        _focusVisible={{
          border: 0,
        }}
        type="text"
        value={query}
        onChange={(e) => refine(e.target.value)}
      />
    </Form>
  );
};

const renderHits = (renderOptions) => {
  const { hits } = renderOptions;

  if (!hits.length) {
    return (
      <Center h="60vh" my="auto">
        <Heading as="h6" size="2xl">
          Not Found!
        </Heading>
      </Center>
    );
  }

  return (
    <Box id="hits" mx="auto">
      <Flex as={List} flexWrap="wrap" gap={4} pb={2}>
        {hits.map((item) => (
          <ListItem key={item.id} flex="1 1 160px">
            <CustomHit hit={item} />
          </ListItem>
        ))}
      </Flex>
    </Box>
  );
};

export const CustomSearchBox = connectSearchBox(renderInput);

export const CustomHits = connectHits(renderHits);

interface IHit {
  id: string;
  name: string;
}
export const CustomHit = ({ hit, ...rest }: GridProps & { hit: IHit }) => {
  const isArtist = false;

  return (
    <Grid
      as={LinkBox}
      direction="column"
      mx="auto"
      w={{ base: '200px', sm: '160px' }}
      h="full"
      p={4}
      bg="purple.800"
      borderRadius="md"
      transition="background-color 0.3s ease"
      _hover={{ bg: 'purple.600' }}
      _focus={{ bg: 'purple.600' }}
      {...rest}
    >
      <Box position="relative" w="full" mb={6}>
        <Img
          display="block"
          boxSize="full"
          borderRadius={isArtist ? 'full' : 'md'}
          boxShadow="0 8px 20px rgb(0 0 0 / 60%)"
          src={`https://picsum.photos/400?random=${hit.id || 0}`}
          alt={hit.name}
        />
      </Box>

      <LinkOverlay as={NextLink} href={`/song/${hit.id}` || '#'} mt="auto">
        <Heading as="h3" fontSize="sm" fontWeight="medium">
          {hit.name}
        </Heading>
      </LinkOverlay>
    </Grid>
  );
};
