import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import {
  useTheme,
  useColorMode,
  Box,
  Tabs,
  TabList,
  Tab,
  List,
  Spinner,
  Stack,
  Flex,
  ListItem,
  Divider,
  Avatar,
  IconButton,
} from "@chakra-ui/core";
import { FaPlus } from "react-icons/fa";

import api from "../../services/api";

export default () => {
  const [isLoading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [matches, setMatches] = useState([]);
  const user = useSelector((state) => state.user);
  const [tabIndex, setTabIndex] = useState(0);
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  const status = ["open", "pending", "closed"];

  const onTabIndexChange = (index) => {
    setLoading(true);
    setLoadError(false);
    const now = new Date().toJSON();
    const url = `/matches?status=${status[index]}&user=${user._id}${
      status[index] === "open" ? "&matchDate=" + now : ""
    }`;

    api
      .get(url, {
        headers: {
          Authorization: user.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        // setMatches(response.data.map((x) => x.creator._id !== user._id ? Card(x) : null));
        setMatches(response.data.map((x) => Card(x)));
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setLoadError(true);
      });
  };

  useEffect(() => {
    onTabIndexChange(tabIndex);
  }, []);

  const TennisCourt = (props = {}) => {
    return (
      <Box h={0} paddingTop="46.13%" pos="relative">
        <Flex
          pos="absolute"
          top={0}
          left={0}
          h="100%"
          w="100%"
          border="1px solid"
          borderColor={colorMode == "dark" ? "white" : "black"}
          direction="column"
        >
          <Box h="12.48%" borderBottom="1px solid"></Box>
          <Flex flex={1}>
            <Flex flex={1} borderRight="1px solid">
              <Flex w="46.17%" direction="column" borderRight="1px solid">
                <Box flex={1}></Box>
                <Flex flex={1} align="center" justifyContent="center">
                  {props.match.teamOne.length > 0 ? (
                    <Avatar
                      src={props.match.teamOne[0].pictureUrl}
                      name={props.match.teamOne[0].name}
                    />
                  ) : (
                    <IconButton icon={FaPlus} isRound size="lg" variantColor="green"/>
                  )}
                </Flex>
              </Flex>
              <Flex flex={1} direction="column">
                <Flex flex={1} align="center" justifyContent="center" variant="outline" borderBottom="1px solid">
                  {props.match.teamOne.length > 1 ? (
                    <Avatar
                      src={props.match.teamOne[1].pictureUrl}
                      name={props.match.teamOne[1].name}
                    />
                  ) : (
                    <IconButton icon={FaPlus} isRound size="lg" variant="outline" variantColor="green"/>
                  )}
                </Flex>
                <Box flex={1}></Box>
              </Flex>
            </Flex>
            <Flex flex={1}>
              <Flex flex={1} direction="column">
                <Box flex={1} borderBottom="1px solid"></Box>
                <Flex flex={1} align="center" justifyContent="center">
                  {props.match.teamTwo.length > 1 ? (
                    <Avatar
                      src={props.match.teamTwo[1].pictureUrl}
                      name={props.match.teamTwo[1].name}
                    />
                  ) : (
                    <IconButton icon={FaPlus} isRound size="lg" variant="outline" variantColor="green"/>
                  )}
                </Flex>
              </Flex>
              <Flex w="46.17%" direction="column" borderLeft="1px solid">
                <Flex flex={1} align="center" justifyContent="center">
                  {props.match.teamTwo.length > 0 ? (
                    <Avatar
                      src={props.match.teamTwo[0].pictureUrl}
                      name={props.match.teamTwo[0].name}
                    />
                  ) : (
                    <IconButton icon={FaPlus} isRound size="lg" variant="outline" variantColor="green"/>
                  )}
                </Flex>
                <Box flex={1}></Box>
              </Flex>
            </Flex>
          </Flex>
          <Box h="12.48%" borderTop="1px solid"></Box>
        </Flex>
      </Box>
    );
  };

  const Card = (match) => {
    const matchDate = new Date(match.matchDate);

    return (
      <ListItem
        bg={colors.mainCardLeftBg[colorMode]}
        borderRadius="4px"
        key={match._id}
        // p=".5rem"
      >
        <Box ml={2} p={2} bg={colors.mainComponentBg[colorMode]}>
          <Flex direction={{ base: "column", md: "row" }}>
            <Box
              maxW={{ base: "auto", md: 20 }}
              textAlign={{ base: "center", md: "left" }}
              mb={2}
            >
              <Box as="h3" lineHeight={{ base: "none", md: "inherit" }}>
                {`${matchDate.toLocaleString([], {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })} ${match.numberOfPlayers === 2 ? "Simples" : "Duplas"}`}
              </Box>
            </Box>
            <Box flex={1}>
              <TennisCourt match={match} />
            </Box>
          </Flex>
        </Box>
      </ListItem>
    );
  };

  return (
    <Stack maxW="46rem" px={4} py={3} mx="auto" flex={1}>
      <Tabs
        isFitted
        variant="soft-rounded"
        onChange={(index) => onTabIndexChange(index)}
      >
        <TabList>
          <Tab>Abertas</Tab>
          <Tab>Pendentes</Tab>
          <Tab>Finalizadas</Tab>
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
      <Box mt={4} display={isLoading ? "none" : "block"}>
        <List spacing={4}>{matches}</List>
      </Box>
    </Stack>
  );
};
