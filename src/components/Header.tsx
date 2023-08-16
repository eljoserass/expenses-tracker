import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { Box, Button, Flex, HStack, IconButton, ListIcon, Menu, MenuButton, MenuItem, MenuList, Spacer, Text } from '@chakra-ui/react';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons'


const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <Box>
      <Text fontSize={"4xl"}>
        <Link data-active={isActive('/')} href="/">
          💸
        </Link>
      </Text>
    </Box>
  );

  let right = null;

  if (status === 'loading') {
    left = (
      <Box padding={3}>
        <Text fontSize={"4xl"}>
          <Link data-active={isActive('/')} href="/">
            💸
          </Link>
        </Text>
      </Box>
    );
    right = (
      <Box padding={3}>
        <Text>Validating session ...</Text>
      </Box>
    );
  }

  if (!session) {
    right = (
      <Box padding={5}>
        <Text color="green.400" as="u">
          <Link data-active={isActive('/signup')} href="/api/auth/signin">
            Login
          </Link>
        </Text>
      </Box>
    );
  }

  if (session) {
    left = (
      <Box padding={3}>
        <Text fontSize={"4xl"}>
          <Link data-active={isActive('/')} href="/">
            💸
          </Link>
        </Text>
      </Box>
    )
    right = (
      <HStack>
          <Box>
            <Text as='b'>
              {session.user.name}
            </Text>
          </Box>

        <Menu>
          <Box padding={3}>
          <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon />}
              variant='outline'
            />
          </Box>
          <MenuList>
            <MenuItem as='a' href='/transactions' >See transactions</MenuItem>
            <MenuItem textColor={"tomato"} onClick={() => signOut()}>Log Out</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    );
  }

  return (
    <Flex>
      {left}
      <Spacer/>
      {right}
    </Flex>
  );
};

export default Header;