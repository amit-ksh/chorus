import {
  Box,
  Flex,
  Text,
  Image,
  SkeletonCircle,
  Skeleton,
} from '@chakra-ui/react';
import { useStoreState } from 'easy-peasy';

const LoadingSkeleton = () => {
  return (
    <>
      <SkeletonCircle size="140px" />
      <Box ml={6}>
        <Skeleton w="60px" h={3} />
        <Skeleton mt={6} mb={4} w="200px" h={10} />
        <Skeleton w="90px" h={3} />
      </Box>
    </>
  );
};

const GradientLayout = ({
  gradient,
  children,
  image,
  subtitle,
  title,
  description,
  isLoading = false,
  roundImage,
}) => {
  const activeSong = useStoreState((state: any) => state.activeSong);

  return (
    <Box
      pb={activeSong ? '10vh' : '2vh'}
      h="full"
      overflowY="auto"
      bgGradient={gradient}
    >
      <Flex p="40px" align="center">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            <Box>
              <Image
                boxSize={['100px', '140px']}
                maxW="160px"
                maxH="160px"
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
              <Text as="h1" fontSize={{ base: '3xl', sm: '4xl' }}>
                {title}
              </Text>
              <Text fontSize="x-small">{description}</Text>
            </Box>
          </>
        )}
      </Flex>
      <Box py="50px">{children}</Box>
    </Box>
  );
};

export default GradientLayout;
