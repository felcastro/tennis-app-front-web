import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabList,
  Tab,
  Stack,
  Flex,
  Spinner,
  SimpleGrid,
} from "@chakra-ui/core";

import PlaceCard from "./components/PlaceCard";
import placeService from "../../services/placeService";

export default function Places() {
  const [isLoading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [places, setPlaces] = useState([]);

  async function onTabIndexChange(index) {
    setLoading(true);
    setLoadError(false);

    try {
      const data = await placeService.list();

      setPlaces(
        data.map((place) => <PlaceCard place={place} key={place.id} />)
      );
    } catch (err) {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    onTabIndexChange(0);
  }, []);

  return (
    <Stack maxW="46rem" px={4} py={3} flex={1}>
      <Tabs isFitted onChange={(index) => onTabIndexChange(index)}>
        <TabList>
          <Tab fontSize={{ base: "sm", md: "inherit" }}>Todos</Tab>
          <Tab fontSize={{ base: "sm", md: "inherit" }}>Favoritos</Tab>
        </TabList>
      </Tabs>
      {isLoading && (
        <Flex flex={1} align="center" justifyContent="center">
          <Spinner size="lg" />
        </Flex>
      )}
      {!isLoading && !loadError && (
        <SimpleGrid mt={4} columns={[1, null, 2]} spacing={4}>
          {places}
        </SimpleGrid>
      )}
    </Stack>
  );
}
