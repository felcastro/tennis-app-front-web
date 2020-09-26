import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Tabs,
  TabList,
  Tab,
  Stack,
  ListItem,
  Flex,
  Spinner,
  List,
  SimpleGrid,
  Box,
  Image,
  useTheme,
  useColorMode,
  Heading,
  Link,
  Divider,
  Badge,
} from "@chakra-ui/core";

import mockApi from "../../services/mockApi";

export default function Matches() {
  const [isLoading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [places, setPlaces] = useState([]);
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  const user = useSelector((state) => state.user);

  const courts = ["Cimento", "Saibro", "Areia"];

  const CardInfoItem = ({ name, value }) => {
    return (
      <Stack lineHeight="shorter" spacing={0}>
        <Box as="span">{value}</Box>
        <Box as="span">{name}</Box>
      </Stack>
    );
  };

  const Card = ({ place }) => {
    const sports = [...new Set(place.courts.map((c) => c.sport))];
    return (
      <Link
        as={RouterLink}
        to={`/places/${place.id}`}
        bg={colors.mainComponentBg[colorMode]}
        _hover={{
          textDecoration: "none",
          bg: colors.mainBgSelected[colorMode],
        }}
        _focus={{ bg: colors.mainBgSelected[colorMode] }}
      >
        <Image
          src={place.pictureUrl}
          alt=""
          objectFit="cover"
          h="8rem"
          w="100%"
        />
        <Box px={2} py={1} textAlign="center">
          <Heading as="h3" fontSize={{ base: "md", md: "lg" }}>
            {place.name}
          </Heading>
          <Stack isInline spacing={2} mt={2}>
            {sports.map((s) => (
              <Badge variantColor="green" key={s}>
                {s}
              </Badge>
            ))}
          </Stack>
        </Box>
      </Link>
    );
  };

  const onTabIndexChange = (index) => {
    setLoading(true);
    setLoadError(false);
    const url = "/api/places";

    mockApi
      .get(url, {
        headers: {
          Authorization: user.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setPlaces(
          response.data.map((place) => <Card place={place} key={place.id} />)
        );
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
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
          <Tab fontSize={{ base: "sm", md: "inherit" }}>Todos</Tab>
          <Tab fontSize={{ base: "sm", md: "inherit" }}>Favoritos</Tab>
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
      <SimpleGrid
        display={isLoading ? "none" : "grid"}
        mt={4}
        columns={[1, null, 2]}
        spacing={4}
      >
        {places}
      </SimpleGrid>
    </Stack>
  );
}
