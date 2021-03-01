import React from "react";
import { Box, useColorMode, useTheme } from "@chakra-ui/react";

import "./SidebarMenu.css";
import MainMenu from "../MainMenu";

export default function SidebarMenu() {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  return (
    <Box
      position="fixed"
      left={0}
      top={0}
      right={0}
      w="100%"
      h="100%"
      maxW="14rem"
      display={{ base: "none", md: "block" }}
    >
      <Box
        className="custom-scroll"
        top="4rem"
        position="relative"
        bg={colors.sidebarBg[colorMode]}
        overflowY="auto"
        h="calc(100vh - 4rem)"
      >
        <MainMenu />
      </Box>
    </Box>
  );
}
