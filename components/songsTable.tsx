import { FC } from 'react';
import {
  Box,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { useStoreActions } from 'easy-peasy';

import { formatDate, formatTime } from '../lib/formatter';

interface SongsTableProps {
  songs: Array<{
    id: string;
    name: string;
    createdAt: Date;
    duration: number;
    url: string;
  }>;
  hasPlayButton?: boolean;
}

const SongsTable: FC<SongsTableProps> = ({ songs, hasPlayButton = true }) => {
  const playSongs = useStoreActions(
    (actions: any) => actions.changeActiveSongs
  );
  const setActiveSong = useStoreActions(
    (actions: any) => actions.changeActiveSong
  );

  const handlePlay = (activeSong?) => {
    setActiveSong(activeSong || songs[0]);
    playSongs(songs);
  };

  return (
    <Box
      minH="60vh"
      bgGradient="linear(#12121288 0%, #121212dd 100%)"
      color="white"
    >
      <Box px={6} py={8}>
        {hasPlayButton && (
          <Box mb="30px">
            <IconButton
              icon={<BsFillPlayFill color="black" fontSize="30px" />}
              aria-label="play"
              bg="purple.500"
              _hover={{ bg: 'purple.400' }}
              _focus={{ bg: 'purple.400' }}
              size="lg"
              isRound
              onClick={() => handlePlay()}
            />
          </Box>
        )}
        <Table variant="unstyled">
          <Thead
            borderBottom="1px solid"
            borderColor="rgba(255, 255, 255, 0.2)"
          >
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Date Added</Th>
              <Th>
                <AiOutlineClockCircle size="18px" />
              </Th>
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
                <Td>{formatDate(song.createdAt)}</Td>
                <Td>{formatTime(song.duration)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default SongsTable;
