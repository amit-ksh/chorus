import { FC, useState } from 'react';
import {
  Box,
  Flex,
  FlexProps,
  Heading,
  IconButton,
  Text,
  useToast,
} from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import fetcher from '../lib/fetcher';

interface IProps extends FlexProps {
  item: {
    id: string;
    likes: number;
  };
  userFavorite: boolean;
  type: 'Song' | 'Playlist';
  isDisabled?: boolean;
}

const FavoriteButton: FC<IProps> = ({
  item,
  userFavorite,
  type = 'Song',
  isDisabled = false,
  ...rest
}) => {
  const [favorite, setFavorite] = useState<boolean>(userFavorite);
  const [likes, setLikes] = useState<number>(item.likes);

  const toast = useToast();
  const TOASTID = 'fav-toast';

  const makeFavorite = async () => {
    setLikes((v) => (!favorite ? v + 1 : v - 1));
    setFavorite((v) => !v);

    try {
      const response = await fetcher(`/put/favorite${type}`, {
        id: item.id,
        favorite: !favorite,
      });

      if (response.error) {
        // undo the changes
        setFavorite((v) => !v);
        setLikes((v) => (favorite ? v + 1 : v - 1));

        throw new Error(response.error);
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
    <Flex align="center" color="gray.300" {...rest}>
      <Heading as="h3" w="100px">
        {likes}{' '}
        <Text as="span" fontSize="md">
          likes
        </Text>
      </Heading>

      <Box alignSelf="flex-end" ml={4}>
        <IconButton
          bg="transparent"
          color="red"
          fontSize="25px"
          aria-label="like"
          icon={favorite ? <AiFillHeart /> : <AiOutlineHeart />}
          _hover={{ bg: 'transparent' }}
          _focus={{ bg: 'transparent' }}
          _disabled={{ cursor: 'default' }}
          onClick={makeFavorite}
          isDisabled={isDisabled}
        />
      </Box>
    </Flex>
  );
};

export default FavoriteButton;
