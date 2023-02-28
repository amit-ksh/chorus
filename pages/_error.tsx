import { Button, Flex, Heading, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const _error = () => {
  const router = useRouter();

  return (
    <Flex direction="column" align="center" justify="center" h="85vh">
      <Heading as="h1" size="2xl">
        404
      </Heading>
      <Text mb={8} fontWeight="medium" letterSpacing="wide">
        It seems you lost track.
      </Text>

      <Flex align="center" gap={8}>
        <Button
          role="link"
          fontSize="lg"
          fontWeight="semibold"
          py={3}
          px={6}
          bg="white"
          color="black"
          borderRadius="full"
          transition="500ms"
          _hover={{
            transform: 'scale(1.02)',
          }}
          _focus={{
            transform: 'scale(1.02)',
          }}
          onClick={() => router.back()}
        >
          Go Back
        </Button>

        <Link
          as={NextLink}
          href="/"
          fontSize="lg"
          fontWeight="semibold"
          py={3}
          px={6}
          bg="white"
          color="black"
          borderRadius="full"
          transition="500ms"
          _hover={{
            textDecoration: 'none',
            transform: 'scale(1.02)',
          }}
          _focus={{
            textDecoration: 'none',
            transform: 'scale(1.02)',
          }}
        >
          Home
        </Link>
      </Flex>
    </Flex>
  );
};

export default _error;
