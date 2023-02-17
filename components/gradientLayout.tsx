import { FC, ReactNode } from 'react';
import {
  Box,
  Flex,
  Text,
  Image,
  SkeletonCircle,
  Skeleton,
  Heading,
  BoxProps,
} from '@chakra-ui/react';
import { useStoreState } from 'easy-peasy';

interface GradientLayoutProps extends BoxProps {
  children: ReactNode;
  gradient: string;
  image: string;
  subtitle: string;
  title: string;
  description: string;
  isLoading?: boolean;
  roundImage: boolean;
}

const GradientLayout: FC<GradientLayoutProps> = ({
  gradient,
  children,
  image,
  subtitle,
  title,
  description,
  isLoading = false,
  roundImage,
  ...rest
}) => {
  const activeSong = useStoreState((state: any) => state.activeSong);

  return (
    <Box
      pb={activeSong ? '10vh' : '2vh'}
      minH="89.4vh"
      h="full"
      overflowY="auto"
      background="gray.800"
      bgGradient={gradient}
      {...rest}
    >
      <Flex p="40px" align="center">
        <SkeletonCircle
          size={['100px', '140px']}
          isLoaded={!isLoading}
          fadeDuration={1.2}
        >
          <Image
            boxSize="full"
            boxShadow="2xl"
            src={image}
            borderRadius={roundImage ? 'full' : '3px'}
          />
        </SkeletonCircle>

        <Flex
          direction="column"
          justify="center"
          align="flex-start"
          p="20px"
          color="white"
        >
          <Skeleton w="80px" h={3} isLoaded={!isLoading} fadeDuration={1.2}>
            <Text
              fontSize="x-small"
              fontWeight="bold"
              letterSpacing="wide"
              casing="uppercase"
            >
              {subtitle}
            </Text>
          </Skeleton>
          <Skeleton
            mb={4}
            mt={2}
            h={10}
            isLoaded={!isLoading}
            fadeDuration={1.2}
          >
            <Heading as="h1" fontSize={{ base: '2xl', sm: '4xl' }}>
              {title}
            </Heading>
          </Skeleton>
          <Skeleton w="120px" h={3} isLoaded={!isLoading} fadeDuration={1.2}>
            <Text fontSize="x-small">{description}</Text>
          </Skeleton>
        </Flex>
      </Flex>
      <Box py="50px">{children}</Box>
    </Box>
  );
};

export default GradientLayout;
