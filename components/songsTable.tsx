import { FC } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { useStoreActions } from 'easy-peasy';
import { MdDelete, MdDeleteOutline } from 'react-icons/md';
import { useRouter } from 'next/router';

import { formatDate, formatTime } from '../lib/formatter';
import DeleteConfirmationModal from './deleteConfirmationModal';
import fetcher from '../lib/fetcher';

interface SongsTableProps {
  songs: Array<{
    id: string;
    name: string;
    createdAt: Date;
    duration: number;
    url: string;
  }>;
  isEditable?: boolean;
}

const SongsTable: FC<SongsTableProps> = ({ songs, isEditable = false }) => {
  const playSongs = useStoreActions(
    (actions: any) => actions.changeActiveSongs
  );
  const setActiveSong = useStoreActions(
    (actions: any) => actions.changeActiveSong
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const toast = useToast();
  const TOASTID = 'remove-song';

  const handlePlay = (activeSong?) => {
    setActiveSong(activeSong || songs[0]);
    playSongs(songs);
  };

  const removeSong = async (e, songId) => {
    e.stopPropagation();

    try {
      const response = await fetcher('/put/playlist/song/remove', {
        playlistId: router.query.id,
        songId,
      });

      if (response.error) {
        throw new Error(response.error);
      }

      if (!toast.isActive(TOASTID)) {
        toast({
          id: TOASTID,
          title: response.message,
          status: 'success',
          duration: 5000,
          position: 'top',
        });
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
    <Box
      minH="60vh"
      bgGradient="linear(#12121288 0%, #121212dd 100%)"
      color="white"
    >
      <DeleteConfirmationModal
        itemId={router.query.id as string}
        isOpen={isOpen}
        onClose={onClose}
      />

      <Box px={6} py={8}>
        {songs.length > 0 && (
          <Flex align="center" mb="30px">
            <IconButton
              mr={4}
              icon={<BsFillPlayFill color="black" fontSize="30px" />}
              aria-label="play"
              bg="purple.500"
              _hover={{ bg: 'purple.400' }}
              _focus={{ bg: 'purple.400' }}
              size="lg"
              isRound
              onClick={() => handlePlay()}
            />

            {isEditable && (
              <IconButton
                icon={<MdDeleteOutline />}
                size="lg"
                bg="transparent"
                color="red"
                aria-label="delete playlist"
                _hover={{
                  bg: 'transparent',
                  transform: 'scale(1.1)',
                }}
                _focus={{
                  bg: 'transparent',
                  transform: 'scale(1.1)',
                }}
                onClick={onOpen}
              />
            )}
          </Flex>
        )}
        <Table variant="unstyled">
          <Thead
            borderBottom="1px solid"
            borderColor="rgba(255, 255, 255, 0.2)"
          >
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th
                display={{
                  base: 'none',
                  md: 'table-cell',
                }}
              >
                Date Added
              </Th>
              <Th>
                <AiOutlineClockCircle size="18px" />
              </Th>
              {isEditable && (
                <Th>
                  <IconButton
                    icon={<MdDelete />}
                    bg="transparent"
                    color="red"
                    aria-label="remove icon"
                  />
                </Th>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song, i) => (
              <Tr
                sx={{
                  transition: 'all .3s',
                  '&:hover': {
                    bg: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
                key={song.id}
                cursor="pointer"
                onClick={() => handlePlay(song)}
              >
                <Td>{i + 1}</Td>
                <Td>{song.name}</Td>
                <Td
                  display={{
                    base: 'none',
                    md: 'table-cell',
                  }}
                >
                  {formatDate(song.createdAt)}
                </Td>
                <Td>{formatTime(song.duration)}</Td>
                {isEditable && (
                  <Td>
                    <IconButton
                      icon={<MdDeleteOutline />}
                      bg="transparent"
                      color="red"
                      aria-label="remove song"
                      onClick={(e) => removeSong(e, song.id)}
                    />
                  </Td>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default SongsTable;
