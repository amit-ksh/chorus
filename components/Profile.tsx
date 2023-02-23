import {
  Box,
  BoxProps,
  Flex,
  Heading,
  Image,
  Skeleton,
  SkeletonCircle,
  Text,
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface IProps extends BoxProps {
  children?: ReactNode;
  image: string;
  subtitle: string;
  title: string;
  description: string | ReactNode;
  isLoading?: boolean;
  roundImage?: boolean;
}

export const Profile: FC<IProps> = ({
  image,
  subtitle,
  title,
  description,
  isLoading = false,
  roundImage = false,
  children,
  ...rest
}) => {
  return (
    <Box {...rest}>
      <Flex align="center" direction={{ base: 'column', md: 'row' }}>
        <SkeletonCircle
          size={['60%', '140px']}
          isLoaded={!isLoading}
          fadeDuration={1.2}
          borderRadius={roundImage ? 'full' : '3px'}
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
          <Skeleton w="80px" isLoaded={!isLoading} fadeDuration={1.2}>
            <Text
              fontSize="x-small"
              fontWeight="bold"
              letterSpacing="wide"
              casing="uppercase"
            >
              {subtitle}
            </Text>
          </Skeleton>
          <Skeleton my={2} isLoaded={!isLoading} fadeDuration={1.2}>
            <Heading as="h1" fontSize={{ base: '2xl', sm: '1.5em', lg: '2em' }}>
              {title}
            </Heading>
          </Skeleton>
          <Skeleton w="120px" isLoaded={!isLoading} fadeDuration={1.2}>
            <Text fontSize="x-small">{description}</Text>
          </Skeleton>
        </Flex>
      </Flex>
      <Box>{children}</Box>
    </Box>
  );
};
