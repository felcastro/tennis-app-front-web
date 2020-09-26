import React from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Box,
  useTheme,
  useColorMode,
  Flex,
  Link,
  Stack,
} from "@chakra-ui/core";
import { FaCommentDots } from "react-icons/fa";
import { IoIosTennisball } from "react-icons/io";

import MenuSwitchButton from "./MenuSwitchButton";

export default () => {
  const user = useSelector((state) => state.user);
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  return (
    <Box
      as="header"
      w="100%"
      h="4rem"
      bg={colors.navbarBg[colorMode]}
      position="fixed"
      borderBottom="0.0625rem solid"
      borderColor={colors.mainBorder[colorMode]}
      zIndex={4}
    >
      <Flex
        h="100%"
        w="100%"
        px={4}
        align="center"
        justify="space-between"
        fontWeight="bold"
        fontSize={{ base: "2xl", md: "3xl" }}
      >
        <Stack isInline align="center">
          <MenuSwitchButton />
          <Link as={RouterLink} to="/" _hover={{ textDecoration: "none" }}>
            <Flex align="center">
              <Box as={IoIosTennisball} size="2.5rem" mr={1} color="#c9f364" />
              <Box display={{ base: "none", md: "block" }}>TennisApp</Box>
            </Flex>
          </Link>
        </Stack>

        <Stack isInline spacing={{ base: 0, md: 5 }} align="center">
          <Link as={RouterLink} to="/">
            <Box as={FaCommentDots}></Box>
          </Link>
          <Avatar
            src={user.pictureUrl}
            name={user.name}
            display={{ base: "none", md: "block" }}
          />
        </Stack>
      </Flex>
    </Box>
  );
};
