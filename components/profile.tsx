import { FC, ReactNode } from 'react';
import {
  Box,
  BoxProps,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Image,
  Input,
  Skeleton,
  SkeletonCircle,
  Text,
  useToast,
} from '@chakra-ui/react';
import fetcher from '../lib/fetcher';

interface IProps extends BoxProps {
  id: string;
  children?: ReactNode;
  type: 'user' | 'playlist' | 'song' | 'artist';
  image: string;
  subtitle: string;
  title: string;
  description: string | ReactNode;
  isLoading?: boolean;
  roundImage?: boolean;
  isOwner?: boolean;
}

const Profile: FC<IProps> = ({
  id,
  type,
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
    // if (newName === )

    try {
      const response = await fetcher(`/put/${type}`, {
        data: {
          id,
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

  const uploadImage = async (e) => {
    const img = e.target.files[0];

    const formdata = new FormData();
    formdata.append('id', id);
    formdata.append('type', type);
    formdata.append('image', img);

    try {
      const resp = await fetch('/api/put/image', {
        method: 'PUT',
        body: formdata,
      });
      const response = await resp.json();

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
          position="relative"
          size={['60%', '140px']}
          isLoaded={!isLoading}
          fadeDuration={1.2}
          borderRadius={roundImage ? 'full' : '3px'}
        >
          <Input
            type="file"
            accept="image/png"
            pos="absolute"
            h="full"
            cursor="pointer"
            opacity={0}
            borderRadius={roundImage ? 'full' : '3px'}
            onChange={uploadImage}
          />
          <Image
            src={image}
            boxSize="full"
            boxShadow="2xl"
            borderRadius={roundImage ? 'full' : '3px'}
          />
        </SkeletonCircle>

        <Flex
          w="70%"
          direction="column"
          justify="center"
          align="center"
          p="20px"
          color="white"
        >
          <Skeleton w="80px" isLoaded={!isLoading} fadeDuration={1.2}>
            <Text
              fontSize="x-small"
              fontWeight="bold"
              letterSpacing="wide"
              casing="uppercase"
              textAlign="center"
            >
              {subtitle}
            </Text>
          </Skeleton>
          <Skeleton
            my={2}
            h={isLoading ? '2.5em' : 'auto'}
            w="full"
            textAlign="center"
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
            <Text fontSize="x-small" textAlign="center">
              {description}
            </Text>
          </Skeleton>
        </Flex>
      </Flex>
      <Box>{children}</Box>
    </Box>
  );
};

export default Profile;
