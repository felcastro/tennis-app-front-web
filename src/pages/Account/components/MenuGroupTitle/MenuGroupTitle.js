import React from "react";
import PropTypes from "prop-types";
import {
  Heading,
  Text,
  ListItem,
  useTheme,
  useColorMode,
} from "@chakra-ui/react";

export default function MenuGroupTitle({ title, subtitle }) {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  return (
    <ListItem
      py={2}
      mt={6}
      borderBottom="1px solid"
      borderColor={colors.mainBorder[colorMode]}
    >
      <Heading
        as="h2"
        fontSize={{ base: "2xl", md: "3xl" }}
        fontWeight="normal"
      >
        {title}
      </Heading>
      <Text as="p" lineHeight="none" fontSize="sm">
        {subtitle}
      </Text>
    </ListItem>
  );
}

MenuGroupTitle.defaultProps = {
  subtitle: "",
};

MenuGroupTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};
