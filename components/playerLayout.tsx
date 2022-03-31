import { Box } from "@chakra-ui/layout";
import PlayerBar from "./playerBar";
import Sidebar from "./sidebar";

const PlayerLayout = ({ children }) => {
  return (
    <Box w="100vw" h="100vh">
      <Box position="absolute" top="0" left="0" w="250px">
        <Sidebar />
      </Box>
      <Box ml="250px" mb="100px">
        <Box h="calc(100vh - 100px)">{children}</Box>
      </Box>
      <Box position="absolute" left="0" bottom="0">
        <PlayerBar />
      </Box>
    </Box>
  );
};

export default PlayerLayout;
