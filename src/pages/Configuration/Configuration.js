import React from "react";
import { Box, Button, useTheme, useColorMode } from "@chakra-ui/core";

export default () => {
  const { colors } = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box maxW="46rem" px={4} py={3}>
      <Button size="sm" onClick={toggleColorMode}>
        Toggle Mode
      </Button>
    </Box>
  );
};
