import {
  Box,
  Flex,
  Img,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from '@chakra-ui/react';
import fetcher from '../lib/fetcher';
import { formatDate } from '../lib/formatter';
import { useUserPlaylist } from '../lib/hooks';

interface IProps {
  songId: string;
  isOpen: boolean;
  onClose: () => void;
}

const AddSongToPlaylistModal = ({ songId, isOpen, onClose }: IProps) => {
  const { playlists, isLoading } = useUserPlaylist();

  const toast = useToast();
  const TOASTID = 'add-song';

  const addSong = async (playlistId: string) => {
    onClose();

    try {
      const response = await fetcher('/put/playlist/song/add', {
        playlistId,
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select playlist</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" gap={2}>
            {!isLoading &&
              playlists.map((playlist) => (
                <Box
                  key={playlist.id}
                  pl="2"
                  borderRadius="4px"
                  bg="purple.500"
                  cursor="pointer"
                  onClick={() => addSong(playlist.id)}
                >
                  <Flex
                    align="center"
                    justify="space-between"
                    bg="gray.900"
                    borderRadius="4px"
                    px="4"
                    py="2"
                  >
                    <Flex align="center">
                      <Box>
                        <Img
                          boxSize="16"
                          src={`https://picsum.photos/400?random=${playlist.id}`}
                          borderRadius="3px"
                          boxShadow={
                            '2px 1px 5px var(--chakra-colors-purple-400)'
                          }
                        />
                      </Box>
                      <Box ml={6}>
                        <Text fontSize="1.3em" color="white">
                          {playlist.name}
                        </Text>

                        <Text fontSize="x-small">
                          <Text as="span" fontWeight="semibold">
                            Updated At:
                          </Text>{' '}
                          {formatDate(playlist.updatedAt).split('T')[0]}
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                </Box>
              ))}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddSongToPlaylistModal;
