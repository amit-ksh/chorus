import NextImage from 'next/image';
import {
  IconButton,
  Avatar,
  Flex,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Heading,
  HStack,
  VStack,
  Box,
  Text,
} from '@chakra-ui/react';
import { FiChevronDown, FiMenu } from 'react-icons/fi';
import { useMe } from '../lib/hooks';

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const Header = ({ onOpen, ...rest }: MobileProps) => {
  const { user } = useMe();

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      bg="black"
      color="white"
      alignItems="center"
      borderBottomWidth="1px"
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        color="green.500"
        borderWidth="3px"
        borderColor="green.400"
        borderRadius="50%"
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        _hover={{
          color: 'white',
          bg: 'green.500',
        }}
        icon={<FiMenu />}
      />

      <Heading
        as="h1"
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        <NextImage src="/logo.svg" alt="logo" height={60} width={120} />
      </Heading>

      <Menu>
        <MenuButton
          p={1}
          transition="all 0.3s"
          borderRadius="full"
          _hover={{
            boxShadow: '0 0 4px 2px var(--chakra-colors-green-400)',
          }}
          _focus={{
            boxShadow: '0 0 4px 2px var(--chakra-colors-green-400)',
          }}
        >
          <HStack>
            <Avatar
              size="sm"
              src={`https://picsum.photos/400?random=${user?.id}`}
            />

            <VStack
              display={{ base: 'none', md: 'flex' }}
              px={2}
              alignItems="flex-start"
              spacing="1px"
              ml="2"
            >
              <Text fontSize="sm">{user?.firstName || ''}</Text>
            </VStack>
            <Box display={{ base: 'none', md: 'flex' }}>
              <FiChevronDown />
            </Box>
          </HStack>
        </MenuButton>
        <MenuList
          mt={2}
          mr={2}
          px={2}
          bg="black"
          boxShadow="-1px -1px 4px 0 var(--chakra-colors-gray-400)"
          sx={{
            button: {
              bg: 'black',
              borderRadius: 'md',
            },
          }}
        >
          <MenuItem _hover={{ bg: 'green.400' }} _focus={{ bg: 'green.400' }}>
            Profile
          </MenuItem>
          <MenuDivider />
          <MenuItem
            color="red"
            _hover={{ bg: 'red.500', color: 'white' }}
            _focus={{ bg: 'red.500', color: 'white' }}
          >
            Sign out
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Header;
