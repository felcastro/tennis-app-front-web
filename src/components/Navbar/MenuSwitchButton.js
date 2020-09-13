import React from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useTheme,
  useColorMode,
} from "@chakra-ui/core";
import { FaBars } from "react-icons/fa";

import MainMenu from "../MainMenu";

export default () => {
  const ButtonWithDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const { colors } = useTheme();
    const { colorMode } = useColorMode();
    return (
      <Box display={{ base: "block", md: "none" }}>
        <Box
          as={FaBars}
          fontSize="xl"
          mr={4}
          cursor="pointer"
          onClick={onOpen}
          ref={btnRef}
        />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
          size="14rem"
        >
          <DrawerOverlay />
          <DrawerContent
            bg={colors.sidebarBg[colorMode]}
            color={colors.mainFont[colorMode]}
          >
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody p={0}>
              <MainMenu />
            </DrawerBody>
            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    );
  };

  const ButtonWithoutDrawer = () => {
    return (
      <Box display={{ base: "none", md: "block" }}>
        <Box as={FaBars} fontSize="xl" mr={4} cursor="pointer" />
      </Box>
    );
  };

  return (
    <Box>
      <ButtonWithDrawer />
      <ButtonWithoutDrawer />
    </Box>
  );
};
