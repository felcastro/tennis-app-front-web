import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import {
  Heading,
  Text,
  ListItem,
  Link,
  useTheme,
  useColorMode,
} from "@chakra-ui/react";

export default function MenuLink({ to, title, subtitle }) {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  return (
    <ListItem
      borderBottom="1px solid"
      borderColor={colors.mainBorder[colorMode]}
    >
      <Link
        as={RouterLink}
        to={to}
        py={4}
        _hover={{
          bg: colors.mainBgSelected[colorMode],
          textDecoration: "none",
        }}
        _focus={{ bg: colors.mainBgSelected[colorMode] }}
        display="block"
      >
        <Heading as="h3" fontSize={{ base: "lg", md: "xl" }}>
          {title}
        </Heading>
        <Text as="p" lineHeight="none" fontSize="sm">
          {subtitle}
        </Text>
      </Link>
    </ListItem>
  );
}

MenuLink.defaultProps = {
  subtitle: "",
};

MenuLink.propTypes = {
  to: PropTypes.instanceOf(Link).isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};
