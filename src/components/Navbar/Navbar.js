import React from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { FaCommentDots, FaReact, FaBars } from "react-icons/fa";

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
        fontSize="xl"
      >
        <Stack isInline align="center">
          <MenuSwitchButton />
          <Link as={RouterLink} to="/" _hover={{ textDecoration: "none" }}>
            <Flex align="center">
              <Box as={FaReact} size="2.5rem" mr={1}></Box>
              <Box display={{ base: "none", md: "block" }}>TennisApp</Box>
            </Flex>
          </Link>
        </Stack>

        <Stack isInline spacing={5} align="center">
          <Link as={RouterLink} to="/">
            <Box as={FaCommentDots} size="2.5rem"></Box>
          </Link>
          <Avatar src={user.pictureUrl} name={user.name} />
        </Stack>
      </Flex>
    </Box>
  );
};
