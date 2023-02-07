import { FC, ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import { useStoreState } from 'easy-peasy';

import PlayerBar from './playerBar';
import Sidebar from './sidebar';

const PlayerLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const activeSong = useStoreState((state: any) => state.activeSong);

  return (
    <Box>
      <Sidebar>
        {/* PAGE CONTENT */}
        <Box>{children}</Box>

        {/* MUSIC PLAYER  */}
        <Box
          pos="fixed"
          left="0"
          bottom="0"
          transform={activeSong ? 'translateY(0)' : 'translateY(100%)'}
          transition="ease-in-out 500ms"
          zIndex={999}
        >
          <PlayerBar bg="black" />
        </Box>
      </Sidebar>
    </Box>
  );
};

export default PlayerLayout;
