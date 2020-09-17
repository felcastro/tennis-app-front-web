import React from "react";
import { Box, SimpleGrid, useTheme, useColorMode } from "@chakra-ui/core";

function Card(bg) {
  return (
    <Box h="200px" bg={bg} borderRadius="4px" p=".5rem">
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
    <Box maxW="46rem" px={4} py={3} flex={1}>
      <SimpleGrid columns={1} spacing={4}>
        {cards}
      </SimpleGrid>
    </Box>
  );
};
