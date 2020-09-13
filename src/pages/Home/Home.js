import React from "react";
import { Box, SimpleGrid, useTheme, useColorMode } from "@chakra-ui/core";

function Card(bg) {
  return (
    <Box h="200px" bg={bg} borderRadius="6px" p=".5rem">
      teste
    </Box>
  );
}

export default () => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  const cards = [];
  for (let i = 0; i < 15; i++) {
    cards.push(Card(colors.mainComponentBg[colorMode]));
  }

  return (
    <Box p={5}>
      <SimpleGrid columns={1} spacing={5}>
        {cards}
      </SimpleGrid>
    </Box>
  );
};
