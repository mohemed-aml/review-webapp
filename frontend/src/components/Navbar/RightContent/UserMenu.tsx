// frontend/src/components/RightContent/UserMenu.tsx
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Icon, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoSparkles } from "react-icons/io5";
import { MdOutlineLogin } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { auth } from "../../../firebase/firebaseConfig"; // Adjust path as per your structure
import { openModal } from "../../../redux/slices/authModalSlice"; // Redux action to open modal
import { logout } from "../../../redux/slices/authSlice"; // Redux action to log out

// Modify UserMenu to use SerializableUser type
type SerializableUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

type UserMenuProps = {
  user?: SerializableUser | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await signOut(auth); // Sign out from Firebase
    dispatch(logout());  // Dispatch the Redux action to reset the auth state
  };

  return (
    <Menu>
      <MenuButton cursor="pointer" padding="0px 6px" borderRadius={4} _hover={{ outline: '1px solid', outlineColor: 'gray.200' }}>
        <Flex align="center">
          <Flex align="center">
            {user ? (
              <>
                <Flex
                  direction="column"
                  display={{ base: 'none', lg: 'flex' }}
                  fontSize={12}
                  align="flex-start"
                  mr={4}
                >
                  <Text>{user.displayName || user.email?.split('@')[0]}</Text>
                  <Flex align="center">
                    <Icon as={IoSparkles} color="brand.100" mr={1} />
                    <Text color="gray.400">1 karma</Text> {/* You can replace this with actual user data */}
                  </Flex>
                </Flex>
              </>
            ) : (
              <Icon as={VscAccount} fontSize={24} color="gray.400" mr={1} />
            )}
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem color='gray.600' fontSize={12} fontWeight={700} _hover={{ bg: 'gray.600', color: 'white' }}>
              <Flex align="center">
                <Icon as={CgProfile} fontSize={20} mr={2} />
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize={12} color='gray.600'
              fontWeight={700}
              _hover={{ bg: 'gray.600', color: 'white' }}
              onClick={handleLogout}
            >
              <Flex align="center">
                <Icon as={MdOutlineLogin} fontSize={20} mr={2} />
                Log Out
              </Flex>
            </MenuItem>
          </>
        ) : (
          <MenuItem
            fontSize={12}
            fontWeight={700}
            _hover={{ bg: 'blue.500', color: 'white' }}
            onClick={() => dispatch(openModal({ view: 'login' }))}
          >
            <Flex align="center">
              <Icon as={MdOutlineLogin} fontSize={20} mr={2} />
              Log In/Sign Up
            </Flex>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default UserMenu;