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
      <Link data-active={isActive('/')} href="/">
        💸
      </Link>
      </Box>
  );

  let right = null;

  if (status === 'loading') {
    left = (
      <div className="left">
        <Link data-active={isActive('/')} href="/">
          💸
        </Link>
      </div>
    );
    right = (
      <Box>
        <Text>Validating session ...</Text>
      </Box>
    );
  }

  if (!session) {
    right = (
      <Button colorScheme='whatsapp'>
        <Link data-active={isActive('/signup')} href="/api/auth/signin">
         Login
        </Link>
      </Button>
    );
  }

  if (session) {
    left = (
      <Box>
        <Text size={"lg"}>
          <Link data-active={isActive('/')} href="/">
            💸
          </Link>
        </Text>
      </Box>
    )
    right = (
      <HStack>
          <Text>
            {session.user.name}
          </Text>
        <Menu>
          <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon />}
              variant='outline'
            />
          <MenuList>
            <MenuItem as='a' href='/transactions' >See transactions</MenuItem>
            <MenuItem onClick={() => signOut()}>Log Out</MenuItem>
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