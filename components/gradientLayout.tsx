import { Box, Flex, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import { useStoreState } from 'easy-peasy';

const GradientLayout = ({
  color,
  children,
  image,
  subtitle,
  title,
  description,
  roundImage,
}) => {
  const activeSong = useStoreState((state: any) => state.activeSong);

  return (
    <Box
      pb={activeSong ? '10vh' : '2vh'}
      h="full"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}
    >
      <Flex bg={`${color}.600`} p="40px" align="end">
        <Box>
          <Image
            boxSize="160px"
            boxShadow="2xl"
            src={image}
            borderRadius={roundImage ? 'full' : '3px'}
          />
        </Box>
        <Box p="20px" lineHeight="40px" color="white">
          <Text
            fontSize="x-small"
            fontWeight="bold"
            letterSpacing="wide"
            casing="uppercase"
          >
            {subtitle}
          </Text>
          <Text as="h1" fontSize="4xl">
            {title}
          </Text>
          <Text fontSize="x-small">{description}</Text>
        </Box>
      </Flex>
      <Box py="50px">{children}</Box>
    </Box>
  );
};

export default GradientLayout;
