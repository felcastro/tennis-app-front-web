import React from "react";
import {
  Box,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useTheme,
  useColorMode,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";

import MainMenu from "../MainMenu";
import "../SidebarMenu/SidebarMenu.css";

export default function MenuSwitchButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  return (
    <>
      <Box
        as={FaBars}
        display={{ base: "block", md: "none" }}
        fontSize="xl"
        cursor="pointer"
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent
            bg={colors.sidebarBg[colorMode]}
            color={colors.mainFont[colorMode]}
            width="14rem !important"
          >
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody p={0} className="custom-scroll">
              <MainMenu onClose={onClose} />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
