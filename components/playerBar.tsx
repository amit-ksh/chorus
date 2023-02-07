import { FC } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useStoreState } from 'easy-peasy';
import Player from './player';

const PlayerBar: FC<{ bg: string }> = ({ bg }) => {
  const songs = useStoreState((state: any) => state.activeSongs);
  const activeSong = useStoreState((state: any) => state.activeSong);

  return (
    <Box h="100px" w="100vw" bg={bg} pt={2} opacity="0.9">
      <Flex align="center">
        {activeSong ? (
          <Box w="30%" p={5} color="white" justifySelf="flex-start">
            <Text>{activeSong.name}</Text>
            <Text fontSize="sm">{activeSong.artist.name}</Text>
          </Box>
        ) : null}
        <Box justifySelf="center" w="45%">
          {activeSong ? <Player songs={songs} activeSong={activeSong} /> : null}
        </Box>
      </Flex>
    </Box>
  );
};

export default PlayerBar;
