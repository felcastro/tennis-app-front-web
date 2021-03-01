import React from "react";
import PropTypes from "prop-types";
import { Box, Stack, useTheme, useColorMode, Divider } from "@chakra-ui/react";

export default () => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  const cards = [
    { id: 1, name: "Teste A" },
    { id: 2, name: "Teste B" },
    { id: 3, name: "Teste C" },
  ];

  const cardObjects = cards.map((c) => (
    <Card
      borderRadius="4px"
      p=".5rem"
      flex={1}
      bg={colors.mainComponentBg[colorMode]}
    >
      {c.name}
    </Card>
  ));

  function Card(props) {
    const { children, ...chakraProps } = props;
    return <Box {...chakraProps}>{children}</Box>;
  }

  Card.propTypes = {
    children: PropTypes.any.isRequired,
  };

  return (
    <Box maxW="46rem" px={4} py={4} flex={1}>
      <Stack spacing={4}>{cardObjects}</Stack>
      <Divider my={4} />
      <Stack isInline spacing={4}>
        {cardObjects}
      </Stack>
    </Box>
  );
};
