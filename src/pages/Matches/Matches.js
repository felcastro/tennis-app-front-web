import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Tabs,
  TabList,
  Tab,
  List,
  Spinner,
  Stack,
  Flex,
  ListItem,
} from "@chakra-ui/core";

import api from "../../services/api";
import MatchCard from "./MatchCard";

export default function Matches() {
  const [isLoading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [matches, setMatches] = useState([]);
  const user = useSelector((state) => state.user);

  const status = ["open", "pending", "closed"];

  const onTabIndexChange = (index) => {
    setLoading(true);
    setLoadError(false);
    const now = new Date().toJSON();
    const url = `/matches?status=${status[index]}&user=${user._id}${
      status[index] === "open" ? `&matchDate=${now}` : ""
    }`;

    api
      .get(url, {
        headers: {
          Authorization: user.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setMatches(
          response.data.map((match) => (
            <ListItem key={match._id}>
              <MatchCard match={match} />
            </ListItem>
          ))
        );
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setLoadError(true);
      });
  };

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
