import { FC } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import { MdCancel, MdDelete } from 'react-icons/md';
import fetcher from '../lib/fetcher';
import { useRouter } from 'next/router';

interface IProps {
  itemId: string;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteModal: FC<IProps> = ({ itemId, isOpen, onClose }) => {
  const router = useRouter();

  const toast = useToast();
  const TOASTID = 'delete-toast';

  const handleDelete = async () => {
    onClose();

    try {
      const response = await fetcher('/delete/playlist', {
        data: {
          id: itemId,
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
            containerStyle: {
              bg: 'red',
              color: 'white',
            },
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
    } finally {
      router.push({ pathname: '/user' });
    }
  };

  return (
    <Modal onClose={onClose} size="sm" isOpen={isOpen} isCentered>
      <ModalOverlay bg="blackAlpha.300" />
      <ModalContent>
        <ModalHeader>
          Are you sure, you want to delete this playlist?
        </ModalHeader>
        <ModalBody>
          <Button
            leftIcon={<MdDelete />}
            colorScheme="red"
            mr={4}
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button leftIcon={<MdCancel />} onClick={onClose}>
            Cancel
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
