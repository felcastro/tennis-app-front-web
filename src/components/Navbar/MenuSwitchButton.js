import React from "react";
import { useSelector, useDispatch } from "react-redux";
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

import "../SidebarMenu/SidebarMenu.css";

export default () => {
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
          <DrawerBody p={0} className="custom-scroll" overflowY="auto">
            <MainMenu />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
