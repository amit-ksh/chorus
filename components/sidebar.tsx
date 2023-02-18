import { ReactNode } from 'react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import {
  MdHome,
  MdSearch,
  MdPlaylistAdd,
  MdFavorite,
  MdLibraryMusic,
} from 'react-icons/md';
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  LinkBox,
  LinkOverlay,
  Divider,
  Heading,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';

import Header from './header';
import { useRouter } from 'next/router';

interface LinkItemProps {
  name: string;
  icon: IconType;
  route: string;
}
const LinkItems: Array<LinkItemProps> = [
  {
    name: 'Home',
    icon: MdHome,
    route: '/',
  },
  {
    name: 'Search',
    icon: MdSearch,
    route: '/search',
  },
  {
    name: 'Your Library',
    icon: MdLibraryMusic,
    route: '/user#playlists',
  },
];

const musicMenu: Array<LinkItemProps> = [
  {
    name: 'Create Playlist',
    icon: MdPlaylistAdd,
    route: '/playlist/create',
  },
  {
    name: 'Favorites',
    icon: MdFavorite,
    route: '/favorite',
  },
];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh">
      {/* SIDEBAR FOR BIG SCREEN */}
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />

      {/* SIDEBAR FOR MOBILE OR TABLET */}
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        blockScrollOnMount={false}
        size="md"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* HEADER */}
      <Header onOpen={onOpen} />

      {/* BODY */}
      <Box ml={{ base: 0, md: 60 }}>{children}</Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg="black"
      color="white"
      borderRight="1px"
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Heading
          as="h1"
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
        >
          <NextImage src="/logo.svg" alt="logo" height={60} width={120} />
        </Heading>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

      {/* LINKS */}
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          route={link.route}
          onClose={onClose}
        >
          {link.name}
        </NavItem>
      ))}
      <Divider my={4} />
      {musicMenu.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          route={link.route}
          onClose={onClose}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  route: string;
  children: ReactNode;
  onClose: () => void;
}
const NavItem = ({ icon, route, children, onClose, ...rest }: NavItemProps) => {
  const router = useRouter();

  return (
    <LinkBox onClick={onClose}>
      <LinkOverlay
        as={NextLink}
        href={route}
        fontWeight="semibold"
        display="flex"
        alignItems="center"
        p={4}
        mx={4}
        my={2}
        borderRadius="lg"
        _hover={{
          bg: 'purple.400',
          color: 'white',
        }}
        _focus={{
          bg: 'purple.400',
          color: 'white',
        }}
        bg={router.pathname === route && 'purple.500'}
        passHref
      >
        <Flex align="center" role="group" cursor="pointer" {...rest}>
          {icon && (
            <Icon
              mr="4"
              boxSize="6"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </LinkOverlay>
    </LinkBox>
  );
};
