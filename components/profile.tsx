import { FC, ReactNode } from 'react';
import {
  Box,
  BoxProps,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Image,
  Skeleton,
  SkeletonCircle,
  Text,
  useToast,
} from '@chakra-ui/react';
import fetcher from '../lib/fetcher';

interface IProps extends BoxProps {
  children?: ReactNode;
  resourceName: 'user' | 'playlist' | 'song';
  image: string;
  subtitle: string;
  title: string;
  description: string | ReactNode;
  isLoading?: boolean;
  roundImage?: boolean;
  isOwner?: boolean;
}

const Profile: FC<IProps> = ({
  resourceName,
  image,
  subtitle,
  title,
  description,
  isLoading = false,
  roundImage = false,
  isOwner = false,
  children,
  ...rest
}) => {
  const toast = useToast();
  const TOASTID = 'update-toast';

  const handleNameChange = async (newName: string) => {
    try {
      const response = await fetcher(`/put/${resourceName}`, {
        data: {
          id: rest.id,
          name: newName,
        },
      });

      if (response.error) {
        throw new Error(response.error);
      } else {
        if (!toast.isActive(TOASTID)) {
          toast({
            id: TOASTID,
            title: response.message,
            status: 'success',
            duration: 5000,
            position: 'top',
          });
        }
      }
    } catch (error) {
      if (!toast.isActive(TOASTID)) {
        toast({
          id: TOASTID,
          title: error.message,
          status: 'error',
          duration: 5000,
          position: 'top',
        });
      }
    }
  };

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
          w="70%"
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
          <Skeleton
            my={2}
            h={isLoading ? '2.5em' : 'auto'}
            w="full"
            isLoaded={!isLoading}
            fadeDuration={1.2}
          >
            <Editable
              fontSize="2.5em"
              defaultValue={title || 'Playlist Name'}
              placeholder="Playlist Name"
              isDisabled={!isOwner} // if true, editing will be disabled
              onSubmit={handleNameChange}
            >
              <EditablePreview />
              <EditableInput
                _focusVisible={{
                  boxShadow: '0 0 0 2px var(--chakra-colors-purple-400)',
                }}
              />
            </Editable>
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

export default Profile;
