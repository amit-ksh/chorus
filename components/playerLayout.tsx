import { Box } from '@chakra-ui/layout';
import PlayerBar from './playerBar';
import Sidebar from './sidebar';

const PlayerLayout = ({ children }) => {
  return (
    <Box>
      <Sidebar>
        {/* PAGE CONTENT */}
        <Box pb="14%">{children}</Box>

        {/* MUSIC PLAYER  */}
        <Box position="fixed" left="0" bottom="0" zIndex={999}>
          <PlayerBar />
        </Box>
      </Sidebar>
    </Box>
  );
};

export default PlayerLayout;
