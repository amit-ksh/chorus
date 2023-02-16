import { FC } from 'react';
import NextLink from 'next/link';
import NextImage from 'next/image';
import { useRouter } from 'next/router';
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
  Link,
  SkeletonCircle,
  Skeleton,
} from '@chakra-ui/react';
import { FiChevronDown, FiMenu } from 'react-icons/fi';

import { useMe } from '../lib/hooks';
import { auth } from '../lib/mutations';

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const Header: FC<MobileProps> = ({ onOpen, ...rest }) => {
  const { user, isLoading } = useMe();

  const router = useRouter();

  const handleSignOut = async () => {
    await auth('signout', {});
    router.push('/signin');
  };

  return (
    <Flex
      zIndex={99}
      position="sticky"
      top={0}
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
        color="purple.500"
        borderWidth="3px"
        borderColor="purple.400"
        borderRadius="50%"
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        _hover={{
          color: 'white',
          bg: 'purple.500',
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
            boxShadow: '0 0 4px 2px var(--chakra-colors-purple-400)',
          }}
          _focus={{
            boxShadow: '0 0 4px 2px var(--chakra-colors-purple-400)',
          }}
        >
          <HStack>
            {isLoading ? (
              <SkeletonCircle />
            ) : (
              <Avatar
                size="sm"
                src={`https://picsum.photos/400?random=${user?.id}`}
              />
            )}

            <VStack
              display={{ base: 'none', md: 'flex' }}
              px={2}
              alignItems="flex-start"
              spacing="1px"
              ml="2"
            >
              {isLoading ? (
                <Skeleton w="75px" h={6} />
              ) : (
                <Text fontSize="sm">{user?.firstName || ''}</Text>
              )}
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
          boxShadow="-1px -1px 4px 0 var(--chakra-colors-purple-400)"
          sx={{
            button: {
              bg: 'black',
              borderRadius: 'md',
            },
          }}
        >
          <MenuItem
            p={0}
            _hover={{ bg: 'purple.400' }}
            _focus={{ bg: 'purple.400' }}
          >
            <Link
              as={NextLink}
              href="/user"
              w="full"
              py={1.5}
              px={3}
              _hover={{ textDecor: 'none' }}
            >
              Profile
            </Link>
          </MenuItem>
          <MenuDivider />
          <MenuItem
            color="red"
            _hover={{ bg: 'red.500', color: 'white' }}
            _focus={{ bg: 'red.500', color: 'white' }}
            onClick={handleSignOut}
          >
            Sign out
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Header;
