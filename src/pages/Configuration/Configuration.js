import React from "react";
import { Box, Button, useTheme, useColorMode } from "@chakra-ui/core";

export default () => {
  const { colors } = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box p={5}>
      <Button size="sm" onClick={toggleColorMode}>
        Toggle Mode
      </Button>
    </Box>
  );
};
