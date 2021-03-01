import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Tabs,
  TabList,
  Tab,
  List,
  Spinner,
  Stack,
  Flex,
  ListItem,
} from "@chakra-ui/react";

import MatchCard from "./MatchCard";
import matchService from "../../services/matchService";

export default function Matches() {
  const [isLoading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [matches, setMatches] = useState([]);

  async function onTabIndexChange(index) {
    setLoading(true);
    setLoadError(false);

    try {
      const data = await matchService.list();

      setMatches(
        data.map((match) => (
          <ListItem key={match._id}>
            <MatchCard match={match} />
          </ListItem>
        ))
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
          <Tab fontSize={{ base: "sm", md: "inherit" }}>Abertas</Tab>
          <Tab fontSize={{ base: "sm", md: "inherit" }}>Pendentes</Tab>
          <Tab fontSize={{ base: "sm", md: "inherit" }}>Finalizadas</Tab>
        </TabList>
      </Tabs>
      <Flex
        flex={1}
        align="center"
        justifyContent="center"
        display={isLoading ? "flex" : "none"}
      >
        <Spinner size="lg" />
      </Flex>
      <List display={isLoading ? "none" : "block"} mt={4} spacing={4}>
        {matches}
      </List>
    </Stack>
  );
}
